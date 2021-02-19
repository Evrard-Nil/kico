import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acheader',
  templateUrl: './ac-header.component.html',
  styleUrls: ['./ac-header.component.css']
})
export class ACHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public goHome() {
    this.router.navigate(['/']);
  }
}
