define(function(){
	function TextView(type, value, setting){
		this.type = type;
		this.value = value;
		this.setting = setting || {};
		this.initialize();
	}
	
	TextView.prototype.initialize = function(){
		this.render();
	}
	
	TextView.prototype.render = function(){
		this._node = $("<div class='" + this.type + "-text text'></div>");
		if(this.type === "fraction" || this.type === "integer"){
			this._node.addClass("number-text");
		}
		if(this.type === "fraction"){
			if(this.setting.improper){
				this.integer = "";
				this.numerator = this.value[0];
				this.denominator = this.value[1];
			}else {
				this.numerator = this.value[0] % this.value[1];
				this.denominator = this.value[1];
				this.integer = (this.value[0] - this.numerator)/this.value[1];
				this.integer = this.integer || "";
			}
			
			
			this._$integer = $("<div class='fraction-integer'></div>").text(this.integer);
			this._$fraction = $("<div class='fraction-fraction'></div>");
			this._$numberator = $("<div class='fraction-numerator'></div>").text(this.numerator);
			this._$semicolon = $("<div class='fraction-semicolon'></div>");
			this._$denominator = $("<div class='fraction-denominator'></div>").text(this.denominator);
			
			this._$fraction.append(this._$numberator).append(this._$semicolon).append(this._$denominator);
			this._node.append(this._$integer).append(this._$fraction);
		}else{
			this._node.text(this.value);
		}
		if(this.setting.show === false){
			this._node.addClass("hidden");
		}
		if(this.setting.className){
			this._node.addClass(this.setting.className);
		}
	}
	
	TextView.prototype.$ = function(){
		return this._node;
	}
	
	return TextView;
});