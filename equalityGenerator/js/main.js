require.config({
	//enforceDefine: true,
	paths: {
		jquery: ["lib/jquery-3.4.0"]
	}
});

require(["jquery", "MainView", "SettingView", "formula/FormulaView"], function (jquery, MainView, SettingView, FormulaView) {
	// TODO Add setting
	let settingView = new SettingView();
	settingView.$().appendTo(document.body);
	let mainView = new MainView();
	mainView.$().appendTo($(document.body));
	
	// let configuration = {
		// operands: {
			// minAmount: 2,
			// maxAmount: 2,
			// minValue: 0,
			// maxValue: 100,
			// types: ["integer", "fraction"],
			// improper: true
		// },
		// operators: ['+', '-', '×', '÷']
	// };
	settingView.listenRefresh(function(configuration){
		mainView.$().empty();
		for(let i=0; i<configuration.formulaAmount; i++){
			configuration.sequence = i + 1 + ".";
			let formulaView = new FormulaView(configuration);
			mainView.add(formulaView);
		}
	});
	
});
