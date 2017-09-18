// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.thirtySecondScreen.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_STATE_VISIBLE;
setTimeout(function(){$.txtSubId.focus();},100);

var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.thirtySecondScreen.close();	
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
	
	Alloy.Globals.dataToCapture.magzine_name = $.txtSubId.value;
	Alloy.createController("ThirtyThirdScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}