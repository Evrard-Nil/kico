import { Directive, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appConnector]'
})
export class ConnectorDirective {

  updatedGap = new EventEmitter();
  updateRows = new EventEmitter();

  constructor() { }
}
