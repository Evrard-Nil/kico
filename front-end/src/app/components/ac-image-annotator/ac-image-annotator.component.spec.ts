import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ACImageAnnotatorComponent } from './ac-image-annotator.component';

describe('ACImageAnnotatorComponent', () => {
  let component: ACImageAnnotatorComponent;
  let fixture: ComponentFixture<ACImageAnnotatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ACImageAnnotatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ACImageAnnotatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
