import { SpriteFactory } from '../SpriteFactory';

export class GameWorld {
  spriteFactory: SpriteFactory;

  constructor(spriteFactory: SpriteFactory) {
    this.spriteFactory = spriteFactory;
  }

  renderWorld() {
    this.spriteFactory.addGLTFObject('/src/assets/glbs/Bowling_Pin.glb');
  }
}
