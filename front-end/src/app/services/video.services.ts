import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Video } from '../model/video';
import { ApiService } from './api.services';

@Injectable({
    providedIn: 'root'
})
export class VideoService {

    constructor(private apiService: ApiService) { }

    // tslint:disable-next-line:typedef
    getVideos() {
        return this.apiService.doGet<Array<Video>>(`${environment.apiBaseUrl}/videos`);
    }

    // tslint:disable-next-line:typedef
    getVideo(idVideo: number) {
        return this.apiService.doGet<Video>(`${environment.apiBaseUrl}/video/${idVideo}`);
    }

    // tslint:disable-next-line:typedef
    updateVideo(video: Video) {
        return this.apiService.doPut<Video>(`${environment.apiBaseUrl}/video/${video.id}`, video);
    }

    // tslint:disable-next-line:typedef
    addVideo(video: Video) {
        return this.apiService.doPost<Video>(`${environment.apiBaseUrl}/video`, video);
    }

    // tslint:disable-next-line:typedef
    deleteVideo(idVideo: number) {
        return this.apiService.doDelete(`${environment.apiBaseUrl}/video/${idVideo}`);
    }
}
