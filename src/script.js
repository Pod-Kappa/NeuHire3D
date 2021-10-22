import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {Player} from './player.js'

var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;

var keyboard = {};
var player;
var USE_WIREFRAME = false;

// An object to hold all the things needed for our loading screen
var loadingScreen = {
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(90, 1280/720, 0.1, 100),
	box: new THREE.Mesh(
		new THREE.BoxGeometry(0.5,0.5,0.5),
		new THREE.MeshBasicMaterial({ color:0x4444ff })
	)
};
var loadingManager = null;
var RESOURCES_LOADED = false;

function init(){
	scene = new THREE.Scene();
	player = new Player(scene);

	// Set up the loading screen's scene.
	loadingScreen.box.position.set(0,0,5);
	loadingScreen.camera.lookAt(loadingScreen.box.position);
	loadingScreen.scene.add(loadingScreen.box);
	
	// Create a loading manager to set RESOURCES_LOADED when appropriate.
	// Pass loadingManager to all resource loaders.
	loadingManager = new THREE.LoadingManager();
	
	loadingManager.onProgress = function(item, loaded, total){
		console.log(item, loaded, total);
	};
	
	loadingManager.onLoad = function(){
		console.log("loaded all resources");
		RESOURCES_LOADED = true;
	};
	
	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(20,20, 10,10),
		new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
	);
	meshFloor.rotation.x -= Math.PI / 2;
	meshFloor.receiveShadow = true;
	scene.add(meshFloor);
	
	ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);
	
	light = new THREE.PointLight(0xffffff, 0.8, 18);
	light.position.set(-3,6,-3);
	light.castShadow = true;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 25;
	scene.add(light);
	
	player.camera.position.set(0, player.height, player.offset);
	player.camera.lookAt(new THREE.Vector3(0,player.height,0));
	
	renderer = new THREE.WebGLRenderer();
	
	const sizes = {
		width: window.innerWidth,
		height: window.innerHeight
	}

	window.addEventListener('resize', () =>
	{
		// Update sizes
		sizes.width = window.innerWidth
		sizes.height = window.innerHeight

		// Update camera
		player.camera.aspect = sizes.width / sizes.height
		player.camera.updateProjectionMatrix()

		// Update renderer
		renderer.setSize(sizes.width, sizes.height)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	})
	renderer.setSize(sizes.width, sizes.height);

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	
	document.body.appendChild(renderer.domElement);
	
  	loadingScreen.box.position.x = 10;
	animate();
}

function animate(){
	// This block runs while resources are loading.
	if( RESOURCES_LOADED == false ){
		requestAnimationFrame(animate);
	
	  loadingScreen.box.position.x -= 0.5;
      if( loadingScreen.box.position.x < -10 ) RESOURCES_LOADED = true;
      loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x)

      renderer.render(loadingScreen.scene, loadingScreen.camera);
  		return;
	}
	requestAnimationFrame(animate);
	
	// mesh.rotation.x += 0.01;
	// mesh.rotation.y += 0.02;
	// crate.rotation.y += 0.01;
	
	if(keyboard[37]){ // left arrow key
		player.moveLeft();
	}
	else if(keyboard[39]){ // right arrow key
		player.moveRight();
	}
	else if(keyboard[38]){ // left arrow key
		player.moveForward();
	}
	else if(keyboard[40]){ // right arrow key
		player.moveBackward();
	}
	
	renderer.render(scene, player.camera);
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

	
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;