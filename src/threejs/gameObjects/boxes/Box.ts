import * as THREE from 'three';

import { IUpdatable } from '../../interfaces/IUpdatable';
import { ThreeWorld as World } from '../../world/ThreeWorld';
import { GameObject } from '../GameObject';

export class Box extends GameObject {
  constructor(world: World) {
    super(
      world,
      new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
      )
    );
    this.mesh.position.set(0, 0, -5.0);
  }

  override update(timestep: number, unscaledTimeStep: number): void {
    this.mesh.rotation.y += 0.1;
  }
}
