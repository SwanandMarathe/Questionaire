// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.thirtyFirstScreen.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_STATE_VISIBLE;
setTimeout(function(){$.txtSubId.focus();},100);

Alloy.Globals.windowStack.push($.thirtyFirstScreen);

var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.thirtyFirstScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});

function openNextScreen(e){
	var subIdValue = $.txtSubId.value;
	if(subIdValue == null || subIdValue.trim() == ""){
		alert('Please Enter a proper values.');
		return;
	}
	
	Alloy.Globals.dataToCapture.newspaper_name = $.txtSubId.value;
	Alloy.createController("ThirtySecondScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
