export default class Player {
	constructor(domElement) {
		this._container = domElement;
		// Renderer
		this._renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		this._renderer.gammaOutput = true;

		this._container.appendChild(this._renderer.domElement);
		
		// Camera + scene
		this._camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.01, 1000);
		this._camera.position.set(3, 3, 3);
		this._camera.lookAt(new THREE.Vector3(0, 0, 0));
		this._scene = new THREE.Scene();
		this._scene.fog = new THREE.FogExp2(0xfff1bf, 0.03);

		this.onPreRenderFcts = [];
		this.onPostRenderFcts = [];

		// render scene
		this._updateLoop = null;
		this._lastTimeMsec = 0;

		// resize
		this._onWindowResize();
		window.addEventListener('resize', () => {
			this._onWindowResize();
		}, false)
	}
	get scene() {
		return this._scene;
	}
	get camera() {
		return this._camera;
	}
	get rendererDomElement() {
		return this._renderer.domElement;
	}
	start() {
		const _this = this;
		this._updateLoop = requestAnimationFrame(function animate(nowMsec) {
			_this._updateLoop = requestAnimationFrame(animate);
			const myDelta = _this._getDelta(nowMsec);
			_this._update(myDelta / 1000, nowMsec / 1000);
		})
	}
	stop() {
		cancelRequestAnimFrame(this._updateLoop);
		this._updateLoop = null;
	}
	_update(delta, now) {
		this.onPreRenderFcts.forEach((onPreRenderFct) => {
			onPreRenderFct(delta, now);
		})

		if (window.TWEEN) TWEEN.update(now * 1000);
		this._renderer.render(this._scene, this._camera);

		this.onPostRenderFcts.forEach((onPostRenderFct) => {
			onPostRenderFct(delta, now);
		})
	}
	_getDelta(nowMsec) {
		// get time of the last call
		this._lastTimeMsec = this._lastTimeMsec || nowMsec - 1000 / 60;
		// get delta between now and last call
		const deltaMsec = Math.min(200, nowMsec - this._lastTimeMsec);
		// set last time as now
		this._lastTimeMsec = nowMsec;

		return deltaMsec;
	}
	_onWindowResize() {
		const width = window.innerWidth;
		const height = window.innerHeight;
		this._camera.aspect = width / height;
		this._camera.updateProjectionMatrix();
		this._renderer.setSize(width, height);
	}


}