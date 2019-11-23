var title = "口算练习-1-4";
var informations = ["姓名", "日期", "用时"];
var _operators = ['+', '-', '×'];
var number = 0;
var display = false;
$(function(){
	render();
});

function render(){
	document.title = title;
	
	renderPage();
	$().toastmessage("showToast", {
		text : "Tips: Press Enter to show/hide results.<br/> Press ↑ and ↓ to add/remove a page. <br/> Press space key to get the status of the page.", 
		type : 'notice',
		stayTime: 5000
	});
	
	$(document.body).keyup(function(event){
		if(event.key === "ArrowUp"){
			renderPage();
			$().toastmessage('showSuccessToast', "Add a page successfully. There are " + number + " page(s) now.");
		}else if(event.key === "ArrowDown"){
			if(number > 1){
				removePage();
				$().toastmessage('showSuccessToast', "Remove a page successfully. There are " + number + " page(s) now.");
			}else{
				$().toastmessage('showErrorToast', "Can't remove page. There is only 1 page now!");
			}
		} else if(event.key === "Enter"){
			$(".result").toggle();
			display = !display;
			$().toastmessage('showSuccessToast', (display ? "Shown": "Hide") + " results");
		} else if(event.key === " "){
			$().toastmessage('showSuccessToast', "There are " + number + " page(s). Results are " + (display ? "shown": "hidden"));
		}
		return false;
	});
}

function renderPage(){
	number++;
	var $body = $(document.body);
	var $page = $("<div />",{
		id: "page" + number
	});
	$body.append($page);
	var $title = $("<h1 />", {
		text: title,
		"class": "title"
	});
	$page.append($title);
	
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
	$page.append($informations);
	
	var $equalities = $("<ol />", {
		"class": "content"
	});
	
	for(var i=0; i<60; i++){
		var $row = $("<li />", {
			"class": "inline"
		});
		$row.append(get$equality(getEquality()));
		$equalities.append($row);
	}
	$page.append($equalities);
	
	$pageBreak = $("<div />", {
		"class": "page-break"
	});
	$page.append($pageBreak);
	if(!display){
		$(".result").hide();
	}
}

function removePage(){
	if(number === 1){
		return;
	}
	$("#page" + number).remove();
	number--;
}

function getEquality(){
	var value1 = Math.ceil(Math.random() * 9);
	var value2 = Math.ceil(Math.random() * 9);
	var operator1 = _operators[Math.floor(Math.random() * 3)];
	var operator2 = operator1 === '×' ? _operators[Math.floor(Math.random() * 2)] : '×';
	var equality = {
		operators: [operator1, operator2, '=']
	};
	if(operator2 === '-'){
		var value3 = Math.ceil(Math.random() * (value1 * value2 - 1));
		equality.operands = [value1, value2, value3, value1 * value2 - value3];
	}else{
		var value3 = Math.ceil(Math.random() * (99 - (value1 * value2))) + value1 * value2;
		if(operator2 === '+'){
			equality.operands = [value1, value2, value3 - value1 * value2, value3];
		}else if(operator1 === '+'){
			equality.operands = [value3 - value1 * value2, value1, value2, value3];
		}else{
			equality.operands = [value3, value1, value2, value3 - value1 * value2];
		}
	}
	return equality;
}

function get$equality(equality){
	var $equality = $("<div />", {
			"class": "inline equality"
	});
	
	for(var i=0;i<equality.operators.length;i++){
		var $operand = $("<div />", {
			"class": "inline item operand",
			text: equality.operands[i]
		});
		var $operator = $("<div />", {
			"class": "inline item operator",
			text: equality.operators[i]
		});
		$equality.append($operand).append($operator);
	}
	var $result = $("<div />", {
		"class": "inline item result",
		text: equality.operands[equality.operands.length - 1]
	});
	$equality.append($result)
	return $equality;
}