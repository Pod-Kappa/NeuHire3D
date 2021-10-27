import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { ExtendedObject3D } from 'enable3d';
import { AmmoPhysics } from 'enable3d/node_modules/@enable3d/ammo-physics';
import { Vector3 } from 'three';

export class SpriteFactory {
  physics: AmmoPhysics;
  addExisting: (obj: any) => void;

  constructor(physics: AmmoPhysics, addExsisting: (obj: any) => void) {
    this.physics = physics;
    this.addExisting = addExsisting;
  }

  async addGLTFObject(
    path: string,
    worldPosition: Vector3 = new Vector3(0, 0, 0),
    boundingBoxPosition: Vector3 = new Vector3(0, 0, 0),
    boundingBoxRegion: Vector3 = new Vector3(5, 5, 5),
    rotation: Vector3 = new Vector3(0, 0, 0),
    boudingBoxScale: Vector3 = new Vector3(1, 1, 1),
    modelScale: Vector3 = new Vector3(1, 1, 1),
    bounciness = 0,
    weight: number = 5,
  ) {
    return new GLTFLoader()
      .loadAsync(path)
      .then(gltf => {
        const importedGltf: any = gltf.scene;
        importedGltf.position.set(boundingBoxPosition.x, boundingBoxPosition.y, boundingBoxPosition.z);
        importedGltf.scale.set(modelScale.x, modelScale.y, modelScale.z);

        const physObject: ExtendedObject3D = new ExtendedObject3D();
        physObject.add(importedGltf);
        physObject.rotation.set(rotation.x, rotation.y, rotation.z);
        physObject.scale.set(boudingBoxScale.x, boudingBoxScale.y, boudingBoxScale.z);
        physObject.position.set(worldPosition.x, worldPosition.y, worldPosition.z);

        this.addExisting(physObject);
        this.physics.add.existing(physObject, {
          shape: 'box',
          width: boundingBoxRegion.x,
          height: boundingBoxRegion.y,
          depth: boundingBoxRegion.z,
        });

        physObject.body.setBounciness(bounciness > 1 || bounciness < 0 ? 0 : bounciness);

        console.log(`Successfully loaded model: ${path}`);
        return physObject;
      })
      .catch(() => {
        let physObject = this.physics.add.box({ x: 0, y: 2 });
        physObject.rotation.set(rotation.x, rotation.y, rotation.z);
        physObject.scale.set(boudingBoxScale.x, boudingBoxScale.y, boudingBoxScale.z);
        physObject.position.set(worldPosition.x, worldPosition.y, worldPosition.z);

        this.addExisting(physObject);
        this.physics.add.existing(physObject);

        console.log(`Failed to load model: ${path}`);
        return physObject;
      });
  }
}
