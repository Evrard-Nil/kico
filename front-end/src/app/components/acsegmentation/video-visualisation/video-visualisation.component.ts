import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/model/image';
import { Video } from 'src/app/model/video';
import { ImageService } from 'src/app/services/image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-visualisation',
  templateUrl: './video-visualisation.component.html',
  styleUrls: ['./video-visualisation.component.css']
})
export class VideoVisualisationComponent implements OnInit {

  @Input() video : Video
  @ViewChild("videoRef") videoReference: ElementRef
  videoElement: HTMLVideoElement

  @Output() eventCreateImage : EventEmitter<Image>;

  constructor(private imageService: ImageService) { 
    this.eventCreateImage = new EventEmitter()
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.videoElement = this.videoReference.nativeElement
    this.videoElement.crossOrigin = "anonymous"
  }

  /**
   * Crée un élément de type Canvas et dessine dessus, le contenu actuel de la vidéo.  
   * Sauvegarde cette image
   */
  captureCurrentImage() {
    var canvasElement = document.createElement("canvas")
    var ctx = canvasElement.getContext('2d')
    
    canvasElement.width = this.videoElement.clientWidth;
    canvasElement.height = this.videoElement.clientHeight;
    ctx.drawImage(this.videoElement, 0, 0, canvasElement.width, canvasElement.height);

    this.saveImage(canvasElement)
  }

  /**
   * Transforme le contenu du canvas en Blob (binaire de l'image) et sauvegarde cette image en appelant l'API.  
   * L'image de retour est intégrée à la liste des images affichés
   * @param canvasElement : le canvas contenant l'image à sauvegarder 
   */
  saveImage(canvasElement: HTMLCanvasElement) {
    canvasElement.toBlob((blob) => {
      const time = Math.round(this.videoElement.currentTime)
      console.log(blob)
      var url = URL.createObjectURL(blob)
      console.log(url);

      const formData = new FormData()
      formData.append('name', "Nouvelle image ("+ this.getDurationFromSeconds(time) + ")");
      formData.append('fileName', blob);
      formData.append('secteur_id', "0");
      formData.append('time', this.getDurationFromSeconds(time));

      console.log(this.getDurationFromSeconds(time))
      this.imageService.saveImage(this.video.id, formData).subscribe((image) => {
        image.url = environment.fileBaseUrl + image.url
        this.eventCreateImage.emit(image)
      })
    },"image/jpeg")
  }

  /**
   * Retourne une chaine de caractères représentant la durée à partir des secondes passés en paramètre
   * @param time : Chaine de caractère du format "minutes:secondes"
   */
  private getDurationFromSeconds(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;

    var secondsString = seconds.toString()
    // Ajoute le 0 avant les secondes si besoin (6:5 --> 6:05)
    if(seconds.toString().length == 1){
      secondsString = "0" + seconds
    }
    return minutes+ ":" + secondsString
  }

}
