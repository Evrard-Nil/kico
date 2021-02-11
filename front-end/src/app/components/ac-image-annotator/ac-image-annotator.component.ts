import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { VideoService } from 'src/app/services/video.service';
import { Image as CustomImage } from 'src/app/model/image';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ac-image-annotator',
  templateUrl: './ac-image-annotator.component.html',
  styleUrls: ['./ac-image-annotator.component.css'],
})
export class ACImageAnnotatorComponent implements OnInit {
  @ViewChild('canvas', { static: true }) public canvas: ElementRef;
  @Input() public width = 1200;
  @Input() public height = 600;
  @Input() public idVideo;
  // @Input() image: ImageBitmap;

  //Paramètres pour gérer le canvas
  private ctx: CanvasRenderingContext2D;
  private isDrawing: Boolean;
  private coordinates: Array<[number, number]>;
  private polygons: Array<Array<[number, number]>>;
  private polygonsByState: Map<ImageData, Array<Array<[number, number]>>>;
  public numbers: Array<Number>;

  //Paramètres pour gérer les appels API
  private polygonsByImage: Map<String, Array<Array<[number, number]>>>; //Contient l'url de l'image associé à ses annotations

  //Paramètres pour gérer les undo/redo
  private states: Array<ImageData>;
  private increment: number;
  private state: ImageData;
  private deletedPolygons: Array<Array<[number, number]>>;

  private image: HTMLImageElement;

  receivedImages: Array<CustomImage>;
  currentImage: CustomImage;

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute
  ) {
    this.coordinates = new Array<[number, number]>();
    this.increment = 1;
    this.states = new Array<ImageData>();
    this.polygons = [];
    this.deletedPolygons = new Array<Array<[number, number]>>();
    this.polygonsByState = new Map<ImageData, Array<Array<[number, number]>>>();
    this.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 5, 5, 5, 5, 5];
    this.receivedImages = new Array();
    this.idVideo = 'b50905c7-de74-40c6-9d7f-bbedafc98c9f';
    this.loadImages();
    this.idVideo = +this.route.snapshot.paramMap.get('id');
    this.currentImage = new CustomImage()
    // this.images = ['https://picsum.photos/id/237/1200/600', 'https://picsum.photos/id/238/1200/600', 'https://picsum.photos/id/239/1200/600', 'https://picsum.photos/id/240/1200/600'];

    // this.numbers = Array(5).fill(4); // [4,4,4,4,4]
  }

  //Méthode faisant partie du cycle angular : Lancée à l'initialisation du composant.
  /*
   * On récupère les dimensions exactes de la photo //TODO
   * On sauvegarde l'état initial du canvas afin de le sauvegarder dans un tableau qui contiendra les états suivants du canvas
   * On branche une méthode sur l'event "Clic du bouton de la souris" afin de dessiner au clic lorsqu'on est en mode dessin.
   */
  ngOnInit(): void {
    this.loadImages();
    this.initImage();
    this.initCanvas();
  }

  private initImage() {
    this.image = new Image();
    this.image.crossOrigin = 'anonymous';

    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
    };
  }

  private initCanvas() {
    this.ctx = this.canvas.nativeElement.getContext('2d'); //On récupère le contexte du canvas.
    this.canvas.nativeElement.width = this.width;
    this.canvas.nativeElement.height = this.height;

    this.canvas.nativeElement.addEventListener('mousedown', (e) => {
      if (this.isDrawing) {
        this.coordinates.push([
          e.clientX - this.canvas.nativeElement.offsetLeft,
          e.clientY - this.canvas.nativeElement.offsetTop,
        ]);
        this.drawPolygon();
      }
    });
  }

  /**
   * Charge les images de la vidéo, depuis le serveur.
   * Chaque image sera enregistré en local, afin de pallier au faille de sécurité
   * (https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image)
   */
  loadImages() {
    this.imageService.getImages(this.idVideo).subscribe((receivedImages) => {
      receivedImages.forEach((image) => {
        image.url = environment.fileBaseUrl + image.url;
        this.receivedImages.push(image);
        this.initLocalImage(image);
      });
    });
  }

  /**
   * Créer un nouveau HTMLImageElement qui affichera l'image reçu depuis l'api. Cet HTMLImageElement sera enregistré en local.
   * @param image l'image a enregsitré dans le localStorage
   */
  private initLocalImage(image: CustomImage) {
    var downloadedImg = new Image();
    downloadedImg.crossOrigin = 'anonymous';
    downloadedImg.src = image.url.toString();
    downloadedImg.id = image.id.toString();
    downloadedImg.addEventListener(
      'load',
      () => {
        this.loadImageInLocalStorage(downloadedImg);
      },
      false
    );
  }

  /**
   * Créer un canvas, y dessine le contenu de l'image en paramètre, et enregistre le contenu du canvas dans le localStorage.
   * L'id d'enregistrement est égal à l'id de l'image (issue de l'API).
   * @param downloadedImg HTMLImageElement à enregistrer en local
   */
  private loadImageInLocalStorage(downloadedImg: HTMLImageElement) {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');

    canvas.width = downloadedImg.width;
    canvas.height = downloadedImg.height;

    context.drawImage(downloadedImg, 0, 0);

    try {
      localStorage.setItem(
        downloadedImg.id.toString(),
        canvas.toDataURL('image/jpeg')
      );
    } catch (err) {
      console.log('Error: ' + err);
    }
  }


  /**
   * Retourne vrai si les deux tableaux en paramètre sont égaux
   * @param a Array
   * @param b Array
   */
  arrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => {
        if (Array.isArray(val)) {
          return this.arrayEquals(val, b[index]);
        } else {
          return val === b[index];
        }
      })
    );
  }

  //Sauve l'état du canvas.
  /*
   * On remet l'incrément qui gère les états du canvas à l'état initial (1)
   * On récupère l'état actuel du canvas et on le met dans un array qui contient les états précédents
   * On récupère le polygone fraichement dessiné et on le met dans un tableau de polygones qui sera redessiné à chaque fois qu'on repasse en mode dessin.
   */
  saveCanvas(): void {
    this.increment = 1;
    this.state = this.ctx.getImageData(0, 0, this.width, this.height);
    this.states.push(this.state);
    this.isDrawing = false;

    let polygon = Array.from(this.coordinates); //Clone de l'array.
    if (polygon.length !== 0) {
      this.polygons.push(polygon);
    }
    if (!this.arrayEquals(this.currentImage.annotations, this.polygons)) {
      let tempImage = new CustomImage();
      tempImage.id = this.currentImage.id;
      tempImage.name = this.currentImage.name;
      tempImage.secteur_id = this.currentImage.secteur_id;
      tempImage.time = this.currentImage.time;
      tempImage.url = "/" + this.currentImage.url.match(/images\/(.)*/)[0]
      tempImage.video_id = this.currentImage.video_id;
      if (this.currentImage.annotations == undefined) {
        this.currentImage.annotations = [];
      }
      // tempImage.annotations = this.currentImage.annotations.concat(
      //   Array.from(this.polygons) // Gérer les doublons
      // );
      tempImage.annotations = Array.from(new Set(this.currentImage.annotations.concat(
        Array.from(this.polygons) // Gérer les doublons
      )));
      this.currentImage.annotations = tempImage.annotations;
      this.imageService.updateImage(tempImage).subscribe((img) => {});
    }

    let polygons = Array.from(this.polygons);
    this.polygonsByState.set(this.state, polygons);
    this.coordinates.splice(0, this.coordinates.length); //On remet le tableau de coordonnées du polygone à vide.
  }

  //Permet de passer en mode dessin.
  drawCanvas(): void {
    // this.polygons = this.polygonsByState.get(this.state);
    this.increment = 1;
    this.isDrawing = true;

  }

  //Permet de garder affiché les polygones précédemment dessinés.
  drawPreviousPolygons(): void {
    this.polygons.forEach((polygon) => {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.drawImage(this.image, 0, 0);
      if (polygon.length > 0) {
        this.ctx.moveTo(polygon[0][0], polygon[0][1]);
        for (let i = 1; i < polygon.length; i++) {
          this.ctx.lineTo(polygon[i][0], polygon[i][1]);
        }
      }
      this.ctx.closePath();
      this.ctx.stroke();
    });
  }

  //Dessine un polygone au clic.
  /*
   * On redessine les polygones précédents à chaque clic, car on doit nettoyer le canvas à chaque clic afin d'obtenir le rendu souhaité.
   */
  drawPolygon(): void {
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.drawImage(this.image, 0, 0);
    this.drawPreviousPolygons();
    this.ctx.beginPath();
    if(this.coordinates.length>0){
      this.ctx.moveTo(this.coordinates[0][0], this.coordinates[0][1]);
      for (let i = 1; i < this.coordinates.length; i++) {
        this.ctx.lineTo(this.coordinates[i][0], this.coordinates[i][1]);
      }
    }
    this.ctx.closePath();
    this.ctx.stroke();
  }

  /*
   * Remet le canvas à blanc.
   * Remet à vide les polygons.
   * Charge la nouvelle image.
   *
   */
  clickImage(image: CustomImage) {
    //RECHARGER LES IMAGES
    this.ctx.clearRect(0, 0, this.width, this.height); //Remet le canvas à blanc.

    this.polygons = [];
    this.polygonsByState.clear();
    this.coordinates = [];
    this.states = [];

    this.image = new Image();
    this.image.crossOrigin = 'anonymous';
    this.image.src = localStorage.getItem(image.id.toString());
    this.currentImage = image
    console.log("This current image : ",this.currentImage);

    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0);
      this.receivedImages.forEach(image => {
        if (image === this.currentImage && image.annotations != undefined) {
          // this.polygons.splice(0, this.polygons.length);
          this.polygons = Array.from(this.currentImage.annotations);
          // this.polygons = Array.from(image.annotations);

          this.drawPolygon();
          this.state = this.ctx.getImageData(0, 0, this.width, this.height);
          this.polygonsByState.set(this.state, this.polygons);
        } else {
          this.states.push(this.ctx.getImageData(0, 0, this.width, this.height));
          this.state = this.states[0]
          this.polygonsByState.set(this.state, []);
        }
      })
    }
  }
}
