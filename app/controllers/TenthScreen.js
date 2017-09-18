// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.tenthScreen.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_STATE_VISIBLE;
setTimeout(function(){$.txtSubId.focus();},100);

var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.tenthScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
// buttonNext.visible = false;
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});

function openNextScreen(e){
	var subIdValue = $.txtSubId.value;
	if(subIdValue == null || subIdValue.trim() == ""){
		alert('Please Enter a proper values.');
		return;
	}
	
	Alloy.Globals.dataToCapture.respondent_businesss_type = $.txtSubId.value;
	Alloy.createController("EleventhScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
