import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Scene3D, PhysicsLoader, Project, ExtendedObject3D } from 'enable3d';
import * as THREE from 'three';

export class ThreePhysicsComponent extends Scene3D {
  constructor() {
    super();
  }

  async init() {
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  async preload() {}

  async create() {
    // set up scene (light, ground, grid, sky, orbitControls)
    this.warpSpeed();

    // position camera
    this.camera.position.set(13, 10, 23);

    // enable physics debug
    // if (this.physics.debug) {
    //   this.physics.debug.enable();
    // }

    //gltf loader
    new GLTFLoader().loadAsync('./assets/glbs/Chair.glb').then(gltf => {
      const duck: any = gltf.scene.children[0];
      duck.position.y -= 1;
      const object = new ExtendedObject3D();
      object.add(duck);
      object.position.z = 6;
      this.add.existing(object);
      this.physics.add.existing(object, { shape: 'box', width: 2, height: 2, depth: 2 });
    });
  }

  update() {}
}

// set your project configs
const config = { scenes: [ThreePhysicsComponent], antialias: true, gravity: { x: 0, y: -9.81, z: 0 } };
PhysicsLoader('/ammo', () => new Project(config));
