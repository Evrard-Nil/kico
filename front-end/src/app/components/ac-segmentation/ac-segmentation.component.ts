import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  Image
} from 'src/app/model/image';
import {
  Video
} from 'src/app/model/video';
import { ImageStore } from 'src/app/services/Store/image-store.service';
import { ImageService } from 'src/app/services/API/image.service';
import { VideoService } from 'src/app/services/API/video.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-acsegmentation',
  templateUrl: './ac-segmentation.component.html',
  styleUrls: ['./ac-segmentation.component.css']
})
export class ACSegmentationComponent implements OnInit {
  images : Observable<Array<Image>>
  video: Video;
  currentImage: Image
  private idVideo: String;

  constructor(private videoService : VideoService, private route: ActivatedRoute, private imageStore: ImageStore) {
    this.idVideo = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.loadVideo();
    this.loadImages();
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
    this.images = this.imageStore.images;
    this.imageStore.loadImages(this.idVideo)
  }

  deleteCurrentImage() {
    this.imageStore.deleteImage(this.currentImage).then((indexImage) => {
      this.changeCurrentImageOnDelete(indexImage)
    })
  }

  /**
   * On modifie l'image courante en fonction de la position de l'image qui a été supprimée
   * @param index : La place de l'image dans la liste des images
   */
  private changeCurrentImageOnDelete(index: number) {
    this.images.subscribe((images) => {
      if(images[index] !== undefined) {
        this.changeCurrentImage(images[index])
      }
      // L'image était en dernière position, on prend donc l'image d'avant
      else if(images[index - 1] !== undefined) {
        this.changeCurrentImage(images[index - 1])
      }
      else {
        this.changeCurrentImage(undefined)
      }
    })
    
  }

  changeCurrentImage(newImage: Image) {
    this.currentImage = newImage
  }
}
