import { BoxBufferGeometry, Vector3 } from 'three';
import { SpriteFactory } from '../SpriteFactory';
import { AmmoPhysics } from 'enable3d/node_modules/@enable3d/ammo-physics';

export class GameWorld {
  spriteFactory: SpriteFactory;
  physics: AmmoPhysics;

  constructor(spriteFactory: SpriteFactory, physics: AmmoPhysics) {
    this.spriteFactory = spriteFactory;
    this.physics = physics;
  }

  async renderWorld() {
    //TODO: Add Ground;
    createPinTriangle(this.spriteFactory, new Vector3(2.5, 0, -5));

    //bowling ball
    this.spriteFactory.addGLTFSphereObject(
      './assets/glbs/BowlingBall.glb',
      new Vector3(5, 0, 5),
      new Vector3(0, 0, 0),
      0.5,
      new Vector3(0, -(Math.PI / 2), 0),
      new Vector3(1, 1, 1),
      new Vector3(5, 5, 5),
      0.85,
      10,
    );
  }
}

const createPinTriangle = (spriteFactory: SpriteFactory, position: Vector3) => {
  var x = 0 + position.x;
  for (var i = 0; i < 4; i++) {
    x++;
    createPin(spriteFactory, new Vector3(x, position.y, 0 + position.z));
  }
  x = 1.5 + position.x;
  for (var i = 0; i < 3; i++) {
    createPin(spriteFactory, new Vector3(x, position.y, -1 + position.z));
    x++;
  }
  x = 2 + position.x;
  for (var i = 0; i < 2; i++) {
    createPin(spriteFactory, new Vector3(x, position.y, -2 + position.z));
    x++;
  }
  createPin(spriteFactory, new Vector3(2.5 + position.x, position.y, -3 + position.z));
};

const createPin = (spriteFactory: SpriteFactory, position: Vector3) => {
  spriteFactory.addGLTFBoxObject(
    './assets/glbs/Bowling_Pin.glb',
    new Vector3(position.x, position.y, position.z),
    new Vector3(0, -0.75, 0),
    new Vector3(0.4, 1.5, 0.4),
    new Vector3(0, -(Math.PI / 2), 0),
    new Vector3(1, 1, 1),
    new Vector3(0.004, 0.004, 0.004),
    0.85,
    5,
  );
};
