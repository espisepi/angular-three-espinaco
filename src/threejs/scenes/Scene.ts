import { GameObject } from '../gameObjects/GameObject';
import { Box } from '../gameObjects/boxes/Box';
import { ThreeWorld as World } from '../world/ThreeWorld';

export class Scene {
  public world: World;
  public gameObjects: Array<GameObject> = [];

  constructor(world: World) {
    this.world = world;
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
}
