import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from '../../model/image';
import { ImageService } from '../API/image.service';
@Injectable({
  providedIn: 'root',
})
export class ImageStore {
  private _images: BehaviorSubject<Array<Image>> = new BehaviorSubject(Array());
  public readonly images: Observable<Array<Image>> = this._images.asObservable();
  private dataStore: { images: Image[] } = { images: [] };

  constructor(private imageService: ImageService) {}

  async loadImages(idVideo: String) {
    this.imageService.getImages(idVideo).subscribe((images) => {
      images.forEach((image) => {
        image.url = environment.fileBaseUrl + image.url;
      });
      this.dataStore.images = images;
      this._images.next(Object.assign({}, this.dataStore).images);
    });
  }

  async createImage(idVideo : String, formData : FormData) {
    this.imageService.saveImage(idVideo, formData).subscribe((image) => {
      image.url = environment.fileBaseUrl + image.url
      this.dataStore.images.push(image)
      this._images.next(Object.assign({}, this.dataStore).images);
    })
  }

  async deleteImage(image : Image) {
    return new Promise<number>((resolve) => {
      this.imageService.deleteImage(image.id).subscribe(() => {
        const indexImage = this.dataStore.images.indexOf(image)
        this.dataStore.images.splice(indexImage,1)
        this._images.next(Object.assign({}, this.dataStore).images);
        resolve(indexImage)
      })
    }) 
  }

  async updateImage(image : Image) {
    this.imageService.updateImage(this.cloneImageToUpdate(image)).subscribe(() => {
    })
  }

  private cloneImageToUpdate(imageToClone: Image) {
    var image = new Image();
    image.id = imageToClone.id;
    image.name = imageToClone.name;
    image.secteur_id = imageToClone.secteur_id;
    image.time = imageToClone.time;
    image.url = '/' + imageToClone.url.match(/images\/(.)*/)[0];
    image.video_id = imageToClone.video_id;
    image.annotations = imageToClone.annotations;

    return image;
  }
}
