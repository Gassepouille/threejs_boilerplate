import Player from './Player.js';

export default class App {
	constructor() {
		this._player = null;
		this._initPlayer();
	}
	_initPlayer() {
		const appDom = document.querySelector("#app")
		this._player = new Player(appDom)
		this._player.start()
		this._initControls()
		this._addPresetObjects()
		this._addLights()
	}
	_addPresetObjects(){
		// Example to remove
		const axesHelper = new THREE.AxesHelper(1);
		this._player.scene.add(axesHelper);

		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
		const cube = new THREE.Mesh(geometry, material);
		this._player.scene.add(cube);
	}
	_addLights(){
		// add a light in front
		const keyLight = new THREE.DirectionalLight('white', 1);
		keyLight.position.set(1, 1, 0.5);
		this._player.scene.add(keyLight);
		// this._player.onPreRenderFcts.push((delta, now)=>{
		//   keyLight.position.x = 4 * Math.cos(now);
		//   keyLight.position.z = 4 * Math.sin(now);
		// })
		const fillLight = new THREE.DirectionalLight('white', 0.5);
		fillLight.position.set(-1, 1, 0.5);
		this._player.scene.add(fillLight);
		const backLight = new THREE.DirectionalLight('white', 1);
		backLight.position.set(-1, 1, -0.5);
		this._player.scene.add(backLight);
	}
	_initControls(){
		const controls = new THREE.OrbitControls(
			this._player.camera,
			this._player.rendererDomElement
		)
		controls.enableDamping = true;
		controls.dampingFactor = 0.1;
		controls.rotateSpeed = 0.4;
		controls.panSpeed = 0.4;
		controls.zoomSpeed = 0.6;
		controls.minDistance = 0.05;
		controls.screenSpacePanning = true;
		// for the damping
		this._player.onPreRenderFcts.push(controls.update);
	}
}