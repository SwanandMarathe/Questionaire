// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var radioButton	= require('/RadioOptions');
$.headerView.setBackImage('', '0dp', '0dp');
$.headerView.setBackText('');

$.headerView.setRightImage('');
$.headerView.setRightText('');

var radioGroup2 = radioButton.createGroup({
	groupId:1,
	width:150,
	height:150,
	layout:'vertical',
	radioItemsValue:['English', 'हिन्दी'],
	radioItemsSaveValue:['English', 'Hindi'],
	// font : {fontSize : 12},
	radioItemsPadding:20,
	radioItemsBackgroundSelectedImage:'/radioImages/radio_button_on.png',
	radioItemsBackgroundImage:'/radioImages/radio_button_off.png',
	radioItemsWidth:33,
	radioItemsHeight:34,
	callback : openNextScreen
});
radioGroup2.left = 20;


var txtUserId = Ti.UI.createTextField({
	top : 40,
	hintText : 'Please Enter User ID',
	width : 200,
	hintTextColor : '#7a7a7a',
	color : '#000000'
});
$.baseView.add(txtUserId);

var lblQues = Ti.UI.createLabel({
	text : L("language_selector"),
	top : 30,
	color : '#000000'
});
$.baseView.add(lblQues);
$.baseView.add(radioGroup2);

txtUserId.value = Ti.App.Properties.getString('userID', "");
var savedFirstObj = Ti.App.Properties.getBool('savedFirstObj', false);

if(savedFirstObj == true){
	txtUserId.visible = false;
}

function openNextScreen(e){
	var userIdValue = txtUserId.value;
	if(radioGroup2.selectedValue == null || userIdValue == null || userIdValue.trim() == ""){
		return;
	}
	if(radioGroup2.selectedValue == 0){
		Ti.App.Properties.setString('selectedLanguage','en');
		Alloy.Globals.language = 'en';
		Ti.Locale.setLanguage('en');
	}
	if(radioGroup2.selectedValue == 1){
		Ti.App.Properties.setString('selectedLanguage','hi');
		Alloy.Globals.language = 'hi';
		Ti.Locale.setLanguage('hi');
	}
	Ti.API.info(radioGroup2.selectedIndex + " Vertical radioGroup selectedIdx: " + radioGroup2.selectedValue);
	Alloy.createController("SecondScreen").getView().open();
	Alloy.Globals.dataToCapture.language = radioGroup2.selectedSaveValue;
	Alloy.Globals.dataToCapture.user_id = userIdValue;
	// Ti.App.Properties.setString('userID', userIdValue);
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
