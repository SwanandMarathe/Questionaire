// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Globals.windowStack.push($.twentyNinethScreen);

var radioButton	= require('/RadioOptions');
var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.twentyNinethScreen.close();	
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
	radioItemsValue:[L("tv_consump_weekday_off"),L("tv_consump_weekday_half"),L("tv_consump_weekday_one"),L("tv_consump_weekday_two"),L("tv_consump_weekday_five"),L("tv_consump_weekday_nine"),L("tv_consump_weekday_eleven"),L("tv_consump_weekday_elevenplus")],
	radioItemsSaveValue:["tv_consump_weekday_off", "tv_consump_weekday_half", "tv_consump_weekday_one", "tv_consump_weekday_two", "tv_consump_weekday_five", "tv_consump_weekday_nine", "tv_consump_weekday_eleven", "tv_consump_weekday_elevenplus"],
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
	Alloy.Globals.dataToCapture.weekday_tv_consumption = radioGroup2.selectedSaveValue;
	Alloy.createController("ThirtythScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
