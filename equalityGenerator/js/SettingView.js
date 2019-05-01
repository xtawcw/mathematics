define(function(){
	let defaultSetting = {
		formulaAmount: 100,
		operands: {
			minAmount: 2,
			maxAmount: 4,
			minValue: 0,
			maxValue: 100,
			types: ["integer", "fraction"],
			improper: true
		},
		operators: ['+', '-', '×', '÷'],
		result: {
			minValue: 0,
			maxValue: 100
		}
	};
	
	function SettingView(){
		this.initialize();
	}
	
	SettingView.prototype.initialize = function(){
		this.render();
	}
	
	SettingView.prototype.render = function(){
		this._node = $("<div class='setting'></div>");
		this._head = $("<div class='head horizontal'></div>");
		this._body = $("<div class='body'></div>");
		
		this.renderHead();
		this.renderBody();
		
		this._node.append(this._head).append(this._body);
		
		this.handleEvent();
		
		this.getSetting();
	}
	
	SettingView.prototype.renderHead = function(){
		this._expanded = false;
		this._expandButton = $("<input type='button'/>");
		this.toggleExpandButton();
		let cell1 = $("<div class='cell'></div>");
		cell1.append(this._expandButton);
		this._head.append(cell1);
		
		this._refreshButton = $("<input type='button'/>").val("生成算式");
		let cell2 = $("<div class='cell'></div>");
		cell2.append(this._refreshButton);
		this._head.append(cell2);
		
		this._resultButton = $("<input type='button'/>");
		this.hideResult();
		let cell3 = $("<div class='cell'></div>");
		cell3.append(this._resultButton);
		this._head.append(cell3);
	}
	
	SettingView.prototype.renderBody = function(){
		let horizontal1 = $("<div class='horizontal'></div>");
		
		let cell1 = $("<div class='cell'></div>");
		let formulaAmountLabel = $("<label for='formula-amount'></label>").text("算式数量:");
		this.formulaAmountInput = $("<input id='formula-amount' type='number' />");
		cell1.append(formulaAmountLabel).append(this.formulaAmountInput);
		horizontal1.append(cell1);
		
		let horizontal2 = $("<div class='horizontal'></div>");
		let cell2 = $("<div class='cell'></div>");
		let minAmountLabel = $("<label for='min-amount'></label>").text("最小算子数量:");
		this.minAmountInput = $("<input id='min-amount' type='number' />");
		cell2.append(minAmountLabel).append(this.minAmountInput);
		horizontal2.append(cell2);
		
		let cell3 = $("<div class='cell'></div>");
		let maxAmountLabel = $("<label for='max-amount'></label>").text("最大算子数量:");
		this.maxAmountInput = $("<input id='max-amount' type='number' />");
		cell3.append(maxAmountLabel).append(this.maxAmountInput);
		horizontal2.append(cell3);
		
		let horizontal3 = $("<div class='horizontal'></div>");
		let cell4 = $("<div class='cell'></div>");
		let minValueLabel = $("<label for='min-value'></label>").text("最小算子值:");
		this.minValueInput = $("<input id='min-amount' type='number' />");
		cell4.append(minValueLabel).append(this.minValueInput);
		horizontal3.append(cell4);
		
		let cell5 = $("<div class='cell'></div>");
		let maxValueLabel = $("<label for='max-value'></label>").text("最大算子值:");
		this.maxValueInput = $("<input id='max-value' type='number' />");
		cell5.append(maxValueLabel).append(this.maxValueInput);
		horizontal3.append(cell5);
		
		let horizontal4 = $("<div class='horizontal'></div>");
		let cell6 = $("<div class='cell'></div>").text("算子类型:");
		horizontal4.append(cell6);
		
		let cell7 = $("<div class='cell'></div>");
		this.integerCheckbox = $("<input id='type-integer' type='checkbox' />");
		let integerLabel = $("<label for='type-integer'></label>").text("整数");
		cell7.append(this.integerCheckbox).append(integerLabel);
		horizontal4.append(cell7);
		
		let cell8 = $("<div class='cell'></div>");
		this.fractionCheckbox = $("<input id='type-fraction' type='checkbox' />");
		let fractionLabel = $("<label for='type-fraction'></label>").text("分数");
		cell8.append(this.fractionCheckbox).append(fractionLabel);
		horizontal4.append(cell8);
		
		let horizontal5 = $("<div class='horizontal'></div>");
		let cell9 = $("<div class='cell'></div>").text("运算符类型:");
		horizontal5.append(cell9);
		
		let cell10 = $("<div class='cell'></div>");
		this.plusCheckbox = $("<input id='type-plus' type='checkbox' />");
		let plusLabel = $("<label for='type-plus'></label>").text("加法");
		cell10.append(this.plusCheckbox).append(plusLabel);
		horizontal5.append(cell10);
		
		let cell11 = $("<div class='cell'></div>");
		this.minusCheckbox = $("<input id='type-minus' type='checkbox' />");
		let minusLabel = $("<label for='type-minus'></label>").text("减法");
		cell11.append(this.minusCheckbox).append(minusLabel);
		horizontal5.append(cell11);
		
		let cell12 = $("<div class='cell'></div>");
		this.multipleCheckbox = $("<input id='type-multiple' type='checkbox' />");
		let multipleLabel = $("<label for='type-multiple'></label>").text("乘法");
		cell12.append(this.multipleCheckbox).append(multipleLabel);
		horizontal5.append(cell12);
		
		let cell13 = $("<div class='cell'></div>");
		this.divisionCheckbox = $("<input id='type-division' type='checkbox' />");
		let divisionLabel = $("<label for='type-division'></label>").text("除法");
		cell13.append(this.divisionCheckbox).append(divisionLabel);
		horizontal5.append(cell13);
		
		let horizontal6 = $("<div class='horizontal'></div>");
		let cell14 = $("<div class='cell'></div>").text("分数类型:");
		horizontal6.append(cell14);
		
		let cell15 = $("<div class='cell'></div>");
		this.improperRadio = $("<input id='type-improper' type='radio' name='fraction' />");
		let improperLabel = $("<label for='type-improper'></label>").text("假分数");
		cell15.append(this.improperRadio).append(improperLabel);
		horizontal6.append(cell15);
		
		let cell16 = $("<div class='cell'></div>");
		this.mixedRadio = $("<input id='type-mixed' type='radio' name=fraction />");
		let mixedLabel = $("<label for='type-mixed'></label>").text("带分数");
		cell16.append(this.mixedRadio).append(mixedLabel);
		horizontal6.append(cell16);
		
		this._body.append(horizontal1);
		this._body.append(horizontal2);
		this._body.append(horizontal3);
		this._body.append(horizontal4);
		this._body.append(horizontal5);
		this._body.append(horizontal6);
	}
	
	SettingView.prototype.getSetting = function(){
		let formulaAmount = this.formulaAmountInput.val();
		if(formulaAmount.trim() === "" || isNaN(formulaAmount)){
			formulaAmount = defaultSetting.formulaAmount;
		}else{
			formulaAmount = parseInt(formulaAmount);
			if(formulaAmount < 1){
				formulaAmount = 1;
			}
		}
		this.formulaAmountInput.val(formulaAmount);
		
		let minAmount = this.minAmountInput.val();
		if(minAmount.trim() === "" || isNaN(minAmount)){
			minAmount = defaultSetting.operands.minAmount;
		}else{
			minAmount = parseInt(minAmount);
			if(minAmount < 2){
				minAmount = 2;
			}
		}
		this.minAmountInput.val(minAmount);
		
		let maxAmount = this.maxAmountInput.val();
		if(maxAmount.trim() === "" || isNaN(maxAmount)){
			maxAmount = defaultSetting.operands.maxAmount;
		}else{
			maxAmount = parseInt(maxAmount);
			if(maxAmount < minAmount){
				maxAmount = minAmount;
			}
		}
		this.maxAmountInput.val(maxAmount);
		
		let minValue = this.minValueInput.val();
		if(minValue.trim() === "" || isNaN(minValue)){
			minValue = defaultSetting.operands.minValue;
			this.minValueInput.val(minValue);
		}else{
			minValue = parseInt(minValue);
		}
		
		let maxValue = this.maxValueInput.val();
		if(maxValue.trim() === "" || isNaN(maxValue)){
			maxValue = defaultSetting.operands.maxValue;
		}else{
			maxValue = parseInt(maxValue);
			if(maxValue < minValue + 10){
				maxValue = minValue + 10;
			}
		}
		this.maxValueInput.val(maxValue);
		
		let types = [];
		let integerChecked = this.integerCheckbox.prop("checked");
		let fractionChecked = this.fractionCheckbox.prop("checked");
		if(integerChecked){
			types.push("integer");
		}
		if(fractionChecked){
			types.push("fraction");
		}
		if(types.length === 0){
			types = defaultSetting.operands.types;
			if(types.includes("integer")){
				this.integerCheckbox.prop("checked", true);
			}
			if(types.includes("fraction")){
				this.fractionCheckbox.prop("checked", true);
			}
		}
		
		let operators = [];
		let plusChecked = this.plusCheckbox.prop("checked");
		let minusChecked = this.minusCheckbox.prop("checked");
		let multipleChecked = this.multipleCheckbox.prop("checked");
		let divisionChecked = this.divisionCheckbox.prop("checked");
		if(plusChecked){
			operators.push('+');
		}
		if(minusChecked){
			operators.push('-');
		}
		if(multipleChecked){
			operators.push('×');
		}
		if(divisionChecked){
			operators.push('÷');
		}
		if(operators.length === 0){
			operators = defaultSetting.operators;
			if(operators.includes('+')){
				this.plusCheckbox.prop("checked", true);
			}
			if(operators.includes('-')){
				this.minusCheckbox.prop("checked", true);
			}
			if(operators.includes('×')){
				this.multipleCheckbox.prop("checked", true);
			}
			if(operators.includes('÷')){
				this.divisionCheckbox.prop("checked", true);
			}
		}
		
		let improper = this.improperRadio.prop("checked");
		let mixed = this.mixedRadio.prop("checked");
		if(!improper && !mixed){
			improper = defaultSetting.operands.improper;
			this.improperRadio.prop("checked", improper);
			this.mixedRadio.prop("checked", !improper);
		}
		
		return {
			formulaAmount: formulaAmount,
			operands: {
				minAmount: minAmount,
				maxAmount: maxAmount,
				minValue: minValue,
				maxValue: maxValue,
				types: types,
				improper: improper
			},
			operators: operators
		};
	}
	
	SettingView.prototype.handleEvent = function(){
		this._expandButton.click(()=>{
			this.toggleExpandButton();
		});
		
		this._resultButton.click(()=>{
			if($(".result").hasClass("hidden")){
				this.showResult();
			}else{
				this.hideResult();
			}
		});
	}
	
	SettingView.prototype.showResult = function(){
		this._resultButton.val("隐藏结果");
		$(".result").removeClass("hidden");
		$(".formula-draft").addClass("hidden");
	}
	
	SettingView.prototype.hideResult = function(){
		this._resultButton.val("显示结果");
		$(".result").addClass("hidden");
		$(".formula-draft").removeClass("hidden");
	}
	
	SettingView.prototype.toggleExpandButton = function(){
		this._expanded = !this._expanded;
		if(this._expanded){
			this._expandButton.val("折叠");
			this._body.show();
		}else{
			this._expandButton.val("展开");
			this._body.hide();
		}
	}
	
	SettingView.prototype.$ = function(){
		return this._node;
	}
	
	SettingView.prototype.listenRefresh = function(callback){
		this._refreshButton.click(()=>{
			let setting = this.getSetting();
			callback(setting);
		});
	}
	
	return SettingView;
});