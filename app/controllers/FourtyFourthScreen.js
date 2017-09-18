// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.fourtyFourthScreen.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_STATE_VISIBLE;
setTimeout(function(){$.txtColorTv.focus();},100);

var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.fourtyFourthScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});

function openNextScreen(e){
	var colorTvValue = $.txtColorTv.value;
	var musicSysValue = $.txtMusicSys.value;
	var ceilingFanValue = $.txtCelingFan.value;

	if(colorTvValue == null || colorTvValue.trim() == "" || musicSysValue == null || musicSysValue.trim() == "" ||
		ceilingFanValue == null || ceilingFanValue.trim() == "" ){
		return;
	}
	
	if(colorTvValue.length < 10){
		alert('Please Enter a proper mobile no.');
		return;
	}
	
	Alloy.Globals.dataToCapture.dongle_mobile_no = $.txtColorTv.value;
	Alloy.Globals.dataToCapture.digicomp_no = $.txtMusicSys.value;
	Alloy.Globals.dataToCapture.card_id_no = $.txtCelingFan.value;
	
	
	Alloy.createController("FourtyFifthScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
