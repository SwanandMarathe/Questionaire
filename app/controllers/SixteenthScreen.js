// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.sixteenthScreen.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_STATE_VISIBLE;
setTimeout(function(){$.txtSubId.focus();},100);

Alloy.Globals.windowStack.push($.sixteenthScreen);

var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.sixteenthScreen.close();	
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
	
	Alloy.Globals.dataToCapture.no_of_familymember = $.txtSubId.value;
	Alloy.createController("FiftyFirstScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
