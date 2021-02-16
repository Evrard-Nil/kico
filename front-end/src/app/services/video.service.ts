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

  getVideo(idVideo: String) {
    return this.apiService.doGet<Video>(`${environment.apiBaseUrl}/video/${idVideo}`, {Origin : "*"})
  }

  updateVideo(video: Video) {
    return this.apiService.doPut<Video>(`${environment.apiBaseUrl}/video/${video.id}`, video)
  }

  addVideo(formData: FormData) {
    return this.apiService.doPost<Video>(`${environment.apiBaseUrl}/video`, formData)
  }

  deleteVideo(idVideo: String) {
    return this.apiService.doDelete(`${environment.apiBaseUrl}/video/${idVideo}`)
  }
}
