var APP = APP || {};

APP.Main = class Main {
	constructor(domElement){
		this._container = domElement;
		// Renderer
		this._renderer  = new THREE.WebGLRenderer({
			antialias  : true,
			alpha    : true,
		});
		this._container.appendChild( this._renderer.domElement );
		// Camera + scene
		this._camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
	        this.scene = new THREE.Scene();
		
		// Engine
		this._engine = new APP.Engine();
		
		// render scene
		this._engine.onUpdateFcts.push((delta,now)=>{
			this._renderer.render( this.scene, this._camera );
		})
		
		// Move camera around center
		this._engine.onUpdateFcts.push((delta,now)=>{
			var posX=5*Math.cos(now);
			var posZ=5*Math.sin(now);
			this._camera.position.set(posX,3,posZ);
			this._camera.lookAt(new THREE.Vector3(0,0,0));
		})
		
		
		// resize
		this.onWindowResize();
		window.addEventListener('resize', ()=>{
	                this.onWindowResize();
	        }, false)
		
		
		this._addObject();
		this._addLights();
	}
	start(){
		this._engine.start();
	}
	stop(){
		this._engine.stop();
	}
	_addObject(){
		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
		var cube = new THREE.Mesh( geometry, material );
		this.scene.add( cube );
	}
	_addLights(){
		// add ambient light
		var light	= new THREE.AmbientLight( 0x020202 );
		this.scene.add( light );
		// add a light in front
		var light	= new THREE.DirectionalLight('white', 1);
		light.position.set(0.5, 0.5, 2);
		this.scene.add( light );
		// add a light behind
		var light	= new THREE.DirectionalLight('white', 0.75);
		light.position.set(-0.5, -0.5, -2);
		this.scene.add( light );
	}
	onWindowResize(){
		var width  =  window.innerWidth;
		var height =  window.innerHeight;
		this._camera.aspect = width / height;
	        this._camera.updateProjectionMatrix();
		this._renderer.setSize( width, height );
	}
	
	
}