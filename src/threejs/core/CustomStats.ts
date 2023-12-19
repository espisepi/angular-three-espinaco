import Stats from 'three/examples/jsm/libs/stats.module';
import { ThreeWorld as World } from '../world/ThreeWorld';
import { IUpdatable } from '../interfaces/IUpdatable';

export class CustomStats implements IUpdatable {
  updateOrder: number = 999;
  stats: Stats;
  constructor(world: World) {
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
    world.registerUpdatable(this);
  }

  update(): void {
    this.stats.update();
  }
}
