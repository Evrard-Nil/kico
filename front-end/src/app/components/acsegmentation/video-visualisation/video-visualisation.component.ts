import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/model/video';

@Component({
  selector: 'app-video-visualisation',
  templateUrl: './video-visualisation.component.html',
  styleUrls: ['./video-visualisation.component.css']
})
export class VideoVisualisationComponent implements OnInit {

  @Input() video : Video
  @ViewChild("videoRef") videoReference: ElementRef
  @ViewChild("canvasRef") canvasReference: ElementRef

  canvasElement: HTMLCanvasElement
  videoElement: HTMLVideoElement

  constructor() { 
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.videoElement = this.videoReference.nativeElement
    this.canvasElement = this.canvasReference.nativeElement
  }

  captureCurrentImage() {
    this.canvasElement.width = this.videoElement.clientWidth;
    this.canvasElement.height = this.videoElement.clientHeight;
    this.canvasElement.getContext('2d').drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
    var dataURL = this.canvasElement.toDataURL()
    window.open(dataURL)
  }

}
