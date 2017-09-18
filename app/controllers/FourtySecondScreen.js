// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.fourtySecondScreen.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_STATE_VISIBLE;
setTimeout(function(){$.txtColorTv.focus();},100);

var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.fourtySecondScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});

function openNextScreen(e){
	var colorTvValue = $.txtColorTv.value;
	var musicSysValue = $.txtMusicSys.value;
	var ceilingFanValue = $.txtCelingFan.value;
	var smartPhoneValue = $.txtSmartPhone.value;
	var aircondValue = $.txtAircocnd.value;
	var fridgeValue = $.txtFridge.value;

	// if(colorTvValue == null || colorTvValue.trim() == "" || musicSysValue == null || musicSysValue.trim() == "" ||
		// ceilingFanValue == null || ceilingFanValue.trim() == "" || smartPhoneValue == null || smartPhoneValue.trim() == "" ||
		// aircondValue == null || aircondValue.trim() == "" || fridgeValue == null || fridgeValue.trim() == ""){
		// return;
	// }
	
	Alloy.Globals.dataToCapture.air_cooler_name = $.txtColorTv.value;
	Alloy.Globals.dataToCapture.dslr_name = $.txtMusicSys.value;
	Alloy.Globals.dataToCapture.basic_mobile_name = $.txtCelingFan.value;
	Alloy.Globals.dataToCapture.induction_stove_name = $.txtSmartPhone.value;
	Alloy.Globals.dataToCapture.dish_washer_name = $.txtAircocnd.value;
	Alloy.Globals.dataToCapture.gps_system_name = $.txtFridge.value;
	
	Alloy.createController("FourtyThirdScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
