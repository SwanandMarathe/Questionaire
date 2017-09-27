// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.twentySeventhScreen.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_STATE_VISIBLE;
setTimeout(function(){$.txtSubId.focus();},100);

Alloy.Globals.windowStack.push($.twentySeventhScreen);

var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.twentySeventhScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});

function openNextScreen(e){
	var subIdValue = $.txtSubId.value;
	if(subIdValue == null || subIdValue.trim() == ""){
		alert('Please Enter a proper value.');
		return;
	}
	
	Alloy.Globals.dataToCapture.other_device_name = $.txtSubId.value;
	Alloy.createController("TwentyEighthScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
