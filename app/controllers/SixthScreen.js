// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
// $.sixthScreen.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_STATE_VISIBLE;
setTimeout(function(){$.txtSubId.focus();},100);

Alloy.Globals.windowStack.push($.sixthScreen);

var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.sixthScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});


var datePicker = Ti.UI.createPicker({
	type : Ti.UI.PICKER_TYPE_DATE,
	top : 20,
	visibleItems : 6,
	backgroundColor : "#000000",
	minDate : new Date() 
});
$.baseView.add(datePicker);

datePicker.addEventListener('change', function(e){
	var d = new Date(e.value);
	var date = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
	$.txtSubId.value = date;
});

function openNextScreen(e){
	var subIdValue = $.txtSubId.value;
	if(subIdValue == null || subIdValue == ""){
		alert('Please select a date.');
		return;
	}
	
	Alloy.Globals.dataToCapture.appoint_datetime = $.txtSubId.value;
	Alloy.createController("FourtySixthScreen").getView().open();
	// Alloy.createController("SeventhScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
