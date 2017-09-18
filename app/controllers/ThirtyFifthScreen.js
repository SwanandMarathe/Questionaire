// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var radioButton	= require('/RadioOptions');
var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.thirtyFifthScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
buttonNext.visible = false;
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});

var radioGroup2 = radioButton.createGroup({
	groupId:1,
	width:150,
	setnull : true,
	height:150,
	layout:'vertical',
	radioItemsValue:[L("tatasky_bumper"),L("tatasky_dham_kid"),L("tatasky_dham_mix"),L("tatasky_dhoom"),L("tatasky_99"),L("tatasky_souspl"),L("tatasky_sospspl"),L("tatasky_ultra"),L("tatasky_other")],
	radioItemsSaveValue:[L("tatasky_bumper"),L("tatasky_dham_kid"),L("tatasky_dham_mix"),L("tatasky_dhoom"),L("tatasky_99"),L("tatasky_souspl"),L("tatasky_sospspl"),L("tatasky_ultra"),L("tatasky_other")],
	radioItemsPadding:10,
	radioItemsBackgroundSelectedImage:'/radioImages/radio_button_on.png',
	radioItemsBackgroundImage:'/radioImages/radio_button_off.png',
	radioItemsWidth:26,
	radioItemsHeight:27,
	callback : openNextScreen
});
radioGroup2.left = 20;
$.baseView.add(radioGroup2);

function openNextScreen(e){
	if(radioGroup2.selectedValue == null){
		return;
	}
	Ti.API.info(radioGroup2.selectedIndex + " Vertical radioGroup selectedIdx: " + radioGroup2.selectedValue);
	Alloy.Globals.dataToCapture.tatasky_pack = radioGroup2.selectedSaveValue;
	Alloy.createController("ThirtySixthScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
