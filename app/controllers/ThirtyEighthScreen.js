// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Globals.windowStack.push($.thirtyEighthScreen);

var radioButton	= require('/RadioOptions');
var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.thirtyEighthScreen.close();	
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
	height:Ti.UI.SIZE,
	layout:'vertical',
	radioItemsValue:[L("avg_income10"),L("avg_income30"),L("avg_income50"),L("avg_income70"),L("avg_income1"),L("avg_income5"),L("avg_income5p"),L("avg_incomednk")],
	radioItemsSaveValue:["avg_income10", "avg_income30", "avg_income50", "avg_income70", "avg_income1", "avg_income5", "avg_income5p", "avg_incomednk"],
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
	Alloy.Globals.dataToCapture.household_income = radioGroup2.selectedSaveValue;
	Alloy.createController("ThirtyNinethScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
