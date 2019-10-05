var title = "口算练习1级";
var informations = ["姓名", "日期", "用时"];
$(function(){
	var $body = $(document.body);
	
	var $title = $("<h1 />", {
		text: title,
		"class": "title"
	});
	$body.append($title);
	
	var $informations = $("<div />", {
		"class": "title"
	});
	for(var i=0; i<informations.length; i++){
		var $information = $("<div />", {
			"class": "information inline item"
		});
		var $label = $("<div />", {
			text: informations[i],
			"class": "label inline"
		});
		var $text = $("<div />", {
			"class": "text inline"
		});
		$text.html("&nbsp");
		$information.append($label).append($text);
		$informations.append($information);
	}
	$body.append($informations);
	
	var $equalities = $("<div />", {
		"class": "content"
	});
	
	for(var i=0; i<45; i++){
		var equality = getEquality();
		var $equality = $("<div />", {
			"class": "inline equality"
		});
		var $operand1 = $("<div />", {
			text: equality.operand1,
			"class": "inline item"
		});
		var $operator1 = $("<div />", {
			text: equality.operator1,
			"class": "inline item"
		});
		var $operand2 = $("<div />", {
			text: equality.operand2,
			"class": "inline item"
		});
		var $operator2 = $("<div />", {
			text: equality.operator2,
			"class": "inline item"
		});
		$equality.append($operand1).append($operator1).append($operand2).append($operator2);
		$equalities.append($equality);
	}
	$body.append($equalities);
});

function getEquality(){
	var value1 = Math.floor(Math.random() * 10);
	var value2 = Math.floor(Math.random() * 10);
	var operator1 = Math.floor(Math.random() * 2) === 0 ? '+' : '-';
	return operator1 === '+' ?{
		operand1: value1,
		operator1: operator1,
		operand2: value2,
		operator2: '='
	}:{
		operand1: value1 + value2,
		operator1: operator1,
		operand2: value1,
		operator2: '='
	};
}