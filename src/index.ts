import './style.css';
import * as THREE from 'three';
import { Player } from './player';
import { renderPlayerInfoPannel } from './infoPanel';
import { Controller } from './controller';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { SpriteFactory } from './spriteFactory';

var scene: THREE.Scene, renderer: THREE.WebGLRenderer;
var player: Player;
var controller: Controller;
var spriteFactory: SpriteFactory;
var USE_WIREFRAME = false;

// An object to hold all the things needed for our loading screen
var loadingScreen = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 100),
  box: new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshBasicMaterial({ color: 0x4444ff })),
};
var loadingManager = null;
var RESOURCES_LOADED = false;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);
  spriteFactory = new SpriteFactory(scene);
  player = new Player(scene);
  controller = new Controller(player);

  spriteFactory.getOBJSprite('/assets/glbs/Textured_Pin.obj');

  /* Set Window Events */
  window.addEventListener('keydown', event => controller.keyDown(event));
  window.addEventListener('keyup', event => controller.keyUp(event));
  window.addEventListener('scroll', player.updateCamera);

  // Set up the loading screen's scene.
  loadingScreen.box.position.set(0, 0, 5);
  loadingScreen.camera.lookAt(loadingScreen.box.position);
  loadingScreen.scene.add(loadingScreen.box);

  // Create a loading manager to set RESOURCES_LOADED when appropriate.
  // Pass loadingManager to all resource loaders.
  loadingManager = new THREE.LoadingManager();

  loadingManager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
  };

  loadingManager.onLoad = function () {
    console.log('loaded all resources');
    RESOURCES_LOADED = true;
  };

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200, 10, 10),
    new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: USE_WIREFRAME }),
  );
  ground.rotation.x -= Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  const light = new THREE.PointLight(0xfffffa, 0.8, 200);
  light.position.set(-3, 50, -3);
  light.castShadow = true;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 50;
  light.shadow.autoUpdate = true;
  scene.add(light);

  renderer = new THREE.WebGLRenderer();

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    player.camera.aspect = sizes.width / sizes.height;
    player.camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  renderer.setSize(sizes.width, sizes.height);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;

  renderer.domElement.id = 'webgl';

  document.body.appendChild(renderer.domElement);

  loadingScreen.box.position.x = 10;
  animate();
}

function animate() {
  // This block runs while resources are loading.
  if (RESOURCES_LOADED == false) {
    requestAnimationFrame(animate);

    loadingScreen.box.position.x -= 0.5;
    if (loadingScreen.box.position.x < -10) RESOURCES_LOADED = true;
    loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);

    renderer.render(loadingScreen.scene, loadingScreen.camera);
    return;
  }
  requestAnimationFrame(animate);

  controller.resolvePlayerInputMovement();
  // player && renderPlayerInfoPannel(player);

  renderer.render(scene, player.camera);
}

/* Init Game */
window.onload = init;
