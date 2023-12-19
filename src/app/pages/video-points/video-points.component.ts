import { Component, OnInit } from '@angular/core';
import { ThreeWorldService } from '../../services/threejs/threeWorld.service';

@Component({
  selector: 'app-video-points',
  templateUrl: './video-points.component.html',
  styleUrl: './video-points.component.scss',
})
export class VideoPointsComponent implements OnInit {
  constructor(private threeWorldService: ThreeWorldService) {}

  ngOnInit(): void {
    this.threeWorldService.loadGLTFScene('assets/car.glb');
  }
}
