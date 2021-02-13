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
    this.videos = new Array<Video>();
  }

  ngOnInit(): void {
    this.loadVideos();
  }

  deleteVideo(id): void {
    console.log(id);
    // this.videoService.deleteVideo(id);
  }

  addVideo(): void {
    this.files = this.fileUpload.nativeElement.files;
    for (let i = 0; i < this.files.length; i++) {
      var formData = this.createFormData(this.files[i]);
      this.videoService.addVideo(formData).subscribe((video) => {
        // TODO : Update du component pour ne pas avoir à recharger la page pour l'affichage de la vidéo ?
        console.log(video);
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
    console.log('segmentate ' + id);
    this.router.navigate(['/segmentation/' + id]);
  }

  annotate(id): void {
    console.log('annotate ' + id);
    this.router.navigate(['/annotation/' + id]);
  }

  /**
   * Charge les vidéos depuis le serveur
   */
  loadVideos(): void {
    this.videoService.getVideos().subscribe((videos) => {
      console.log('VIDEOS RECUE :', videos);
      videos.forEach((video) => {
        console.log('video loaded:');
        console.log(video);

        this.videos.push(video);
      });
      console.log(videos);
    });
  }
}
