// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Globals.windowStack.push($.fourtyThirdScreen);

var radioButton	= require('/RadioOptions');
var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.fourtyThirdScreen.close();	
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
	radioItemsValue:[L("yes"),L("no")],
	radioItemsSaveValue:["yes", "no"],
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
	Alloy.Globals.dataToCapture.able_to_install_dongle = radioGroup2.selectedSaveValue;
	if(radioGroup2.selectedValue == 1){
		Alloy.createController("FourtySixthScreen").getView().open();
	}else{
		Alloy.createController("FourtyFourthScreen",{isfirstDongle : true}).getView().open();
	}
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
