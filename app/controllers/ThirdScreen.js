// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.thirdScreen.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_STATE_VISIBLE;
setTimeout(function(){$.txtSubId.focus();},100);

Alloy.Globals.windowStack.push($.thirdScreen);

var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.thirdScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});

$.txtSubId.addEventListener('change', function(e){
	if($.txtSubId.value.length >= 10){
		Ti.UI.Android.hideSoftKeyboard();
	}
});

function openNextScreen(e){
	var subIdValue = $.txtSubId.value;
	if(subIdValue == null || subIdValue.trim() == "" || subIdValue.length < 10 ||
		subIdValue < 1000000000 || subIdValue > 1999999999){
		alert('Please Enter a proper values.');
		return;
	}
	
	Alloy.Globals.dataToCapture.subscriber_id = $.txtSubId.value;
	Alloy.createController("FourthScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
