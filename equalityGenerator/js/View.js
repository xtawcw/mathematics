define(function(){
	function View(){
		
	}
	
	View.extend = function(){
		let ChildView = function(){
			View.call(this);
		};
		(function(){
			let Super = function(){};
			Super.prototype = View.prototype;
			ChildView.prototype = new Super();
			ChildView.prototype.constructor = ChildView;
		})();
		
		return ChildView;
	}
	
	return View;
});