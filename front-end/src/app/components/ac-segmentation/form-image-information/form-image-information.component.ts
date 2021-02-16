import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from 'src/app/model/image';
import { Secteurs } from 'src/assets/data/secteurs';
import { ImageService } from 'src/app/services/image.service';
import { ModalService } from '../../modules/modal';

const MESSAGE_SAVE_IMAGE = "Informations sauvegardées"

@Component({
  selector: 'app-form-image-information',
  templateUrl: './form-image-information.component.html',
  styleUrls: ['./form-image-information.component.css'],
})
export class FormImageInformationComponent implements OnInit {
  @Input() currentImage: Image;
  @Output() eventNameImage: EventEmitter<Image>;
  @Output() eventDeleteImage: EventEmitter<Image>;
  secteurs = Secteurs;
  messageSaveImage : string;

  constructor(
    private imageService: ImageService,
    private modalService: ModalService
  ) {
    this.eventNameImage = new EventEmitter();
    this.eventDeleteImage = new EventEmitter();
  }

  ngOnInit(): void {}

  onDeleteImage() {
    this.eventDeleteImage.emit(this.currentImage);
  }

  onChangeName(newName: String) {
    this.currentImage.name = newName;
    this.eventNameImage.emit(this.currentImage);
  }

  onUpdateImage() {
    const image = this.cloneImageToUpdate(this.currentImage);
    this.imageService.updateImage(image).subscribe((code) => {
      if(code === "OK"){
        this.displayMessageSaveImage()
      }
    });
  }

  cloneImageToUpdate(currentImage: Image) {
    var image = new Image();
    image.id = currentImage.id;
    image.name = currentImage.name;
    image.secteur_id = currentImage.secteur_id;
    image.time = currentImage.time;
    image.url = '/' + this.currentImage.url.match(/images\/(.)*/)[0];
    image.video_id = currentImage.video_id;
    image.annotations = currentImage.annotations;

    return image;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
  
  modalOnDeleteImage(id : string) {
    this.onDeleteImage()
    this.closeModal(id)
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  displayMessageSaveImage() {
    this.messageSaveImage = MESSAGE_SAVE_IMAGE
    setTimeout(() => {
      this.messageSaveImage = ""
    }, 3000)
  }
}
