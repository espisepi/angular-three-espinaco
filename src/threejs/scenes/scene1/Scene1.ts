import { GameObject } from '../../gameObjects/GameObject';
import { Box } from '../../gameObjects/boxes/Box';
import { ThreeWorld as World } from '../../world/ThreeWorld';
import { LoadingManager } from '../../loaders/LoadingManager';
import { Scene } from '../Scene';

export class Scene1 extends Scene {
  constructor(world: World, loadingManager: LoadingManager) {
    super(world, loadingManager);
    this.createGameObjects();
  }

  private createGameObjects(): void {
    this.addGameObject(new Box(this.world));
  }
}
