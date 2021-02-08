import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  @Input() id;
  @Input() url;

  constructor() { }
}
