import { IUpdatable } from '../interfaces/IUpdatable';
import { ThreeWorld as World } from '../world/ThreeWorld';
import { OrbitControls as OrbitControlsThree } from 'three/examples/jsm/controls/OrbitControls';

export class OrbitControls implements IUpdatable {
  updateOrder: number = 4;

  controls: OrbitControlsThree;

  constructor(world: World, camera: THREE.Camera) {
    this.controls = new OrbitControlsThree(camera, world.renderer.domElement);
    world.registerUpdatable(this);
    console.log({
      camera,
      renderer: world.renderer.domElement,
      controls: this.controls,
    });
  }
  update(timestep: number, unscaledTimeStep: number): void {
    this.controls.update();
  }
}
