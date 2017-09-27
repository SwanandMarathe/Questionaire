// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.fourtythScreen.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_STATE_VISIBLE;
setTimeout(function(){$.txtColorTv.focus();},100);

Alloy.Globals.windowStack.push($.fourtythScreen);

var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.fourtythScreen.close();	
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
	
	Alloy.Globals.dataToCapture.washing_machine_name = $.txtColorTv.value;
	Alloy.Globals.dataToCapture.laptop_name = $.txtMusicSys.value;
	Alloy.Globals.dataToCapture.two_wheeler_name = $.txtCelingFan.value;
	Alloy.Globals.dataToCapture.car_name = $.txtSmartPhone.value;
	Alloy.Globals.dataToCapture.lpg_stove_name = $.txtAircocnd.value;
	Alloy.Globals.dataToCapture.microwave_name = $.txtFridge.value;
	
	Alloy.createController("FourtyFirstScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
