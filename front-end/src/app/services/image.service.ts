import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Image } from '../model/image';
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private apiService: ApiService) {   }

  getImages() {
    return this.apiService.doGet<Array<Image>>(environment.apiBaseUrl + '/images')
  }

  getImagesFromVideo(idVideo: number) {
    // TODO : Wait for backend impl
  }
}
