import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { Video } from "../model/video"
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private apiService: ApiService) {   }

  getVideos() {
    return this.apiService.doGet<Array<Video>>(`${environment.apiBaseUrl}/videos`)
  }

  getVideo(idVideo: number) {
    return this.apiService.doGet<Video>(`${environment.apiBaseUrl}/video/${idVideo}`)
  }

  addVideo(video: Video) {
    return this.apiService.doPost(`${environment.apiBaseUrl}/video`, video)
  }
}
