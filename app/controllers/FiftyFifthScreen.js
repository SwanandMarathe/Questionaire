// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var radioButton	= require('/RadioOptions');

$.headerView.setRightImage('');
$.headerView.setRightText('');

if(args.showBack){
	var buttonBack = $.headerView.getView('backView');
	buttonBack.addEventListener('click', function(e){
		$.fiftyFifthScreen.close();	
	});
}else{
	$.headerView.setBackImage('', '0dp', '0dp');
	$.headerView.setBackText('');
}

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
	// callback : openNextScreen
});
radioGroup2.left = 20;

var txtFieldBase = Ti.UI.createView({
	height : Ti.UI.SIZE,
	layout : 'vertical'
});
var txtUserId = Ti.UI.createTextField({
	top : 5,
	hintText : 'Please Enter User ID',
	width : 200,
	hintTextColor : '#7a7a7a',
	color : '#000000'
});
txtFieldBase.add(txtUserId);

var txtUserName = Ti.UI.createTextField({
	top : 5,
	hintText : 'Please Enter User Name',
	width : 200,
	hintTextColor : '#7a7a7a',
	color : '#000000'
});
txtFieldBase.add(txtUserName);

var txtUserEmail = Ti.UI.createTextField({
	top : 5,
	hintText : 'Please Enter User Email',
	width : 200,
	hintTextColor : '#7a7a7a',
	color : '#000000'
});
txtFieldBase.add(txtUserEmail);

var txtUserMobile = Ti.UI.createTextField({
	top : 5,
	hintText : 'Please Enter User Mobile',
	width : 200,
	hintTextColor : '#7a7a7a',
	color : '#000000',
	maxLength : 10,
	keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD
});
txtFieldBase.add(txtUserMobile);

var txtUserMarket = Ti.UI.createTextField({
	top : 5,
	hintText : 'Please Enter User Market',
	width : 200,
	hintTextColor : '#7a7a7a',
	color : '#000000'
});
txtFieldBase.add(txtUserMarket);

var lblQues = Ti.UI.createLabel({
	text : L("language_selector"),
	top : 30,
	color : '#000000'
});

$.baseView.add(txtFieldBase);
$.baseView.add(lblQues);
$.baseView.add(radioGroup2);

// txtUserId.value = Ti.App.Properties.getString('userID', "");
// txtUserName.value = Ti.App.Properties.getString('userName', "");
// txtUserEmail.value = Ti.App.Properties.getString('userEmail', "");
// txtUserMobile.value = Ti.App.Properties.getString('userMobile', "");
// txtUserMarket.value = Ti.App.Properties.getString('userMarket', "");

var savedFirstObj = Ti.App.Properties.getBool('savedFirstObj', false);

if(savedFirstObj == true){
	txtUserId.value = Ti.App.Properties.getString('userID', "");
	txtUserName.value = Ti.App.Properties.getString('userName', "");
	txtUserEmail.value = Ti.App.Properties.getString('userEmail', "");
	txtUserMobile.value = Ti.App.Properties.getString('userMobile', "");
	txtUserMarket.value = Ti.App.Properties.getString('userMarket', "");
}else{
	txtUserId.value = Alloy.Globals.dataToCapture.user_id;
	txtUserName.value = Alloy.Globals.dataToCapture.user_name;
	txtUserEmail.value = Alloy.Globals.dataToCapture.user_email;
	txtUserMobile.value = Alloy.Globals.dataToCapture.user_mobile;
	txtUserMarket.value = Alloy.Globals.dataToCapture.user_market;
}

function openNextScreen(e){
	var userIdValue = txtUserId.value;
	var userNameValue = txtUserName.value;
	var userEmailValue = txtUserEmail.value;
	var userMobileValue = txtUserMobile.value;
	var userMarketValue = txtUserMarket.value;
	
	if(radioGroup2.selectedValue == null || userIdValue == null || userIdValue.trim() == ""){
		return;
	}
	if(radioGroup2.selectedValue == null || userNameValue == null || userNameValue.trim() == ""){
		return;
	}
	if(radioGroup2.selectedValue == null || userEmailValue == null || userEmailValue.trim() == ""){
		return;
	}
	if(radioGroup2.selectedValue == null || userMobileValue == null || userMobileValue.trim() == "" || userMobileValue.length < 10){
		return;
	}
	if(radioGroup2.selectedValue == null || userMarketValue == null || userMarketValue.trim() == ""){
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
	Alloy.Globals.dataToCapture.language = radioGroup2.selectedSaveValue;
	Alloy.Globals.dataToCapture.user_id = userIdValue;
	Alloy.Globals.dataToCapture.user_name = userNameValue;
	Alloy.Globals.dataToCapture.user_email = userEmailValue;
	Alloy.Globals.dataToCapture.user_mobile = userMobileValue;
	Alloy.Globals.dataToCapture.user_market = userMarketValue;
	// Ti.App.Properties.setString('userID', userIdValue);
	
	Alloy.createController("FirstScreen").getView().open();
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
