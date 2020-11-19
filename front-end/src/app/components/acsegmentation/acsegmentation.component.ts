import { HttpEvent } from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Image
} from 'src/app/model/image';
import {
  Video
} from 'src/app/model/video';
import { ImageService } from 'src/app/services/image.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-acsegmentation',
  templateUrl: './acsegmentation.component.html',
  styleUrls: ['./acsegmentation.component.css']
})
export class ACSegmentationComponent implements OnInit {
  images: Array <Image> ;
  video: Video;
  currentImage: Image;

  constructor(private videoService : VideoService, private imageService: ImageService) {
    this.images = new Array();
  }

  ngOnInit(): void {

    this.images.push({
      id: 1,
      secteur_id: 1,
      name: "testeur",
      time: "12:09:09",
      video_id: 2,
    }, {
      id: 2,
      secteur_id: 2,
      name: "testeur",
      time: "15:09:29",
      video_id: 2,
    }, {
      id: 3,
      secteur_id: 2,
      name: "testeur",
      time: "09:37:09",
      video_id: 2,
  }, );
  this.showVideo();
  this.video = {
    date : new Date(),
    annotated_by : "Me",
    score_pci : 3,
    id : 23,
    url : "../../../../assets/videos/patient.mp4",
    state : "en cours",
    title : "Ma video"
  };
	this.changeCurrentImage(this.images[0])
  }

  changeCurrentImage(newImage: Image) {
    this.currentImage = newImage;
  }

  deleteCurrentImage() {
    let indexFound = this.images.indexOf(this.currentImage)
    this.images.splice(indexFound,1)
    this.changeCurrentImageOnDelete(indexFound)
  }

  changeCurrentImageOnDelete(index: number) {
    if(this.images[index] !== undefined) {
      this.changeCurrentImage(this.images[index])
    }
    else if(this.images[index - 1] !== undefined) {
      this.changeCurrentImage(this.images[index - 1])
    }
    else {
      this.changeCurrentImage(undefined)
    }
  }

  showVideo() {
    this.videoService.getVideo(2)
      .subscribe((receivedVideo: Video) => {
        console.log(receivedVideo)     
      });
  }

  getAllImages() {
    this.imageService.getImagesFromVideo(2)
  }

  terminateSegmentation() {
    console.log("Segmentation terminée")
    // TODO : Sauvegarder la liste des images
    // TODO : Redirection
  }

}
