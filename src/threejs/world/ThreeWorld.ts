import * as THREE from 'three';
import { CameraOperator } from '../core/CameraOperator';
import { IUpdatable } from '../interfaces/IUpdatable';
import { InputManager } from '../core/InputManager';
import { OrbitControls } from '../core/OrbitControls';
import { LoadingManager } from '../loaders/LoadingManager';
import { SceneManager } from '../scenes/SceneManager';

export class ThreeWorld {
  public renderer: THREE.WebGLRenderer;
  public camera: THREE.PerspectiveCamera;
  public composer: any;
  // public stats: Stats;
  public graphicsWorld: THREE.Scene;
  // public sky: Sky;
  // public physicsWorld: CANNON.World;
  // public parallelPairs: any[];
  // public physicsFrameRate: number;
  // public physicsFrameTime: number;
  // public physicsMaxPrediction: number;
  public clock: THREE.Clock;
  public renderDelta: number;
  public logicDelta: number;
  public requestDelta: number | undefined;
  public sinceLastFrame: number;
  public justRendered: boolean;
  public params: any;
  public inputManager: InputManager | undefined;
  public cameraOperator: CameraOperator | undefined;
  public timeScaleTarget: number = 1;
  // public console: InfoStack;
  // public cannonDebugRenderer: CannonDebugRenderer;
  // public scenarios: Scenario[] = [];
  // public characters: Character[] = [];
  // public vehicles: Vehicle[] = [];
  // public paths: Path[] = [];
  // public scenarioGUIFolder: any;
  public updatables: IUpdatable[] = [];

  public loadingManager: LoadingManager;
  public sceneManager: SceneManager;

  orbitControls: OrbitControls | undefined;

  constructor(useOrbitControls: boolean = true) {
    console.log('Hello ThreeWorld TS');

    const scope = this;

    // Renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.generateHTML();

    // Auto window resize
    function onWindowResize(): void {
      scope.camera.aspect = window.innerWidth / window.innerHeight;
      scope.camera.updateProjectionMatrix();
      scope.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize, false);

    // Three.js scene
    this.graphicsWorld = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      80,
      window.innerWidth / window.innerHeight,
      0.1,
      1010
    );

    // RenderLoop
    this.clock = new THREE.Clock();
    this.renderDelta = 0;
    this.logicDelta = 0;
    this.sinceLastFrame = 0;
    this.justRendered = false;

    // Initialization Controls
    if (useOrbitControls) {
      this.orbitControls = new OrbitControls(this, this.camera);
    } else {
      this.inputManager = new InputManager(this, this.renderer.domElement);
      this.cameraOperator = new CameraOperator(
        this,
        this.camera,
        1.0 //this.params.Mouse_Sensitivity
      );
    }

    this.loadingManager = new LoadingManager(this);
    this.sceneManager = new SceneManager(this.loadingManager, this);

    this.render(this);
  }

  private generateHTML(): void {
    // Canvas
    document.body.appendChild(this.renderer.domElement);
    this.renderer.domElement.id = 'canvas';
  }

  // Update
  //  Handles all logic updates.
  public update(timeStep: number, unscaledTimeStep: number): void {
    // Update registred objects
    this.updatables.forEach((entity) => {
      entity.update(timeStep, unscaledTimeStep);
    });
  }

  /**
   * Rendering loop.
   * Implements fps limiter and frame-skipping
   * Calls world's "update" function before rendering.
   * @param {World} world
   */
  public render(world: ThreeWorld): void {
    this.requestDelta = this.clock.getDelta();

    requestAnimationFrame(() => {
      world.render(world);
    });

    // Getting timeStep
    let unscaledTimeStep =
      this.requestDelta + this.renderDelta + this.logicDelta;
    // original: let timeStep = unscaledTimeStep * this.params.Time_Scale;
    let timeStep = unscaledTimeStep * 1.0;
    timeStep = Math.min(timeStep, 1 / 30); // min 30 fps

    // Logic
    world.update(timeStep, unscaledTimeStep);

    // Measuring logic time
    this.logicDelta = this.clock.getDelta();

    // Frame limiting
    let interval = 1 / 60;
    this.sinceLastFrame +=
      this.requestDelta + this.renderDelta + this.logicDelta;
    this.sinceLastFrame %= interval;

    // Stats end
    // this.stats.end();
    // this.stats.begin();

    // Actual rendering with a FXAA ON/OFF switch
    // if (this.params.FXAA) this.composer.render();
    // else this.renderer.render(this.graphicsWorld, this.camera);
    this.renderer.render(this.graphicsWorld, this.camera);

    // Measuring render time
    this.renderDelta = this.clock.getDelta();
  }

  // Metodos
  public updateControls(controls: any): void {
    // let html = '';
    // html += '<h2 class="controls-title">Controls:</h2>';
    // controls.forEach((row) => {
    //   html += '<div class="ctrl-row">';
    //   row.keys.forEach((key) => {
    //     if (key === '+' || key === 'and' || key === 'or' || key === '&')
    //       html += '&nbsp;' + key + '&nbsp;';
    //     else html += '<span class="ctrl-key">' + key + '</span>';
    //   });
    //   html += '<span class="ctrl-desc">' + row.desc + '</span></div>';
    // });
    // document.getElementById('controls').innerHTML = html;
  }

  public registerUpdatable(registree: IUpdatable): void {
    this.updatables.push(registree);
    this.updatables.sort((a, b) => (a.updateOrder > b.updateOrder ? 1 : -1));
  }

  public scrollTheTimeScale(scrollAmount: number): void {
    // Changing time scale with scroll wheel
    const timeScaleBottomLimit = 0.003;
    const timeScaleChangeSpeed = 1.3;

    if (scrollAmount > 0) {
      this.timeScaleTarget /= timeScaleChangeSpeed;
      if (this.timeScaleTarget < timeScaleBottomLimit) this.timeScaleTarget = 0;
    } else {
      this.timeScaleTarget *= timeScaleChangeSpeed;
      if (this.timeScaleTarget < timeScaleBottomLimit)
        this.timeScaleTarget = timeScaleBottomLimit;
      this.timeScaleTarget = Math.min(this.timeScaleTarget, 1);
    }
  }

  public setTimeScale(value: number): void {
    // this.params.Time_Scale = value;
    this.timeScaleTarget = value;
  }
}
