import {
  Component,
	EventEmitter,
  Input,
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
export class ListImageComponent implements OnInit {

  @Input() images: Array <Image>;
  @Output() eventSelectedImage: EventEmitter<Image>;

  constructor() {
	this.eventSelectedImage = new EventEmitter();
  }

  changeSelectedImage(image: Image){
	  this.eventSelectedImage.emit(image);
  }

  ngOnInit(): void {
	  
  }

}
