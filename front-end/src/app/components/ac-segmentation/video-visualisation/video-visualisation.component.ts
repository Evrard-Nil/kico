import { AfterViewInit, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/model/image';
import { Video } from 'src/app/model/video';
import { ImageStore } from 'src/app/services/Store/image-store.service';
import { ImageService } from 'src/app/services/API/image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-visualisation',
  templateUrl: './video-visualisation.component.html',
  styleUrls: ['./video-visualisation.component.css']
})
export class VideoVisualisationComponent implements OnInit, AfterViewInit {

  @Input() video : Video
  @ViewChild("videoRef") videoReference: ElementRef
  videoElement: HTMLVideoElement

  @Output() eventCreateImage : EventEmitter<Image>;

  constructor(private imageStore : ImageStore) { 
    this.eventCreateImage = new EventEmitter()
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    if(this.video) {
      this.videoElement = this.videoReference.nativeElement
      this.videoElement.crossOrigin = "anonymous"
    }
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
    const blob = this.getCanvasBlob(canvasElement);
    
    blob.then((blob) => {
      const time = this.getDurationFromSeconds(Math.round(this.videoElement.currentTime))
      const formData = new FormData()
      formData.append('name', "Nouvelle image (" + time + ")");
      formData.append('fileName', blob);
      formData.append('secteur_id', "0");
      formData.append('time', time);
      this.imageStore.createImage(this.video.id, formData)
    })

  }

  /**
   * Extrait le contenu du canvas sous forme de blob. L'extraction est asynchrone et retourne une promesse
   * @param canvas 
   */
  private getCanvasBlob(canvas : HTMLCanvasElement) {
    return new Promise<Blob>(function(resolve) {
      canvas.toBlob(function(blob) {
        resolve(blob)
      },"image/jpeg")
    })
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
