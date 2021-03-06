// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Globals.windowStack.push($.eleventhScreen);

var radioButton	= require('/RadioOptions');
var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.eleventhScreen.close();	
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
	radioItemsValue:[L("worker_none"),L("worker_one"),L("worker_ten"),L("worker_self"),L("worker_trader"),L("worker_shop_owner"),L("worker_skilled")],
	radioItemsSaveValue:["worker_none", "worker_one", "worker_ten", "worker_self", "worker_trader", "worker_shop_owner", "worker_skilled"],
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
	Alloy.Globals.dataToCapture.no_of_employee = radioGroup2.selectedSaveValue;
	Alloy.createController("FourtyEighthScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
