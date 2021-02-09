import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActableauVideosComponent } from './actableau-videos.component';

describe('ActableauVideosComponent', () => {
  let component: ActableauVideosComponent;
  let fixture: ComponentFixture<ActableauVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActableauVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActableauVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
