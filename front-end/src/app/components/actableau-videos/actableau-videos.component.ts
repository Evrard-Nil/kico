import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Video } from 'src/app/model/video';
import { VideoService } from 'src/app/services/video.services';
import { Router } from '@angular/router';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-actableau-videos',
  templateUrl: './actableau-videos.component.html',
  styleUrls: ['./actableau-videos.component.css']
})
export class ActableauVideosComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef; files = [];

  videos: Array<Video>;

  // tslint:disable-next-line:max-line-length
  constructor(private videoService: VideoService, private uploadService: UploadService, private router: Router) { this.videos = new Array<Video>(); }

  ngOnInit(): void {
    this.loadVideos();
    this.videos.push({
      id: '91',
      scorePci: 12,
      annotatedBy: 'Jean',
      date: new Date(),
      state: 'Annoté',
      title: 'test',
      url: 'url',
      path: 'path',
    }, {
      id: '92',
      scorePci: 15,
      annotatedBy: 'Pierre',
      date: new Date(),
      state: 'Annoté',
      title: 'test',
      url: 'url',
      path: 'path',
    }
    );
  }

  deleteVideo(id): void {
    console.log(id);
    // this.videoService.deleteVideo(id);
  }

  addVideo(): void {
    console.log('add video');
    this.videoService.addVideo({
      id: '92',
      scorePci: 15,
      annotatedBy: 'Pierre',
      date: new Date(),
      state: 'Annoté',
      title: 'test',
      url: 'url',
      path: 'path',
    });
    /*const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
        this.uploadFile(file);
      }
      // this.uploadFiles();
    }; */
    // fileUpload.click();
  }

  uploadFile(file): void {
    /* const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.uploadService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`Upload failed: ${file.data.name}`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });*/
  }

  segmentate(id): void {
    console.log('segmentate ' + id);
    this.router.navigate(['/segmentation/:id', { queryParams: { id } }]);
  }

  annotate(id): void {
    console.log('annotate ' + id);
    this.router.navigate(['/annotation/:id', { queryParams: { id } }]);
  }

  /**
   * Charge les vidéos depuis le serveur
   */
  loadVideos(): void {
    this.videoService.getVideos()
      .subscribe((videos) => {
        console.log('VIDEOS RECUE :', videos);
        videos.forEach((video) => {
          this.videos.push(video);
        });
        console.log(videos);
      });
  }

}