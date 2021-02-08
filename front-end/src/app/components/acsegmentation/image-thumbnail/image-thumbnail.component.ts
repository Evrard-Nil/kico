import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import {Image} from 'src/app/model/image'

@Component({
  selector: 'app-image-thumbnail',
  templateUrl: './image-thumbnail.component.html',
  styleUrls: ['./image-thumbnail.component.css']
})
export class ImageThumbnailComponent implements OnInit, OnChanges {

  @Input() image: Image;
  @Output() eventImageSelected: EventEmitter<Image>;
  @Input() imageSelected : Image

  isSelected : Boolean

  constructor() { 
    this.eventImageSelected = new EventEmitter();
    
  }

  ngOnInit(): void {
    this.isSelected = false
  }

  selectThisImage(){
    this.eventImageSelected.emit(this.image)
  }

  ngOnChanges() {
    if(this.image === this.imageSelected) {
      this.isSelected = true
    }
    else {
      this.isSelected = false
    }
  }

}
