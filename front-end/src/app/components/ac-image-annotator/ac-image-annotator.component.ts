import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { VideoService } from 'src/app/services/video.service';
import {
  Image as CustomImage
} from 'src/app/model/image';
import { environment } from 'src/environments/environment'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ac-image-annotator',
  templateUrl: './ac-image-annotator.component.html',
  styleUrls: ['./ac-image-annotator.component.css']
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
  private coordinates: Array<([number, number])>;
  private polygons: Array<Array<([number, number])>>;
  private polygonsByState: Map<ImageData, Array<Array<([number, number])>>>;
  public numbers: Array<Number>;
  public images: Array<String>;


  //Paramètres pour gérer les appels API
  private polygonsByImage: Map<String, Array<Array<([number, number])>>>; //Contient l'url de l'image associé à ses annotations


  //Paramètres pour gérer les undo/redo
  private states: Array<ImageData>;
  private increment: number;
  private state: ImageData;
  private deletedPolygons: Array<Array<([number, number])>>;

  private image;

  private receivedImage: Array<CustomImage>;



  constructor(private imageService: ImageService, private route: ActivatedRoute) {
    this.coordinates = new Array<[number, number]>();
    this.increment = 1;
    this.states = new Array<ImageData>();
    this.polygons = [];
    this.deletedPolygons = new Array<Array<([number, number])>>();
    this.polygonsByState = new Map<ImageData, Array<Array<([number, number])>>>();
    this.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 5, 5, 5, 5, 5];
    this.receivedImage = new Array();
    this.images = new Array();
    this.idVideo = 'b50905c7-de74-40c6-9d7f-bbedafc98c9f';
    this.loadImages();
    this.idVideo = +this.route.snapshot.paramMap.get('id');
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
    this.ctx = this.canvas.nativeElement.getContext('2d'); //On récupère le contexte du canvas.
    this.canvas.nativeElement.width = this.width;
    this.canvas.nativeElement.height = this.height;

    this.image = new Image();
    this.image.src = "../../../assets/tsconfig.app.jpg";
    this.image.crossOrigin = "Anonymous";

    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0);
    }

    this.states.push(this.ctx.getImageData(0, 0, this.width, this.height));
    this.state = this.states[0]
    this.polygonsByState.set(this.state, []);
    this.canvas.nativeElement.addEventListener('mousedown', (e) => {
      if (this.isDrawing) {
        this.coordinates.push([e.clientX - this.canvas.nativeElement.offsetLeft, e.clientY - this.canvas.nativeElement.offsetTop]);
        this.drawPolygon(this.ctx);
      }
    });


  }


  /**
  * Charge les images de la vidéo, depuis le serveur
  */
  async loadImages() {
    await this.imageService.getImages(this.idVideo)
      .subscribe((receivedImage) => {
        receivedImage.forEach((image) => {
          this.receivedImage.push(image)
        })
        receivedImage.forEach(image => {
          this.images.push(environment.fileServerBaseUrl + image.url);
        })
      })

  }

  //Permet de revenir en avant sur les états du canvas.
  // redoAction(): void {
  //   this.increment-1 < 1 ? 1 : this.increment--;
  //   this.state = this.states[this.states.length-this.increment > this.states.length-1 ? this.states.length+1 : this.states.length-this.increment];
  //   this.ctx.putImageData(this.state,0,0);
  // }

  //Permet de faire retour arrière sur les états précédents.
  // undoAction(): void {
  //   if(this.increment==1){
  //     this.ctx.drawImage(this.image, 0,0);
  //   } else {
  //     this.increment+1>this.states.length ? this.increment = this.states.length : this.increment++;
  //     this.state = this.states[this.states.length-this.increment < 0 ? 0 : this.states.length-this.increment];
  //     // console.log(this.states.length-this.increment < 0);
  //     // console.log(this.states.length-this.increment);
  //     this.ctx.putImageData(this.state,0,0);
  //   }
  // }

  arrayEquals(a, b) {
    // console.log("is array : ", Array.isArray(a) &&
    //   Array.isArray(b));
    // console.log("length : ", a.length === b.length);
    // console.log("val : ", a.every((val, index) => val === b[index]));
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => {
        if (Array.isArray(val)) {
          return this.arrayEquals(val, b[index]);
        } else {
          return val === b[index];
        }

        // val === b[index]
        // console.log("val : ", val);
        // console.log("bindex : ", b[index]);
      });
  }


  //Sauve l'état du canvas.
  /*
   * On remet l'incrément qui gère les états du canvas à l'état initial (1)
   * On récupère l'état actuel du canvas et on le met dans un array qui contient les états précédents
   * On récupère le polygone fraichement dessiné et on le met dans un tableau de polygones qui sera redessiné à chaque fois qu'on repasse en mode dessin.
  */
  saveCanvas(): void {
    this.increment = 1;
    let state = this.ctx.getImageData(0, 0, this.width, this.height);
    this.state = state;
    this.states.push(state);
    this.isDrawing = false;

    let polygon = Array.from(this.coordinates); //Clone de l'array.
    if (polygon.length !== 0) {
      this.polygons.push(polygon);
    }

    this.receivedImage.forEach(image => {
      let cutUrl = this.image.src.substring(environment.fileServerBaseUrl.length);
      if (image.url == cutUrl) {
        if (!this.arrayEquals(image.annotations, this.polygons)) {
          let tempImage = new CustomImage();
          tempImage.id = image.id;
          tempImage.name = image.name;
          tempImage.secteur_id = image.secteur_id;
          tempImage.time = image.time;
          tempImage.url = image.url;
          tempImage.video_id = image.video_id;
          if (image.annotations == undefined) {
            image.annotations = [];
          }
          tempImage.annotations = image.annotations.concat(Array.from(this.polygons));
          // console.log("Image avant update : ", image);
          this.imageService.updateImage(tempImage).subscribe((img) => {
          });
        }
      }

    });

    let polygons = Array.from(this.polygons);
    this.polygonsByState.set(state, polygons);
    this.coordinates.splice(0, this.coordinates.length); //On remet le tableau de coordonnées du polygone à vide.
  }

  //Permet de passer en mode dessin.
  drawCanvas(): void {
    this.polygons = this.polygonsByState.get(this.state);
    this.increment = 1;
    this.isDrawing = true;
  }

  //Permet de garder affiché les polygones précédemment dessinés.
  drawPreviousPolygons(): void {
    // console.log(this.polygons);
    this.polygons.forEach(polygon => {
      this.ctx.clearRect(0, 0, this.width, this.height);
      // console.log(this.image);
      this.ctx.drawImage(this.image, 0, 0);
      // this.ctx.beginPath();
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
  drawPolygon(ctx: CanvasRenderingContext2D): void {

    ctx.beginPath();
    ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.drawImage(this.image, 0, 0);
    this.drawPreviousPolygons();
    this.ctx.beginPath();
    ctx.moveTo(this.coordinates[0][0], this.coordinates[0][1]);
    for (let i = 1; i < this.coordinates.length; i++) {
      ctx.lineTo(this.coordinates[i][0], this.coordinates[i][1]);
    }
    ctx.closePath();
    ctx.stroke();
  }


  /*
   * Remet le canvas à blanc.
   * Remet à vide les polygons.
   * Charge la nouvelle image.
   *
  */
  clickImage(image: string) {
    //RECHARGER LES IMAGES
    this.ctx.clearRect(0, 0, this.width, this.height); //Remet le canvas à blanc.

    this.polygons = [];
    this.polygonsByState.clear();
    this.coordinates = [];
    this.states = [];

    this.image = new Image();
    this.image.src = image;
    this.image.crossOrigin = "Anonymous";

    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0);
      this.receivedImage.forEach(image => {
        let cutUrl = this.image.src.substring(environment.fileServerBaseUrl.length);
        if (image.url == cutUrl && image.annotations != undefined) {
          // this.coordinates = Array.from(image.annotations[0]);
          this.polygons = Array.from(image.annotations);
          this.drawPreviousPolygons();
          // let state = this.ctx.getImageData(0,0, this.width, this.height);
          // this.state = state;
          // this.polygons.push(Array.from(image.annotations));
          // this.polygonsByState.set(state, Array.from(this.polygons));
          this.saveCanvas();
        } else {
          this.states.push(this.ctx.getImageData(0, 0, this.width, this.height));
          this.state = this.states[0]
          this.polygonsByState.set(this.state, []);
        }
      })
    }

    // this.states.push(this.ctx.getImageData(0,0, this.width, this.height));
    // this.state = this.states[0]
    // this.polygonsByState.set(this.state, []);

    // this.image.src = image;

    // this.ctx.drawImage(this.image, 0, 0);
  }


  // undoPolygon(){
  //   if(this.polygons.length>0){
  //     // console.log("this polygons :::: ", this.polygons[this.polygons.length-1]);
  //     this.deletedPolygons.push(Array.from(this.polygons[this.polygons.length-1]));
  //     this.polygons.pop();
  //     this.coordinates = this.polygons[0];
  //     this.drawPolygon(this.ctx);
  //   }
  // }

  // redoPolygons(){
  //   this.polygons.concat(this.deletedPolygons);
  // }

  /*
  *
  * Sauvegarde les annotations de l'image, et fait un PUT sur l'API pour mettre à jour l'image.
  *
  *
  */
  // saveImage(){

  // }


  updateState() {

  }


  ngAfterViewInit(): void {


  }


}
