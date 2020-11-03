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

@Component({
  selector: 'app-acsegmentation',
  templateUrl: './acsegmentation.component.html',
  styleUrls: ['./acsegmentation.component.css']
})
export class ACSegmentationComponent implements OnInit {
  images: Array <Image> ;
  video: Video;
  currentImage: Image;

  constructor() {
    this.images = new Array();
  }

  ngOnInit(): void {

    this.images.push({
      id: 1,
      Secteur_id: 2,
      name: "testeur",
      secteur_name: "Zone 2",
      time: "12:09:09",
      video_id: 2,
    }, {
      id: 2,
      Secteur_id: 2,
      name: "testeur",
      secteur_name: "Zone 2",
      time: "15:09:29",
      video_id: 2,
    }, {
      id: 3,
      Secteur_id: 2,
      name: "testeur",
      secteur_name: "Zone 2",
      time: "09:37:09",
      video_id: 2,
	}, )
	this.changeCurrentImage(this.images[0])
  }

  changeCurrentImage(newImage: Image){
	this.currentImage = newImage;
	console.log(this.images)
  }

}
