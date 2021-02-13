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


    const fileInput = document.querySelector("#input-ajouter-video");
    fileInput.addEventListener("change", event => {
      console.log("file changed");
      let formData = new FormData()
      let files = event.target.files;//l'IDE souligne peut être mais ça marche
      formData.append("title", "video test");
      formData.append("filename", "vidtest.mp4");
      formData.append("file", files[0]);
      console.log(files);
      console.log(formData);
      this.videoService.addVideo(formData);
    });
  }

  deleteVideo(id): void {
    console.log(id);
    // this.videoService.deleteVideo(id);
  }



  addVideo(): void {

    let video = new Video();
    video.id = '92';
    video.score_pci = 15;
    video.annotated_by = 'Pierre';
    video.date = new Date();
    video.state = 'annotated';
    video.title = 'test';
    //video.url = '/videos/b50905c7-de74-40c6-9d7f-bbedafc98c9g';// /videos/{id}
    //video.path = '';// 

    //this.videoService.addVideo(video);

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
