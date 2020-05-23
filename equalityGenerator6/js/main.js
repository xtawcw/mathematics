// Division execise

var title = "口算练习-1-5";
var informations = ["姓名", "日期", "用时"];
var _operators = ['+', '-', '×', '÷'];
var number = 0;
var display = false;
var mode = "1";
$(function(){
	render();
});

function render(){
	document.title = title;
	
	//renderPage();
	$().toastmessage("showToast", {
		text : "Tips: Press Enter to show/hide results.<br/> Press ↑ and ↓ to add/remove a page. <br/> Press space key to get the status of the page.", 
		type : 'notice',
		stayTime: 5000
	});
	showMode();
	
	$(document.body).keyup(function(event){
		if(event.key === "ArrowUp"){
			renderPage();
			$().toastmessage('showSuccessToast', "Add a page successfully. There are " + number + " page(s) now.");
		}else if(event.key === "ArrowDown"){
			if(number > 0){
				removePage();
				$().toastmessage('showSuccessToast', "Remove a page successfully. There are " + number + " page(s) now.");
			}else{
				$().toastmessage('showErrorToast', "Can't remove page. There is only " + number + " page now!");
			}
		} else if(event.key === "Enter"){
			$(".result").toggle();
			display = !display;
			$().toastmessage('showSuccessToast', (display ? "Shown": "Hide") + " results");
		} else if(event.key === " "){
			$().toastmessage('showSuccessToast', "There are " + number + " page(s). Results are " + (display ? "shown": "hidden"));
		} else if(event.key === "1" || event.key === "2" || event.key === "3"){
			mode = event.key;
			showMode();
		} 
		return false;
	});
}

function showMode(){
	var message = "";
	if(mode === "1"){
		message = "乘法模式";
	}else if(mode === "2"){
		message = "除法模式";
	}else if(mode === "3"){
		message = "乘除混合模式";
	}
	$().toastmessage('showSuccessToast', message);
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
	if(number === 0){
		return;
	}
	$("#page" + number).remove();
	number--;
}

function getEquality(){
	var value1 = Math.ceil(Math.sqrt(Math.random()*81));
	var value2 = Math.ceil(Math.sqrt(Math.random()*81));
	var equality = {};
	if(mode === "1"){
		equality.operators = ['×', '='];
		equality.operands = [value1, value2, value1 * value2];
	}else if(mode === "2"){
		equality.operators = ['÷', '='];
		equality.operands = [value1 * value2, value1, value2];
	}else if(mode === "3"){
		var flag = Math.random() > 0.5;
		if(flag){
			equality.operators = ['×', '='];
			equality.operands = [value1, value2, value1 * value2];
		}else{
			equality.operators = ['÷', '='];
			equality.operands = [value1 * value2, value1, value2];
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