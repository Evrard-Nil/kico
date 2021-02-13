import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Video } from 'src/app/model/video';
import { VideoService } from 'src/app/services/video.services';
import { Router } from '@angular/router';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-actableau-videos',
  templateUrl: './actableau-videos.component.html',
  styleUrls: ['./actableau-videos.component.css']
})
export class ActableauVideosComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef; files = [];

  videos: Array<Video>;

  constructor(private videoService: VideoService, private router: Router) { this.videos = new Array<Video>(); }

  ngOnInit(): void {
    this.loadVideos();
    /* this.videos.push({
       id: '91',
       score_pci: 12,
       annotated_by: 'Jean',
       date: new Date(),
       state: 'Annoté',
       title: 'test',
       url: 'url',
       path: 'path',
     }, {
       id: '92',
       score_pci: 15,
       annotated_by: 'Pierre',
       date: new Date(),
       state: 'Annoté',
       title: 'test',
       url: 'url',
       path: 'path',
     }
     );*/
  }

  deleteVideo(id): void {
    console.log(id);
    // this.videoService.deleteVideo(id);
  }

  addVideo(): void {
    console.log('add video');

    let video = new Video();
    video.id = '92';
    video.score_pci = 15;
    video.annotated_by = 'Pierre';
    video.date = new Date();
    video.state = 'annotated';
    video.title = 'test';
    //video.url = '/videos/b50905c7-de74-40c6-9d7f-bbedafc98c9g';// /videos/{id}
    //video.path = '';// 


    console.log('add video2');
    /*
        const formData = new FormData()
        formData.append('name', "Nouvelle image (" + this.getDurationFromSeconds(time) + ")");
        formData.append('fileName', blob);
        formData.append('secteur_id', "0");
        formData.append('time', this.getDurationFromSeconds(time));
    
        this.videoService.addVideo(formData).subscribe((video) => {
          image.url = environment.fileBaseUrl + image.url
          this.eventCreateImage.emit(image)
        })*/

    this.videoService.addVideo(video);/*
      .subscribe((videos) => {
        console.log('VIDEOS RECUE :', videos);

      });
*/
    console.log('add video3');

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
    this.videoService.getVideos()
      .subscribe((videos) => {
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
