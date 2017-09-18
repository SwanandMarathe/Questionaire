// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.twentyEighthScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});

function openNextScreen(e){
	Alloy.createController("TwentyNinethScreen").getView().open();
	
}
