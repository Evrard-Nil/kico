import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ACHeaderComponent } from './acheader.component';

describe('ACHeaderComponent', () => {
  let component: ACHeaderComponent;
  let fixture: ComponentFixture<ACHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ACHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ACHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
