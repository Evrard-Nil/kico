import { Component, Input, OnInit } from '@angular/core';
import {Image} from 'src/app/model/image'

@Component({
  selector: 'app-image-thumbnail',
  templateUrl: './image-thumbnail.component.html',
  styleUrls: ['./image-thumbnail.component.css']
})
export class ImageThumbnailComponent implements OnInit {

  @Input() image: Image;
  constructor() { }

  ngOnInit(): void {
  }

}
