import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/model/video';

@Component({
  selector: 'app-actableau-videos',
  templateUrl: './actableau-videos.component.html',
  styleUrls: ['./actableau-videos.component.css']
})
export class ActableauVideosComponent implements OnInit {

  videos: Array<Video>;
  constructor() { this.videos = new Array<Video>(); }

  ngOnInit(): void {
    this.videos.push({
      id: '1',
      scorePci: 12,
      annotatedBy: 'Jean',
      date: new Date(),
      state: 'Annoté',
      title: 'test',
      url: 'url',
      path: 'path',
    }, {
      id: '2',
      scorePci: 15,
      annotatedBy: 'Pierre',
      date: new Date(),
      state: 'Annoté',
      title: 'test',
      url: 'url',
      path: 'path',
    }
    );
  }

}
