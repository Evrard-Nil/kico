import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from 'src/app/model/image';
import { Secteurs } from 'src/assets/data/secteurs';
import { ModalService } from '../../modules/modal';
import { ImageStore } from 'src/app/services/Store/image-store.service';

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
    private imageStore: ImageStore,
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
    this.imageStore.updateImage(this.currentImage).then(() => {
      this.displayMessageSaveImage()
    })
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
