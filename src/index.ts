import { Scene3D, PhysicsLoader, Project, ExtendedObject3D } from 'enable3d';
import * as THREE from 'three';
import { SpriteFactory } from './code/SpriteFactory';
import { addWindowEvents } from './code/WindowEvents';
import { Vector3 } from 'three';
import { Player } from './code/objects/Player';
import { KeyboardController } from './controller/KeyboardController';
import { GameWorld } from './code/objects/GameWorld';

export class ThreePhysicsComponent extends Scene3D {
  spriteFactory: SpriteFactory | undefined;
  player: Player | undefined;
  keyboardController: KeyboardController | undefined;
  addExisting: (obj: any) => any;
  gameWorld: GameWorld | undefined;

  constructor() {
    super();
    this.addExisting = obj => this.add.existing(obj);
  }

  async init() {
    this.spriteFactory = new SpriteFactory(this.physics, this.addExisting);
    this.player = new Player(this.physics, this.camera);
    this.gameWorld = new GameWorld(this.spriteFactory, this.physics);
    this.keyboardController = new KeyboardController(this.player);
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    addWindowEvents(this.camera, this.renderer, this.keyboardController);
  }

  async preload() {}

  async create() {
    // set up scene (light, ground, grid, sky, orbitControls)
    this.warpSpeed('-orbitControls');

    if (this.physics.debug) {
      this.physics.debug.enable();
    }

    //Render Scene
    this.gameWorld && this.gameWorld.renderWorld();

    //Render Player
    if (this.spriteFactory && this.player) {
      const playerObject = await this.spriteFactory.addGLTFObject(
        './assets/glbs/Chair.glb',
        new Vector3(5, 0, 5),
        new Vector3(0, -4.3, -0.5),
        new Vector3(5, 8, 5),
        new Vector3(0, -(Math.PI / 2), 0),
        new Vector3(0.25, 0.25, 0.25),
        new Vector3(1, 1, 1),
        0,
        100,
      );
      this.player.setSprite(playerObject);
    }
  }

  update() {
    this.keyboardController && this.keyboardController.resolvePlayerInputMovement();
    this.player && this.player.updateCamera();
    this.player && this.player.getPosition().y < -10 && this.player.reset();
  }
}

// set your project configs
const config = { scenes: [ThreePhysicsComponent], antialias: true, gravity: { x: 0, y: -9.81, z: 0 } };
PhysicsLoader('/ammo', () => new Project(config));
