import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Image} from 'src/app/model/image'

@Component({
  selector: 'app-image-thumbnail',
  templateUrl: './image-thumbnail.component.html',
  styleUrls: ['./image-thumbnail.component.css']
})
export class ImageThumbnailComponent implements OnInit {

  @Input() image: Image;
  @Output() eventImageSelected: EventEmitter<Image>;

  constructor() { 
    this.eventImageSelected = new EventEmitter();
  }

  ngOnInit(): void {
    
  }

  selectThisImage(){
    this.eventImageSelected.emit(this.image)
  }

}
