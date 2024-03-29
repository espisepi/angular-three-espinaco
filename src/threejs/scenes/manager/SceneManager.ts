import * as THREE from 'three';
import { LoadingManager } from '../../loaders/LoadingManager';
import { ThreeWorld as World } from '../../world/ThreeWorld';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Box } from '../../gameObjects/boxes/Box';
import { Scene } from '../Scene';
import { Scene1 } from '../scene1/Scene1';

export class SceneManager {
  loadingManager: LoadingManager;
  world: World;
  scenes: Array<THREE.Group> = [];

  selectedScene: Scene | undefined;

  constructor(loadingManager: LoadingManager, world: World) {
    this.loadingManager = loadingManager;
    this.world = world;

    this.createLights();

    this.createScene1();

    // this.createDefaultObjects();

    // this.loadSceneGLTFByPath('assets/heli.glb');
  }

  loadSceneGLTFByPath(scenePath: string): void {
    this.clearScenes();
    this.loadingManager.onFinishedCallback = () => {
      this.world.update(1, 1);
      this.world.setTimeScale(1);
    };
    this.loadingManager.loadGLTF(scenePath, (gltf) => {
      this.loadSceneGLTF(gltf);
    });
  }

  private loadSceneGLTF(gltf: GLTF): void {
    const scene = gltf.scene;
    scene.scale.set(1, 1, 1);
    scene.position.set(0, 0, 0);
    this.world.graphicsWorld.add(scene);
    this.scenes.push(scene);
  }

  clearScenes(): void {
    this.scenes.forEach((scene) => {
      this.world.graphicsWorld.remove(scene);
    });
  }

  // Temporal ===========================
  createLights(): void {
    const ambientLight = new THREE.AmbientLight();
    ambientLight.intensity = 1.0;
    this.world.graphicsWorld.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight();
    directionalLight.position.set(0, 5, 0);
    this.world.graphicsWorld.add(directionalLight);
  }

  createScene1() {
    this.selectedScene = new Scene1(this.world, this.loadingManager);
  }

  // createDefaultObjects(): void {
  //   // Scene1 se encarga de esto
  //   // const mesh = new THREE.Mesh(
  //   //   new THREE.BoxGeometry(1, 1, 1),
  //   //   new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
  //   // );
  //   // mesh.position.set(0, 0, -5.0);
  //   // this.world.graphicsWorld.add(mesh);
  // }
}
