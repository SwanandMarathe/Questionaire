// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.fourtyFirstScreen.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_STATE_VISIBLE;
setTimeout(function(){$.txtColorTv.focus();},100);

var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.fourtyFirstScreen.close();	
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
	
	Alloy.Globals.dataToCapture.vaccum_cleaner_name = $.txtColorTv.value;
	Alloy.Globals.dataToCapture.electric_water_purifier_name = $.txtMusicSys.value;
	Alloy.Globals.dataToCapture.non_electric_water_purifier_name = $.txtCelingFan.value;
	Alloy.Globals.dataToCapture.mixer_name = $.txtSmartPhone.value;
	Alloy.Globals.dataToCapture.inverter_name = $.txtAircocnd.value;
	Alloy.Globals.dataToCapture.power_generator_name = $.txtFridge.value;
	
	Alloy.createController("FourtySecondScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
