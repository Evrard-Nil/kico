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
import { environment, zones } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Nodule } from 'src/app/model/nodule';
import { ModalService } from '../modules/modal';


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
  private erasedAnnotations;


  //Paramètres pour gérer le nodule
  public nodule : Nodule;
  public noduleLoaded : Boolean;

  sizes: string[] = ['0 cm', '> 0.5cm', '> 5cm', '> 5cm or confluence'];
  scores: number[] = [0, 1, 2, 3];
  probabilities: string[] = ['Certain', 'Average', 'Low'];
  retractiles: Boolean[] = [true, false];
  adherants: Boolean[] = [true, false];
  colors: string[] = ["Jaunâtre", "Verdatre"];
  types: string[] = ["Hétérogène", "Homogène"];

  private image: HTMLImageElement;

  receivedImages: Array<CustomImage>;
  currentImage: CustomImage;
  currentZone : String

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {
    this.coordinates = new Array<[number, number]>();
    this.increment = 1;
    this.states = new Array<ImageData>();
    this.polygons = [];
    this.deletedPolygons = new Array<Array<[number, number]>>();
    this.polygonsByState = new Map<ImageData, Array<Array<[number, number]>>>();
    this.receivedImages = new Array();
    this.idVideo = this.route.snapshot.paramMap.get('id');
    this.currentImage = new CustomImage()
    this.noduleLoaded = false;
    this.erasedAnnotations = false;
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


  private initQualification(image : CustomImage){
    this.nodule = Object.assign({}, image.nodule);
    this.noduleLoaded = true;
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

  openClearAnnotationModal(){
    this.openModal("confirmation-erase-all-annotations");
  }

  clearAnnotations(){
    this.polygons.splice(0, this.polygons.length);
    this.coordinates.splice(0, this.coordinates.length);
    this.drawPolygon();
    this.erasedAnnotations = true;
    this.closeModal('confirmation-erase-all-annotations');
  }

  //Sauve l'état du canvas.
  /*
   * On remet l'incrément qui gère les états du canvas à l'état initial (1)
   * On récupère l'état actuel du canvas et on le met dans un array qui contient les états précédents
   * On récupère le polygone fraichement dessiné et on le met dans un tableau de polygones qui sera redessiné à chaque fois qu'on repasse en mode dessin.
   */
  saveCanvas(): void {
    this.increment = 1;
    if(Object.keys(this.nodule).length < 7){
      this.openModal("confirmation-save-annotations");
    } else {
      this.saveImage();
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  public saveImage() : void {
    this.state = this.ctx.getImageData(0, 0, this.width, this.height);
    this.states.push(this.state);
    this.isDrawing = false;

    let polygon = Array.from(this.coordinates); //Clone de l'array.
    if (polygon.length !== 0) {
      this.polygons.push(polygon);
    }

    if (!this.arrayEquals(this.currentImage.annotations, this.polygons) || this.currentImage.nodule != this.nodule) {
      let tempImage = new CustomImage();
      tempImage.id = this.currentImage.id;
      tempImage.name = this.currentImage.name;
      tempImage.secteur_id = this.currentImage.secteur_id;
      tempImage.time = this.currentImage.time;
      tempImage.url = "/" + this.currentImage.url.match(/images\/(.)*/)[0]
      tempImage.video_id = this.currentImage.video_id;
      let clonedNodule = Object.assign({}, this.nodule);
      tempImage.nodule = clonedNodule;
      if (this.currentImage.annotations == undefined) {
        this.currentImage.annotations = [];
      }

      if(this.erasedAnnotations){
        tempImage.annotations = Array.from(this.polygons);
      } else {
        tempImage.annotations = Array.from(new Set(this.currentImage.annotations.concat( //Permet de gérer les doublons
        Array.from(this.polygons)
      )));
      }
      this.currentImage.annotations = tempImage.annotations;
      this.imageService.updateImage(tempImage).subscribe((img) => {
      });
    }

    let polygons = Array.from(this.polygons);
    this.polygonsByState.set(this.state, polygons);
    this.coordinates.splice(0, this.coordinates.length); //On remet le tableau de coordonnées du polygone à vide.
    this.closeModal("confirmation-save-annotations");
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
          // this.ctx.arc(polygon[i][0], polygon[i][1], 3,0,2 * Math.PI, true);
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
        // this.ctx.arc(this.coordinates[i][0], this.coordinates[i][1], 3,0,2 * Math.PI, true);
        // this.ctx.fill();
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
  clickImage(image: CustomImage, element) {
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
    this.currentZone = zones[+this.currentImage.secteur_id];
    this.erasedAnnotations = false;

    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0);
      this.receivedImages.forEach(image => {
        if (image === this.currentImage && image.annotations != undefined) {
          this.polygons = Array.from(this.currentImage.annotations);
          this.drawPolygon();
          this.state = this.ctx.getImageData(0, 0, this.width, this.height);
          this.polygonsByState.set(this.state, this.polygons);
          this.initQualification(image);
        } else if(image === this.currentImage && image.annotations == undefined) {
          this.states.push(this.ctx.getImageData(0, 0, this.width, this.height));
          this.state = this.states[0]
          this.polygonsByState.set(this.state, []);
          this.initQualification(image);
        }
      });

    }
  }
}
