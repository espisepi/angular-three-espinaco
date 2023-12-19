import { Injectable } from '@angular/core';
import { ThreeWorld } from '../../../threejs/world/ThreeWorld';

@Injectable({
  providedIn: 'root',
})
export class ThreeWorldService {
  world: ThreeWorld | null = null;

  constructor() {
    this.initWorld();
  }

  private initWorld() {
    console.log('InitWorld!');
    this.world = new ThreeWorld();
  }

  loadGLTFScene(scenePath: string) {
    this.world?.loadSceneGLTFByPath(scenePath);
  }
}
