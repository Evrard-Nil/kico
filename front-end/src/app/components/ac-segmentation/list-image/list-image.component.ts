import { ChangeDetectionStrategy } from '@angular/core';
import {
  Component,
	EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  Image
} from 'src/app/model/image'
import { ImageStore } from 'src/app/services/Store/image-store.service';

@Component({
  selector: 'app-list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.css']
})
export class ListImageComponent implements OnInit {

  @Input() images: Observable<Array<Image>>;
  @Input() currentImage: Image;

  @Output() eventSelectedImage: EventEmitter<Image>;

  constructor() {
	  this.eventSelectedImage = new EventEmitter();
  }

  changeSelectedImage(image: Image) {
	  this.eventSelectedImage.emit(image);
  }

  ngOnInit(): void {
	  
  }
}
