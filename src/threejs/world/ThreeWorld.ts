import * as THREE from 'three';

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
  // public inputManager: InputManager;
  // public cameraOperator: CameraOperator;
  public timeScaleTarget: number = 1;
  // public console: InfoStack;
  // public cannonDebugRenderer: CannonDebugRenderer;
  // public scenarios: Scenario[] = [];
  // public characters: Character[] = [];
  // public vehicles: Vehicle[] = [];
  // public paths: Path[] = [];
  // public scenarioGUIFolder: any;
  // public updatables: IUpdatable[] = [];

  constructor() {
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

    this.createDefaultObjects();

    this.render(this);
  }

  createDefaultObjects(): void {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    );
    mesh.position.set(0, 0, -5.0);
    this.graphicsWorld.add(mesh);
  }

  private generateHTML(): void {}

  // Update
  //  Handles all logic updates.
  public update(timeStep: number, unscaledTimeStep: number): void {
    // Canvas
    document.body.appendChild(this.renderer.domElement);
    this.renderer.domElement.id = 'canvas';
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
}
