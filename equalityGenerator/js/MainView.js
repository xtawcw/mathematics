define(function(){
	function MainView(){
		this.initialize();
	}
	// let MainView = View.extend();
	MainView.basicClass = "main-view";
	
	MainView.prototype.initialize = function(){
		this.render();
	}
	
	MainView.prototype.render = function(){
		if(this._isRendered){
			return;
		}
		
		this._node = $("<div></div>").addClass(MainView.basicClass);
		
		this._isRendered = true;
	}
	
	MainView.prototype.rerender = function(){
		
	}
	
	MainView.prototype.add = function(view){
		this._children = this._children || [];
		
		this._children.push(view);
		this._node.append(view.$());
	}
	
	MainView.prototype.$ = function(){
		return this._node;
	}
	
	MainView.prototype.isRendered = function(){
		return !!this._isRendered;
	}
	
	return MainView;
});