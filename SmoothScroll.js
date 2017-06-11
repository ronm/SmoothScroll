/**************************/
/*** smoothScroll ************/
/*** by Ron Marcelle ******/
/*** Licensed under MIT ***/
/**************************/

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.SmoothScroll = factory();
  }
}(this, function () {
	
    let defaults = {
		speed: 300,
		offset: null,
		callback: null,
	};
	
	return class SmoothScroll {
  
	    constructor(target = null, opts = {}) {
	        this.target = null;
	        this.targetOrig = target;
	        this.startPos = null;
	        this.start = null;
	      
	        this.settings = Object.assign({}, defaults, opts);
	
	        this._start();
	    }
	
	    _scroll() {
		    var percentage = (Date.now() - this.start) / this.settings.speed,
				be = this.startPos + ((this.target - this.startPos) * percentage);
	
	        if ( percentage < 1 ) {
				window.scrollTo(window.scrollX, be);
				window.requestAnimationFrame(() => this._scroll());
		    } else {
				window.scrollTo(window.scrollX, this.target);
				if ( this.settings.callback ) { this.settings.callback.call(this.target); }
			}
		}
	    
	    _start() {
		    requestAnimationFrame(() => {
		      	this.startPos = window.pageYOffset;
		
		        var offset = isNaN(this.settings.offset) ? this._getElement(this.settings.offset).clientHeight : Number(this.settings.offset);
				var target = isNaN(this.targetOrig) ? (this._getElementPosition(this.targetOrig) - offset) : Math.max(0,Number(this.targetOrig)); 
		
				this.target = target < 0 ? (window.pageYOffset + target) : target;			
				this.start = Date.now();
				this._scroll();
			});
	    }
	  
	    _getElement(el) { 
			return el instanceof HTMLElement ? el : document.querySelector(el); 
	    }
	  
	    _getElementPosition(el) {
			return Math.floor(this._getElement(el).getBoundingClientRect().top + this.startPos);
	    }
	}
}));