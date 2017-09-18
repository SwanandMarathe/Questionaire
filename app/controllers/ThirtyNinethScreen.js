// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.thirtyNinethScreen.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_STATE_VISIBLE;
setTimeout(function(){$.txtColorTv.focus();},100);

var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.thirtyNinethScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
// buttonNext.visible = false;
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
	
	Alloy.Globals.dataToCapture.color_tv_name = $.txtColorTv.value;
	Alloy.Globals.dataToCapture.music_sys_name = $.txtMusicSys.value;
	Alloy.Globals.dataToCapture.ceilinf_fan_name = $.txtCelingFan.value;
	Alloy.Globals.dataToCapture.smart_phone_name = $.txtSmartPhone.value;
	Alloy.Globals.dataToCapture.aircond_name = $.txtAircocnd.value;
	Alloy.Globals.dataToCapture.fridge_name = $.txtFridge.value;
	
	Alloy.createController("FourtythScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
