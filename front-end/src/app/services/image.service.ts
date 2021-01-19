import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Image } from '../model/image';
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private apiService: ApiService) {   }

  getImages(idVideo: String) {
    return this.apiService.doGet<Array<Image>>(`${environment.apiBaseUrl}/video/${idVideo}/images`)
  }

  getImage(idImage: String) {
    return this.apiService.doGet<Image>(`${environment.apiBaseUrl}/images/${idImage}`)
  }

  saveImage(idVideo: String, formData: FormData) {
    return this.apiService.doPost<Image>(`${environment.apiBaseUrl}/video/${idVideo}/images`, formData)
  }

  updateImage(image: Image) {
    this.apiService.doPut<Image>(`${environment.apiBaseUrl}/images/${image.id}`, image)
  }

  deleteImage(idImage: String) {
    this.apiService.doDelete<Image>(`${environment.apiBaseUrl}/image/${idImage}`)
  }
}
