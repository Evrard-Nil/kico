import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-ac-image-annotator',
  templateUrl: './ac-image-annotator.component.html',
  styleUrls: ['./ac-image-annotator.component.css']
})
export class ACImageAnnotatorComponent implements OnInit {

  @ViewChild('canvas', { static: true }) public canvas: ElementRef;
  @Input() public width = window.innerWidth;
  @Input() public height = 600;
  // @Input() image: ImageBitmap;



  //Paramètres pour gérer le canvas
  private ctx: CanvasRenderingContext2D;
  private isDrawing: Boolean;
  private coordinates: Array<([number, number])>;
  private polygons: Array<Array<([number, number])>>;
  private polygonsByState: Map<ImageData, Array<Array<([number, number])>>>;


  //Paramètres pour gérer les undo/redo
  private states: Array<ImageData>;
  private increment: number;
  private state: ImageData;

  private image;


  constructor() {
    this.coordinates = new Array<[number, number]>();
    this.increment = 1;
    this.states = new Array<ImageData>();
    this.polygons = [];
    this.polygonsByState = new Map<ImageData, Array<Array<([number, number])>>>();


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
    //this.image.src = "../../../assets/tsconfig.app.jpg";

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

  //Permet de revenir en avant sur les états du canvas.
  redoAction(): void {
    this.increment - 1 < 1 ? 1 : this.increment--;
    this.state = this.states[this.states.length - this.increment > this.states.length - 1 ? this.states.length + 1 : this.states.length - this.increment];
    this.ctx.putImageData(this.state, 0, 0);
  }

  //Permet de faire retour arrière sur les états précédents.
  undoAction(): void {
    this.increment + 1 > this.states.length ? this.increment = this.states.length : this.increment++;
    this.state = this.states[this.states.length - this.increment < 0 ? 0 : this.states.length - this.increment];
    console.log(this.states.length - this.increment < 0);
    console.log(this.states.length - this.increment);
    this.ctx.putImageData(this.state, 0, 0);
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
    this.states.push(state);
    this.isDrawing = false;
    let polygon = Array.from(this.coordinates); //Clone de l'array.
    this.polygons.push(polygon);
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
    console.log(this.polygons);
    this.polygons.forEach(polygon => {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.drawImage(this.image, 0, 0);
      this.ctx.beginPath();
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
    ctx.clearRect(0, 0, this.width, this.height);
    this.drawPreviousPolygons();
    this.ctx.drawImage(this.image, 0, 0);
    ctx.beginPath();
    ctx.moveTo(this.coordinates[0][0], this.coordinates[0][1]);
    for (let i = 1; i < this.coordinates.length; i++) {
      ctx.lineTo(this.coordinates[i][0], this.coordinates[i][1]);
    }
    ctx.closePath();
    ctx.stroke();
  }

  updateState() {

  }


  ngAfterViewInit(): void {


  }




}
