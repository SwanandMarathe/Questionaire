// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var radioButton	= require('/RadioOptions');
var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.fifthScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});

var radioGroup2 = radioButton.createGroup({
	groupId:1,
	width:150,
	height:150,
	layout:'vertical',
	radioItemsValue:[L("respondent_yes"),L("respondent_no"),L("digicom_invalid"),L("stb_not_working"),L("more_conn"),L("respondent_refuse")],
	radioItemsSaveValue:[L("respondent_yes"),L("respondent_no"),L("digicom_invalid"),L("stb_not_working"),L("more_conn"),L("respondent_refuse")],
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
	Alloy.Globals.dataToCapture.ready_to_participate = radioGroup2.selectedSaveValue;
	
	if(radioGroup2.selectedValue == 1){
		Alloy.createController("SixthScreen").getView().open();
	}else if(radioGroup2.selectedValue == 0){
		Alloy.createController("SeventhScreen").getView().open();
	}else if(radioGroup2.selectedValue == 5){
		Alloy.createController("FourtySeventhScreen").getView().open();
	}else{
		Alloy.createController("FourtySixthScreen").getView().open();
	}
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
