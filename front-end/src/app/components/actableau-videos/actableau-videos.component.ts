import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Video } from 'src/app/model/video';
import { VideoService } from 'src/app/services/video.service';
import { Router } from '@angular/router';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-actableau-videos',
  templateUrl: './actableau-videos.component.html',
  styleUrls: ['./actableau-videos.component.css'],
})
export class ActableauVideosComponent implements OnInit {
  @ViewChild('inputVideo') fileUpload: ElementRef;
  files = [];

  videos: Array<Video>;

  constructor(private videoService: VideoService, private router: Router) {
  }

  ngOnInit(): void {
    this.videos = new Array<Video>();
    console.log("avant log vidéo");
    this.loadVideos();
  }

  deleteVideo(id): void {
    this.videoService.deleteVideo(id).subscribe((code) => {
      this.ngOnInit();
    });

  }



  addVideo(): void {
    this.files = this.fileUpload.nativeElement.files;
    if (this.files.length > 0) {
      document.getElementById("loading-gif").style.visibility = "visible";
    }
    for (let i = 0; i < this.files.length; i++) {
      var formData = this.createFormData(this.files[i]);
      this.videoService.addVideo(formData).subscribe((video) => {
        this.ngOnInit();
        document.getElementById("loading-gif").style.visibility = "hidden";
      });
    }
  }

  createFormData(file: File) {
    const formData = new FormData();
    formData.append('title', file.name);
    formData.append('fileName', file);
    return formData;
  }

  segmentate(id): void {
    this.router.navigate(['/segmentation/' + id]);
  }

  annotate(id): void {
    this.router.navigate(['/annotation/' + id]);
  }

  /**
   * Charge les vidéos depuis le serveur
   */
  loadVideos(): void {
    console.log("logvideos");
    this.videoService.getVideos().subscribe((videos) => {
      console.log("videos : ", videos);
      videos.forEach((video) => {
        console.log("video :", video);
        this.videos.push(video);
      });
    });
  }
}
