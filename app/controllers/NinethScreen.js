// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Globals.windowStack.push($.ninethScreen);

var radioButton	= require('/RadioOptions');
var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.ninethScreen.close();	
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
	radioItemsValue:[L("respondent_service"),L("respondent_business")],
	radioItemsSaveValue:["respondent_service", "respondent_business"],
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
	Alloy.Globals.dataToCapture.respondent_work = radioGroup2.selectedSaveValue;
	if(radioGroup2.selectedValue == 1){
		Alloy.createController("TenthScreen").getView().open();
	}else{
		Alloy.createController("TwelvethScreen").getView().open();
	}
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
