// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var isfirstDongle = args.isfirstDongle;

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
	
	if(musicSysValue.length < 12 || musicSysValue < 600000000000 || musicSysValue > 999999999999){
		alert('Please Enter a proper value');
		return;
	}
	
	if(isfirstDongle){
		Alloy.Globals.dataToCapture.dongle_mobile_no = $.txtColorTv.value;
		Alloy.Globals.dataToCapture.digicomp_no = $.txtMusicSys.value;
		Alloy.Globals.dataToCapture.card_id_no = $.txtCelingFan.value;
	}else{
		Alloy.Globals.dataToCapture.dongle_mobile2_no = $.txtColorTv.value;
		Alloy.Globals.dataToCapture.digicomp2_no = $.txtMusicSys.value;
		Alloy.Globals.dataToCapture.card_id2_no = $.txtCelingFan.value;
	}
	Alloy.createController("FourtyFifthScreen",{isfirstDongle : isfirstDongle}).getView().open();
	
	
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
