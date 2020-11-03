import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from 'src/app/model/image';

@Component({
  selector: 'app-form-image-information',
  templateUrl: './form-image-information.component.html',
  styleUrls: ['./form-image-information.component.css']
})
export class FormImageInformationComponent implements OnInit {

  @Input() currentImage: Image;
  @Output() eventCurrentImage : EventEmitter<Image>;

  constructor() {

  }

  onChangeName(newName: String){
    console.log('Change :', newName)
    this.currentImage.name = newName;
    this.eventCurrentImage.emit(this.currentImage)
  }

  ngOnInit(): void {
    this.eventCurrentImage = new EventEmitter();
  }

}
