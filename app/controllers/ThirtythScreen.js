// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var radioButton	= require('/RadioOptions');
var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.thirtythScreen.close();	
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
	radioItemsValue:[L("tv_consump_weekend_off"),L("tv_consump_weekend_half"),L("tv_consump_weekend_one"),L("tv_consump_weekend_two"),L("tv_consump_weekend_five"),L("tv_consump_weekend_nine"),L("tv_consump_weekend_eleven"),L("tv_consump_weekend_elevenplus")],
	radioItemsSaveValue:["tv_consump_weekend_off", "tv_consump_weekend_half", "tv_consump_weekend_one", "tv_consump_weekend_two", "tv_consump_weekend_five", "tv_consump_weekend_nine", "tv_consump_weekend_eleven", "tv_consump_weekend_elevenplus"],
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
	Alloy.Globals.dataToCapture.sunday_tv_consumption = radioGroup2.selectedSaveValue;
	Alloy.createController("ThirtyFirstScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
