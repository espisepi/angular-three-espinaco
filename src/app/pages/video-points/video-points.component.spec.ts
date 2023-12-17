import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPointsComponent } from './video-points.component';

describe('VideoPointsComponent', () => {
  let component: VideoPointsComponent;
  let fixture: ComponentFixture<VideoPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoPointsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
