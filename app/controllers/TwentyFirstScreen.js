// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.twentyFirstScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});

var options = ['Desktop/Laptop', 'Mobile', 'Tablet', 'Smart TV', 'Others'];

for(var i=0;i<options.length;i++){
	var view = Ti.UI.createView({
		top : 20,
		height : Ti.UI.SIZE,
		width : 300
	});
	
	view.add(Ti.UI.createLabel({
		left : 0,
		color : '#000',
		text : options[i]
	})); 
	
	view.add(Ti.UI.createTextField({
		left : 150,
		hintTextColor : '#7a7a7a',
		width : 50,
		borderColor : 'gray',
		borderWidth : 1,
		color : '#000000',
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		maxLength : 2,
	}));
	$.baseView.add(view);
}

function openNextScreen(e){
	
	var hourSpend = "";
	// var goAhade = false;
	for (var i=1; i < $.baseView.children.length; i++) {
		if($.baseView.children[i].children[1].value == null || $.baseView.children[i].children[1].value == "" || 
			$.baseView.children[i].children[1].value.trim() == "" || $.baseView.children[i].children[1].value > 23)
			return;
	};
	// goAhade = true;
	for (var i=1; i < $.baseView.children.length; i++) {
		hourSpend = hourSpend+','+$.baseView.children[i].children[0].text+':'+$.baseView.children[i].children[1].value;
	};
	
	Alloy.Globals.dataToCapture.hour_spent = hourSpend;//radioGroup2.selectedSaveValue;
	var childrenLength = $.baseView.children.length;
	if($.baseView.children[childrenLength-1].children[1].value > 0){
		Alloy.createController("TwentySeventhScreen").getView().open();
	}else{
		Alloy.createController("TwentyEighthScreen").getView().open();
	}
	
	// Alloy.createController("TwentySecondScreen").getView().open();
	
}
