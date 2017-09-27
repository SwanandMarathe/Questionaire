// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Globals.windowStack.push($.fourtyFifthScreen);

var isfirstDongle = args.isfirstDongle;

var radioButton	= require('/RadioOptions');
var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.fourtyFifthScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
buttonNext.visible = false;
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});

var radioGroup2 = radioButton.createGroup({
	groupId:1,
	width:150,
	height:150,
	layout:'vertical',
	radioItemsValue:[L("response_on_sms_success"),L("response_on_sms_sry"),L("response_on_sms_not_going"),L("response_on_sms_not_server"),L("response_on_sms_digicom_invalid"),L("response_on_sms_stbusb"),L("response_on_sms_ignore")],
	radioItemsSaveValue:["response_on_sms_success", "response_on_sms_sry", "response_on_sms_not_going", "response_on_sms_not_server", "response_on_sms_digicom_invalid", "response_on_sms_stbusb", "response_on_sms_ignore"],
	radioItemsPadding:20,
	radioItemsBackgroundSelectedImage:'/radioImages/radio_button_on.png',
	radioItemsBackgroundImage:'/radioImages/radio_button_off.png',
	radioItemsWidth:33,
	radioItemsHeight:34,
	callback : openNextScreen
});
radioGroup2.left = 20;
$.baseView.add(radioGroup2);

function openNextScreen(e){
	if(radioGroup2.selectedValue == null){
		return;
	}
	Ti.API.info(radioGroup2.selectedIndex + " Vertical radioGroup selectedIdx: " + radioGroup2.selectedValue);
	
	if(isfirstDongle){
		Alloy.Globals.dataToCapture.response_from_sms = radioGroup2.selectedSaveValue;
		Alloy.createController("FiftyThirdScreen").getView().open();
	}else{
		Alloy.Globals.dataToCapture.response_from2_sms = radioGroup2.selectedSaveValue;
		Alloy.createController("FourtySixthScreen").getView().open();
	}
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
