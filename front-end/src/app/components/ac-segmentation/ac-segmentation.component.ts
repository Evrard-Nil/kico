import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Image
} from 'src/app/model/image';
import {
  Video
} from 'src/app/model/video';
import { ImageService } from 'src/app/services/image.service';
import { VideoService } from 'src/app/services/video.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-acsegmentation',
  templateUrl: './ac-segmentation.component.html',
  styleUrls: ['./ac-segmentation.component.css']
})
export class ACSegmentationComponent implements OnInit {
  images: Array <Image> ;
  video: Video;
  currentImage: Image;
  private idVideo: String;

  constructor(private videoService : VideoService, private imageService: ImageService, private route: ActivatedRoute) {
    this.images = new Array();
    this.idVideo = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.loadVideo();
    this.loadImages();
  }

  changeCurrentImage(newImage: Image) {
    this.currentImage = newImage;
  }

  deleteCurrentImage() {
    let indexFound = this.images.indexOf(this.currentImage)
    this.imageService.deleteImage(this.currentImage.id).subscribe((image : Image) => {
      this.images.splice(indexFound,1)
      this.changeCurrentImageOnDelete(indexFound)
    })
  }

  /**
   * On modifie l'image courante en fonction de la position de l'image qui a été supprimée
   * @param index : La place de l'image dans la liste des images
   */
  changeCurrentImageOnDelete(index: number) {
    if(this.images[index] !== undefined) {
      this.changeCurrentImage(this.images[index])
    }
    // L'image était en dernière position, on prend donc l'image d'avant
    else if(this.images[index - 1] !== undefined) {
      this.changeCurrentImage(this.images[index - 1])
    }
    else {
      this.changeCurrentImage(undefined)
    }
  }

  /**
   * Charge la vidéo ayant cet identifiant, depuis le serveur
   */
  loadVideo() {
    this.videoService.getVideo(this.idVideo)
      .subscribe((receivedVideo: Video) => {
        this.video = receivedVideo
        // Ajoute la base de l'url pour permettre la lecture
        this.video.url = environment.fileBaseUrl + this.video.url
      });
  }

  /**
   * Charge les images de la vidéo, depuis le serveur
   */
  loadImages() {
    this.imageService.getImages(this.idVideo)
      .subscribe((images) => {
        images.forEach((image) => {
          image.url = environment.fileBaseUrl + image.url
          this.images.push(image)
        })
    })
  }

  addImageToList(newImage: Image) {
    this.images.push(newImage)
  }

}
