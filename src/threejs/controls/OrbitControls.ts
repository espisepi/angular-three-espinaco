import { IUpdatable } from '../interfaces/IUpdatable';
import { ThreeWorld as World } from '../world/ThreeWorld';
import { OrbitControls as OrbitControlsThree } from 'three/examples/jsm/controls/OrbitControls';

export class OrbitControls implements IUpdatable {
  updateOrder: number = 4;

  controls: OrbitControlsThree;

  constructor(world: World, camera: THREE.Camera) {
    this.controls = new OrbitControlsThree(camera, world.renderer.domElement);
    this.setupControls();
    world.registerUpdatable(this);
  }
  update(timestep: number, unscaledTimeStep: number): void {
    this.controls.update();
  }

  private setupControls(): void {
    this.controls.listenToKeyEvents(window);
    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.05;

    this.controls.screenSpacePanning = false;

    this.controls.minDistance = 10;
    this.controls.maxDistance = 500;

    this.controls.maxPolarAngle = Math.PI / 2;

    this.controls.autoRotate = true;
  }
}
