define(function(){
	let random = {};
	random.integer = function(min, max){
		if(max === undefined){
			max = min;
			min = 0;
		}
		if(min === max){
			return min;
		}
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	random.fraction = function(min, max){
		let numerator = this.integer(min, max);
		let denominator = min === 0 ? this.integer(min + 1, max) : this.integer(min, max);
		let divisior = gcd(numerator, denominator);
		return [numerator/divisior, denominator/divisior];
	};
	
	// Greatest Common Divisor
	function gcd(value1, value2){
		let temp = value1;
		for(;;){
			if(value2 === 0){
				return value1;
			}
			temp = value2;
			value2 = value1 % value2;
			value1 = temp;
		}
		// return value2 === 0 ? value1 :gcd(value2, value1 % value2);
	}
	
	// Lowest Common Multiple
	function lcm(value1, value2){
		return value1 * value2 / gcd(value1, value2);
	}
	
	let priorities = {
		MIN: 0,
		'=': 0,
		'+': 1,
		'-': 1,
		'×': 2, 
		'÷': 2,
		'(': 3,
		')': 3,
		MAX: 3
	};
	
	function compareOperator(operator1, operator2){
		if(['+', '-'].includes(operator1)){
			return ['+', '-', ')', '='].includes(operator2) ? '>' : '<';
		}else if(['×', '÷'].includes(operator1)){
			return '(' === operator2 ? '<' : '>';
		}else if('(' === operator1){
			return ')' === operator2 ? '=' : '<';
		}else if(')' === operator1){
			return '>';
		}else if('=' === operator1){
			return '=' === operator2 ? '=' : '<';
		}
	}
	
	return {
		random: random,
		gcd: gcd,
		lcm: lcm,
		priorities: priorities,
		compareOperator: compareOperator
	};
});