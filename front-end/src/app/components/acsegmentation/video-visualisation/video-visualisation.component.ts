import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/model/video';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-video-visualisation',
  templateUrl: './video-visualisation.component.html',
  styleUrls: ['./video-visualisation.component.css']
})
export class VideoVisualisationComponent implements OnInit {

  @Input() video : Video
  @ViewChild("videoRef") videoReference: ElementRef

  videoElement: HTMLVideoElement

  constructor(private imageService: ImageService) { 
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.videoElement = this.videoReference.nativeElement
  }

  captureCurrentImage() {
    var canvasElement = document.createElement("canvas")
    canvasElement.width = this.videoElement.clientWidth;
    canvasElement.height = this.videoElement.clientHeight;
    canvasElement.getContext('2d').drawImage(this.videoElement, 0, 0, canvasElement.width, canvasElement.height);
  }

  saveImage(canvasElement: HTMLCanvasElement) {
    canvasElement.toBlob((blob) => {
      console.log(blob)
      var url = URL.createObjectURL(blob)
      console.log(url)
      this.imageService.saveImage(this.video.id, blob).subscribe((image) => {
        console.log("IMAGE CREEE:",image)
        // TODO : Add image to the list
      })
    },"image/jpeg")
  }

}
