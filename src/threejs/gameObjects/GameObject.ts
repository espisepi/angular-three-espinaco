import * as THREE from 'three';

import { IUpdatable } from '../interfaces/IUpdatable';
import { ThreeWorld as World } from '../world/ThreeWorld';

export class GameObject implements IUpdatable {
  updateOrder: number = 999;

  world: World;
  mesh: THREE.Mesh | THREE.Object3D;

  constructor(
    world: World,
    mesh: THREE.Mesh | THREE.Object3D,
    updateOrder?: number
  ) {
    if (updateOrder) {
      this.updateOrder = updateOrder;
    }
    this.world = world;
    this.mesh = mesh;
    this.addGameObjectToWorld();
  }

  addGameObjectToWorld(): void {
    this.world.graphicsWorld.add(this.mesh);
    this.world.registerUpdatable(this);
  }

  removeGameObjectToWorld() {
    this.world.graphicsWorld.remove(this.mesh);
    this.world.unregisterUpdatable(this);
  }

  dispose(): void {
    // Depende de lo que este compuesto el mesh, pero normalmente hacer dispose de: geometry.dispose(), material.dispose(), texture.dispose()
    // Mirar documentacion de threejs
    this.removeGameObjectToWorld();
  }

  update(timestep: number, unscaledTimeStep: number): void {
    // Metodo que se ejecuta cada frame gracias a: this.world.registerUpdatable(this);
  }
}
