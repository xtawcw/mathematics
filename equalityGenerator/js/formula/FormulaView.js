define(["./TextView", "Util"], function(TextView, Util){
	let defaultConfiguration = {
		operands: {
			minAmount: 5,
			maxAmount: 5,
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
	
	function FormulaView(configuration){
		this.configuration = configuration || defaultConfiguration;
		this._showResult = false;
		this.initialize();
	}
	
	FormulaView.prototype.initialize = function(){
		// this.validateConfiguration();
		this.generate();
		this.render();
	}
	
	FormulaView.prototype.render = function(){
		this._node = $("<div class='formula'></div>");
		this._content = $("<div class='formula-content'></div>");
		this._draft = $("<div class='formula-draft'></div>");
		
		this._node.append(this._content);
		this._node.append(this._draft);
		
		// this.add("sequence", "1.");
		// this.add("integer", 10);
		// this.add("operator", "+");
		// this.add("parenthesis", "(");
		// this.add("fraction", [11, 3]);
		// this.add("operator", "*");
		// this.add("integer", 2);
		// this.add("parenthesis", ")");
		// this.add("operator", "=");
		// for(let i=0; i< this.operands.length; i++){
			// this.add(this.operands[i].type, this.operands[i].value);
			// this.add("operator", this.operators[i]);
		// }
		
		if(this.configuration.sequence){
			this.add("sequence", this.configuration.sequence);
		}
		for(let i=0; i< this.formulas.length; i++){
			let setting = {};
			if(this.formulas[i].type === "fraction"){
				setting.improper = this.configuration.operands.improper;
			}
			if(i === this.formulas.length - 1){
				setting.show = this._showResult;
				setting.className = "result";
			}
			this.add(this.formulas[i].type, this.formulas[i].value, setting);
		}
	}
	
	FormulaView.prototype.add = function(type, value, setting){
		this._children = this._children || [];
		
		let textView = new TextView(type, value, setting);
		this._children.push(textView);
		this._content.append(textView.$());
	}
	
	FormulaView.prototype.$ = function(){
		return this._node;
	}
	
	// FormulaView.prototype.validateConfiguration = function(source, target){
		// for(let i in source){
			// if(!(i in target)){
				// target[i] = source[i];
			// }else if(typeof target[i] === "object"){
				// this.validateConfiguration(source[i], target[i]);
			// }
		// }
	// }
	
	FormulaView.prototype.generate = function(){
		let amountOfOperands = Util.random.integer(this.configuration.operands.minAmount, this.configuration.operands.maxAmount);
		let operandTypes = this.configuration.operands.types;
		let minValue = this.configuration.operands.minValue;
		let maxValue = this.configuration.operands.maxValue;
		let operators = this.configuration.operators;
		do{
			this.operands = [];
			this.operators = [];
			this.parentheses = [];
			for(let i=0;i<amountOfOperands;i++){
				let operandType = operandTypes[Util.random.integer(operandTypes.length - 1)];
				let operand = Util.random[operandType](minValue, maxValue);
				if(operandType === 'fraction' && operand[0] % operand[1] === 0){
					operandType = "integer";
					operand = operand[0] / operand[1];
				}
				this.operands.push({type: operandType, value: operand});
				
				this.operators.push(operators[Util.random.integer(operators.length - 1)]);
			}
			this.operators.pop();
			this.operators.push("=");
			
			this.generateParentheses(amountOfOperands);
			
			this.formulas = this.generateFormulas();
		}while(!this.calculateFormulas(this.formulas));
		this.formulas.push(this.result);
	}
	
	FormulaView.prototype.generateFormulas = function(){
		let formulas = [];
		let lefts = [];
		let rights = [];
		for(let i=0; i < this.parentheses.length; i++){
			if(lefts[this.parentheses[i][0]] === undefined){
				lefts[this.parentheses[i][0]] = 1;
			}else{
				lefts[this.parentheses[i][0]] += 1;
			}
			
			if(rights[this.parentheses[i][1]] === undefined){
				rights[this.parentheses[i][1]] = 1;
			}else{
				rights[this.parentheses[i][1]] += 1;
			}
		}
		for(let i=0; i< this.operands.length; i++){
			if(lefts[i] !== undefined){
				for(let j=0; j < lefts[i]; j++){
					formulas.push({type: "parenthesis", value: "("});
				}
			}
			
			formulas.push(this.operands[i]);
			
			if(rights[i] !== undefined){
				for(let j=0; j < rights[i]; j++){
					formulas.push({type: "parenthesis", value: ")"});
				}
			}
			formulas.push({type: "operator", value: this.operators[i]});
		}
		return formulas;
	}
	
	FormulaView.prototype.generateParentheses = function(amountOfOperands){
		this.parentheses = this.parentheses ||[];
		let amount = Util.random.integer(amountOfOperands - 2);
		for(let i=0;i<amount;i++){
			this.generateParenthesis(this.parentheses, amountOfOperands);
		}
		
		this.validateParentheses();
	}
	
	FormulaView.prototype.validateParentheses = function(){
		// let formulas = this.generateFormulas();
	}
	
	FormulaView.prototype.calculateFormulas = function(formulas){
		let operatorStack = ['='];
		let operandStack = [];
		let result = null;
		
		for(let i=0; i<formulas.length; i++){
			let lastOperator = operatorStack[operatorStack.length - 1]
			if(formulas[i].value === '=' && lastOperator === '='){
				break;
			}
			
			if(['integer', 'fraction'].includes(formulas[i].type)){
				operandStack.push(formulas[i]);
			}else{
				switch(Util.compareOperator(lastOperator, formulas[i].value)){
					case '<':
						operatorStack.push(formulas[i].value);
						break;
					case '=':
					operatorStack.pop();
						break;
					case '>':
						let operator = operatorStack.pop();
						let b = operandStack.pop();
						let a = operandStack.pop();
						if(operator === '÷' && b.value === 0){
							return false;
						}
						result = this.calculateFormula(a, operator, b);
						// if(!this.isValid(result)){
							// return false;
						// }
						operandStack.push(result);
						i--;
						break;
				}
			}
		}
		this.result = operandStack.pop();
		return this.isValid(this.result);
	}
	
	FormulaView.prototype.calculateFormula = function(operand1, operator, operand2){
		let value1 = operand1.type === "integer" ? [operand1.value, 1] : operand1.value;
		let value2 = operand2.type === "integer" ? [operand2.value, 1] : operand2.value;
		
		let result1 = 0;
		let result2 = Util.lcm(value1[1], value2[1]);
		if(operator === '+'){
			result1 = result2 / value1[1] * value1[0] + result2 / value2[1] * value2[0];
		}else if(operator === '-'){
			result1 = result2 / value1[1] * value1[0] - result2 / value2[1] * value2[0];
		}else if(operator === '×'){
			result2 = value1[1]* value2[1];
			result1 = value1[0]* value2[0];
		}else if(operator === '÷'){
			result2 = value1[1] * value2[0];
			result1 = value1[0] * value2[1];
		}
		
		let divisor = Util.gcd(result1, result2);
		result1 /= divisor;
		result2 /= divisor;
		if(result1 % result2 === 0){
			return {type: "integer", value: result1/result2};
		}else{
			return {type: "fraction", value: [result1, result2]};
		}
	}
	
	FormulaView.prototype.isValid = function(result){
		let minValue = this.configuration.operands.minValue;
		let maxValue = this.configuration.operands.maxValue;
		if(result === "integer"){
			return result.value >= minValue && result.value <= maxValue;
		}else{
			return result.value[0] >= minValue && result.value[0] <= maxValue && result.value[1] >= minValue && result.value[1] <= maxValue;
		}
	}
	
	FormulaView.prototype.generateParenthesis = function(parentheses, amountOfOperands){
		let left = -1;
		let right = -1;
		do{
			left = Util.random.integer(amountOfOperands - 2);
			right = Util.random.integer(left + 1, amountOfOperands - 1);
		}while(!this.insertParenthesis(parentheses, [left, right]));
	}
	
	FormulaView.prototype.insertParenthesis = function(parentheses, parenthesis){
		let index = 0;
		let matched = -1;
		for(;index < parentheses.length; index++){
			let a = parentheses[index][0];
			let b = parentheses[index][1];
			let c = parenthesis[0];
			let d = parenthesis[1];
			if(a === d || b === c || (a === c && b === d)){
				return false;
			}
			
			if(a <= c && d <= b){
				continue;
			}
			
			if(c <=a && b <= d){
				if(matched === -1){
					matched = index;
				}
				continue;
			}
			
			if(c <= a && a < d && d <= b){
				return false;
			}
			
			if(a <= c && c < b && b <= d){
				return false;
			}
			
			if(b < c){
				continue;
			}
			
			if(d < a){
				break;
			}
		}
		parentheses.splice(matched === -1 ? index : matched, 0, parenthesis);
		return true;
	}
	
	return FormulaView;
});