import { Component, OnInit } from '@angular/core';
import { ThreeWorldService } from '../../services/threejs/threeWorld.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private threeWorldService: ThreeWorldService) {}

  ngOnInit(): void {
    this.threeWorldService.loadGLTFScene('assets/heli.glb');
    this.threeWorldService.changeControls(true);
  }
}
