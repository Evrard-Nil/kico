import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ConnectorDirective } from './connector.directive';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit, OnDestroy {

  sub; // Unsubscribe

  gapInPx = 10;
  @HostBinding('style.gap') gap;

  rowsInFr = 3;
  @HostBinding('style.grid-template-rows') rows;

  constructor(private connector: ConnectorDirective, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.sub = this.connector.updatedGap.subscribe(val => {
      if (val) this.gapInPx += 5;
      else if (this.gapInPx > 0) this.gapInPx -= 5;
      this.gap = `${this.gapInPx}px`;
    });

    const rowSub = this.connector.updateRows.subscribe(val => {
      if (val) this.rowsInFr += 1;
      else if (this.rowsInFr > 1) this.rowsInFr -= 1;
      this.rows = this.sanitizer.bypassSecurityTrustStyle(`repeat(${this.rowsInFr}, 1fr)`);
    });

    this.sub.add(rowSub);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

/**
 * Note on 'bypassSecurityTrustStyle'
 *
 * How I like to think of it in simple terms.
 *
 * This update is "safe" because we are controlling the users input.
 * - They only have access to increment or decrement the value inside the CSS function
 * - They do not have access to rewrite our style completely; to inject something malicious.
 */
