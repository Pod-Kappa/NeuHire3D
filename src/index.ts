import { Scene3D, PhysicsLoader, Project, ExtendedObject3D } from 'enable3d';
import * as THREE from 'three';
import { SpriteFactory } from './code/SpriteFactory';
import { addWindowEvents } from './code/WindowEvents';
import { Vector3 } from 'three';
import { Player } from './code/objects/Player';

export class ThreePhysicsComponent extends Scene3D {
  spriteFactory: SpriteFactory | undefined;
  player: Player | undefined;
  addExisting: (obj: any) => any;

  constructor() {
    super();
    this.addExisting = obj => this.add.existing(obj);
  }

  async init() {
    this.spriteFactory = new SpriteFactory(this.physics, this.addExisting);
    this.player = new Player(this.physics);
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    addWindowEvents(this.camera, this.renderer);
  }

  async preload() {}

  async create() {
    // set up scene (light, ground, grid, sky, orbitControls)
    this.warpSpeed(); // '-orbitControls' for no orbit controls

    if (this.physics.debug) {
      this.physics.debug.enable();
    }

    // position camera
    this.camera.position.set(13, 10, 23);

    //Render Scene
    //TODO: Create world class and run it's render method

    //Render Player
    //TODO: Create Player class and run it's render method
    if (this.spriteFactory && this.player) {
      const playerObject = await this.spriteFactory.addGLTFObject(
        './assets/glbs/Chair.glb',
        new Vector3(0, 5, 0),
        new Vector3(0, -4.3, -0.5),
        new Vector3(5, 8, 5),
        new Vector3(0, 0, 0),
        new Vector3(0.25, 0.25, 0.25),
        1,
        'PLAYER',
      );
      this.player.setSprite(playerObject);
    }
  }

  update() {}
}

// set your project configs
const config = { scenes: [ThreePhysicsComponent], antialias: true, gravity: { x: 0, y: -9.81, z: 0 } };
PhysicsLoader('/ammo', () => new Project(config));
