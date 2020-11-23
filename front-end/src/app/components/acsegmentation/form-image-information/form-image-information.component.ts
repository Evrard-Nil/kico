import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from 'src/app/model/image';
import { Secteurs } from 'src/assets/data/secteurs'

@Component({
  selector: 'app-form-image-information',
  templateUrl: './form-image-information.component.html',
  styleUrls: ['./form-image-information.component.css']
})
export class FormImageInformationComponent implements OnInit {

  @Input() currentImage: Image;
  @Output() eventNameImage : EventEmitter<Image>;
  @Output() eventDeleteImage : EventEmitter<Image>;
  secteurs = Secteurs

  constructor() {
		this.eventNameImage = new EventEmitter();
		this.eventDeleteImage = new EventEmitter();
  }

  ngOnInit(): void {
    
  }

  onDeleteImage() {
		this.eventDeleteImage.emit(this.currentImage)
  }

  onChangeName(newName: String){
    this.currentImage.name = newName;
    this.eventNameImage.emit(this.currentImage)
  }

  

}
