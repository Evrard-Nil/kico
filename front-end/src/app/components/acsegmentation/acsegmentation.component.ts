import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/model/image';

@Component({
  selector: 'app-acsegmentation',
  templateUrl: './acsegmentation.component.html',
  styleUrls: ['./acsegmentation.component.css']
})
export class ACSegmentationComponent implements OnInit {
	images : Array<Image>;
  constructor() { 
	  this.images = new Array();
  }

  ngOnInit(): void {

    this.images.push({
		Secteur_id: '2',
		name: "testeur",
		secteur_name: "Zone 2",
		time: "09:09:09",
		video_id: '2'
	  }, {
		Secteur_id: '2',
		name: "testeur",
		secteur_name: "Zone 2",
		time: "09:09:09",
		video_id: '2'
	  }, {
		Secteur_id: '2',
		name: "testeur",
		secteur_name: "Zone 2",
		time: "09:09:09",
		video_id: '2'
	  }, )
  }

}
