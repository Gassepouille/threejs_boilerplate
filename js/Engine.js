var APP = APP || {};

APP.Engine = class Engine {
	constructor(){
		this._updateLoop = null;
		this._lastTimeMsec = 0;
		this.onUpdateFcts = [];
	}
	start(){
		let _this = this;
		// Animate
		this._updateLoop = requestAnimationFrame(function animate(nowMsec){
			_this._updateLoop = requestAnimationFrame( animate );
			var myDelta = _this._getDelta(nowMsec);
			_this._update(myDelta/1000,nowMsec/1000);
		})
	}
	stop(){
		// Animate
		cancelRequestAnimFrame( this._updateLoop );
		this._updateLoop = null;
	}
	_update(delta, now){
		this.onUpdateFcts.forEach(function(onUpdateFct){
			onUpdateFct(delta, now);
		})
	}
	_getDelta(nowMsec){
		// get time of the last call
		this._lastTimeMsec	= this._lastTimeMsec || nowMsec-1000/60;
		// get delta between now and last call
		let deltaMsec	= Math.min(200, nowMsec - this._lastTimeMsec);
		// set last time as now
		this._lastTimeMsec	= nowMsec;

		return deltaMsec;
	}
}
