import {
  Component,
  Input,
  OnInit
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

  @Input() images: Array <Image> ;
  constructor() {
  }

  ngOnInit(): void {
  }

}
