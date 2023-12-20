import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GameObject } from '../gameObjects/GameObject';
import { Box } from '../gameObjects/boxes/Box';
import { LoadingManager } from '../loaders/LoadingManager';
import { ThreeWorld as World } from '../world/ThreeWorld';

export class Scene {
  public world: World;
  public loadingManager: LoadingManager;

  public gameObjects: Array<GameObject> = [];

  constructor(world: World, loadingManager: LoadingManager) {
    this.world = world;
    this.loadingManager = loadingManager;
  }

  addGameObject(gameObject: GameObject): void {
    this.gameObjects.push(gameObject);
  }

  removeGameObjects(): void {
    this.gameObjects.forEach((gameObject) => {
      gameObject.dispose();
    });
    this.gameObjects = [];
  }

  dispose() {
    this.removeGameObjects();
  }

  addModelGLTF(path: string): void {
    this.loadingManager.loadGLTF(path, (gltf) => {
      this._addModelGLTF(gltf);
    });
  }

  //TODO: removeModelGLTF  (tengo que iterar por el array de gameobjects y eliminarlo)
  // TODO: Usar otro mecanismo como un Map<string,GameObject> para eliminar y añadir gameObjects en la escena

  private _addModelGLTF(gltf: GLTF) {
    const scene = gltf.scene;
    scene.scale.set(1, 1, 1);
    scene.position.set(0, 0, 0);
    this.addGameObject(new GameObject(this.world, scene, 3));
  }
}
