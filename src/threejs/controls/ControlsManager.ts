import { CameraOperator } from '../core/CameraOperator';
import { InputManager } from '../core/InputManager';
import { OrbitControls } from '../core/OrbitControls';
import { IUpdatable } from '../interfaces/IUpdatable';
import { ThreeWorld as World } from '../world/ThreeWorld';

export class ControlsManager {
  updateOrder: number = 1;

  public inputManager: InputManager | undefined;
  public cameraOperator: CameraOperator | undefined;
  orbitControls: OrbitControls | undefined;

  constructor(
    world: World,
    camera: THREE.Camera,
    renderer: THREE.WebGLRenderer,
    useOrbitControls: boolean = false
  ) {
    if (useOrbitControls) {
      this.orbitControls = new OrbitControls(world, camera);
    } else {
      this.inputManager = new InputManager(world, renderer.domElement);
      this.cameraOperator = new CameraOperator(
        world,
        camera,
        1.0 //this.params.Mouse_Sensitivity
      );
    }
  }
}
