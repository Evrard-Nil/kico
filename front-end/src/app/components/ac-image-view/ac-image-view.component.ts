import { Component, OnInit } from '@angular/core';
import { ACImageAnnotatorComponent } from '../ac-image-annotator/ac-image-annotator.component';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-ac-image-view',
  templateUrl: './ac-image-view.component.html',
  styleUrls: ['./ac-image-view.component.css']
})
export class ACImageViewComponent implements OnInit {


  @ViewChild(ACImageAnnotatorComponent) imageAnnotator: ACImageAnnotatorComponent;

  constructor() { }

  ngOnInit(): void {
  }

  Draw(): void {
    this.imageAnnotator.drawCanvas();
  }

  Save(): void {
    this.imageAnnotator.saveCanvas();
  }

  Undo(): void {
    // this.imageAnnotator.undoAction();
  }

  Redo(): void {
    // this.imageAnnotator.redoAction();
  }


}
