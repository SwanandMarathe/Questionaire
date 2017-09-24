// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var radioButton	= require('/RadioOptions');
var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.thirtySixthScreen.close();	
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
	radioItemsValue:[L("subs_cost150"),L("subs_cost300"),L("subs_cost600"),L("subs_cost750"),L("subs_cost900"),L("subs_cost900p"),L("subs_cost_dnk")],
	radioItemsSaveValue:["subs_cost150", "subs_cost300", "subs_cost600", "subs_cost750", "subs_cost900", "subs_cost900p", "subs_cost_dnk"],
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
	Alloy.Globals.dataToCapture.tatasky_subscription_fee = radioGroup2.selectedSaveValue;
	Alloy.createController("ThirtySeventhScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
