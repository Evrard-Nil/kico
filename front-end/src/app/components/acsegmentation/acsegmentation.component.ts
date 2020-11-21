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

@Component({
  selector: 'app-acsegmentation',
  templateUrl: './acsegmentation.component.html',
  styleUrls: ['./acsegmentation.component.css']
})
export class ACSegmentationComponent implements OnInit {
  images: Array <Image> ;
  video: Video;
  currentImage: Image;
  private idVideo: number;

  constructor(private videoService : VideoService, private imageService: ImageService, private route: ActivatedRoute) {
    this.images = new Array();
    this.idVideo = +this.route.snapshot.paramMap.get('id');
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

  loadVideo() {
    this.videoService.getVideo(this.idVideo)
      .subscribe((receivedVideo: Video) => {
        console.log("VIDEO RECUE :",receivedVideo)
        this.video = receivedVideo
        console.log(this.video)
      });
      
      this.video = {
        date : new Date(),
        annotated_by : "Me",
        score_pci : 3,
        id : 23,
        url : "../../../../assets/videos/patient.mp4",
        state : "en cours",
        title : "Ma video"
      };  
  }

  loadImages() {
    this.imageService.getImages(this.idVideo)
      .subscribe((images) => {
        console.log("IMAGES RECUES:", images)
        images.forEach((image) => {
          this.images.push(image)
        })
        console.log(images)
    })

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
    });
  }

  terminateSegmentation() {
    console.log("Segmentation terminée")
    // TODO : Sauvegarder la liste des images
    // TODO : Redirection
  }

}
