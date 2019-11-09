var title = "口算练习1-3";
var informations = ["姓名", "日期", "用时"];
$(function(){
	for(var i=0;i<1;i++){
		render();
	}
});

function render(){
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
	
	var $equalities = $("<ol />", {
		"class": "content"
	});
	
	for(var i=0; i<20; i++){
		var equality1 = getEquality();
		
		var $row = $("<li />", {
			
		});
		var $addition = $("<div />", {
			"class": "inline addition equality",
			text: getText(equality1)
		});
		var equality2 = getEquality();
		var $multiplication = $("<div />", {
			"class": "inline multiplication equality",
			text: equality2.operand1 + " × " + equality2.operand2 + " ="
		});
		$row.append($addition).append($multiplication);
		$equalities.append($row);
	}
	$body.append($equalities);
}

function getEquality(){
	var value1 = Math.floor(Math.random() * 9) + 1;
	var value2 = Math.floor(Math.random() * 8) + 2;
	return {
		operand1: value1,
		operand2: value2
	};
}

function getText(equality){
	var text = equality.operand1 + "";
	for(var i=1; i<equality.operand2; i++){
		text += " + " + equality.operand1;
	}
	text += " =";
	return text;
}