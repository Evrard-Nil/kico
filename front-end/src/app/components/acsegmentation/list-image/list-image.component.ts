import { ChangeDetectionStrategy } from '@angular/core';
import {
  Component,
	EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import {
  Image
} from 'src/app/model/image'

@Component({
  selector: 'app-list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.css']
})
export class ListImageComponent implements OnInit, OnChanges {

  @Input() images: Array <Image>;
  @Output() eventSelectedImage: EventEmitter<Image>;

  @Input() currentImage: Image;

  constructor() {
	  this.eventSelectedImage = new EventEmitter();
  }

  changeSelectedImage(image: Image) {
    this.currentImage = image
	  this.eventSelectedImage.emit(image);
  }

  ngOnInit(): void {
	  
  }

  ngOnChanges() {
    console.log("Changement !")
  }

}
