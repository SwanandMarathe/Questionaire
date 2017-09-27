// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.seventhScreen.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_STATE_VISIBLE;
setTimeout(function(){$.txtSubId.focus();},100);

Alloy.Globals.windowStack.push($.seventhScreen);

var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.seventhScreen.close();	
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
	
	// var contactValue = $.txtcontact.value;
	// if(contactValue == null || contactValue.trim() == "" || contactValue.length < 10){
		// alert('Please Enter a proper values.');
		// return;
	// }
// 	
	// var ageValue = $.txtage.value;
	// if(ageValue == null || ageValue.trim() == ""){
		// alert('Please Enter a proper values.');
		// return;
	// }
	
	Alloy.Globals.dataToCapture.respondent_name = $.txtSubId.value;
	// Alloy.Globals.dataToCapture.respondent_contact = $.txtcontact.value;
	// Alloy.Globals.dataToCapture.respondent_age = $.txtage.value;
	
	// if(ageValue <= 14 || ageValue > 98){
		// Alloy.createController("FourtySixthScreen").getView().open();
	// }else{
		Alloy.createController("FiftySecondScreen").getView().open();
	// }
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
