import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ACImageViewComponent } from './ac-image-view.component';

describe('ACImageViewComponent', () => {
  let component: ACImageViewComponent;
  let fixture: ComponentFixture<ACImageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ACImageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ACImageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
