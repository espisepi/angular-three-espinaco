import * as THREE from 'three';
import { LoadingManager } from '../loaders/LoadingManager';
import { ThreeWorld as World } from '../world/ThreeWorld';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export class SceneManager {
  loadingManager: LoadingManager;
  world: World;

  constructor(loadingManager: LoadingManager, world: World) {
    this.loadingManager = loadingManager;
    this.world = world;

    this.createLights();

    this.createDefaultObjects();

    this.loadSceneGLTFByPath('assets/car.glb');
  }

  loadSceneGLTFByPath(scenePath: string): void {
    this.loadingManager.onFinishedCallback = () => {
      this.world.update(1, 1);
      this.world.setTimeScale(1);
    };
    this.loadingManager.loadGLTF(scenePath, (gltf) => {
      this.loadSceneGLTF(gltf);
    });
  }

  public loadSceneGLTF(gltf: GLTF): void {
    const scene = gltf.scene;
    scene.scale.set(1, 1, 1);
    scene.position.set(0, 0, 0);
    this.world.graphicsWorld.add(scene);
  }

  createLights(): void {
    const ambientLight = new THREE.AmbientLight();
    this.world.graphicsWorld.add(ambientLight);
  }

  createDefaultObjects(): void {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    );
    mesh.position.set(0, 0, -5.0);
    this.world.graphicsWorld.add(mesh);
  }
}