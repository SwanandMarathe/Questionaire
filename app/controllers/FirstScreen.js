// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var savedFirstObj = Ti.App.Properties.getBool('savedFirstObj', false);
var radioButton	= require('/RadioOptions');

var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.firstScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
buttonNext.visible = false;
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});
if(savedFirstObj){
	$.headerView.setBackImage('', '0dp', '0dp');
	$.headerView.setBackText('');
	
	$.headerView.setRightImage('');
	$.headerView.setRightText('');
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
	layout : 'vertical',
	backgroundColor : '#c5c5c5'
});

var lblSelected = Ti.UI.createLabel({
	text : "You have selected",
	top : 30,
	color : '#000000'
});
var view1 = Ti.UI.createView({height : Ti.UI.SIZE, width : Ti.UI.SIZE, layout : 'horizontal'});
view1.add(Ti.UI.createLabel({text : 'User ID - ', color : '#000000'}));
var txtUserId = Ti.UI.createLabel({
	left : 5,
	hintText : 'Please Enter User ID',
	width : Ti.UI.SIZE,
	hintTextColor : '#7a7a7a',
	color : '#000000'
});
view1.add(txtUserId);
txtFieldBase.add(view1);

var txtUserName = Ti.UI.createLabel({
	left : 5,
	hintText : 'Please Enter User Name',
	width : Ti.UI.SIZE,
	hintTextColor : '#7a7a7a',
	color : '#000000'
});
var view2 = Ti.UI.createView({height : Ti.UI.SIZE, width : Ti.UI.SIZE, layout : 'horizontal'});
view2.add(Ti.UI.createLabel({text : 'User Name - ', color : '#000000'}));
view2.add(txtUserName);
txtFieldBase.add(view2);

var txtUserEmail = Ti.UI.createLabel({
	left : 5,
	hintText : 'Please Enter User Email',
	width : Ti.UI.SIZE,
	hintTextColor : '#7a7a7a',
	color : '#000000'
});
var view3 = Ti.UI.createView({height : Ti.UI.SIZE, width : Ti.UI.SIZE, layout : 'horizontal'});
view3.add(Ti.UI.createLabel({text : 'User Email - ', color : '#000000'}));
view3.add(txtUserEmail);
txtFieldBase.add(view3);

var txtUserMobile = Ti.UI.createLabel({
	left : 5,
	hintText : 'Please Enter User Mobile',
	width : Ti.UI.SIZE,
	hintTextColor : '#7a7a7a',
	color : '#000000',
	maxLength : 10,
	keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD
});
var view4 = Ti.UI.createView({height : Ti.UI.SIZE, width : Ti.UI.SIZE, layout : 'horizontal'});
view4.add(Ti.UI.createLabel({text : 'User Mobile - ', color : '#000000'}));
view4.add(txtUserMobile);
txtFieldBase.add(view4);

var txtUserMarket = Ti.UI.createLabel({
	left : 5,
	hintText : 'Please Enter User Market',
	width : Ti.UI.SIZE,
	hintTextColor : '#7a7a7a',
	color : '#000000'
});
var view5 = Ti.UI.createView({height : Ti.UI.SIZE, width : Ti.UI.SIZE, layout : 'horizontal'});
view5.add(Ti.UI.createLabel({text : 'User Market - ', color : '#000000'}));
view5.add(txtUserMarket);
txtFieldBase.add(view5);

var txtUserLanguage = Ti.UI.createLabel({
	top : 5,
	hintText : 'Please Enter User Market',
	width : Ti.UI.SIZE,
	hintTextColor : '#7a7a7a',
	color : '#000000'
});
var view6 = Ti.UI.createView({height : Ti.UI.SIZE, width : Ti.UI.SIZE, layout : 'horizontal'});
view6.add(Ti.UI.createLabel({text : 'Language - ', color : '#000000'}));
view6.add(txtUserLanguage);
txtFieldBase.add(view6);

var editBtn = Ti.UI.createButton({
	top : 15,
	title : 'Edit',
	
	color : '#ffffff'
});
txtFieldBase.add(editBtn);

editBtn.addEventListener('click', function(){
	Alloy.createController("FiftyFifthScreen",{showBack : true}).getView().open();
});

var lblQues = Ti.UI.createLabel({
	text : L("language_selector"),
	top : 30,
	color : '#000000'
});

$.baseView.add(txtFieldBase);
// $.baseView.add(lblQues);
// $.baseView.add(radioGroup2);

if(savedFirstObj == true){
	txtUserId.text = Ti.App.Properties.getString('userID', "");
	txtUserName.text = Ti.App.Properties.getString('userName', "");
	txtUserEmail.text = Ti.App.Properties.getString('userEmail', "");
	txtUserMobile.text = Ti.App.Properties.getString('userMobile', "");
	txtUserMarket.text = Ti.App.Properties.getString('userMarket', "");
	var lang = Ti.App.Properties.getString('selectedLanguage', "en");
	txtUserLanguage.text = (lang == 'en') ? "English" : 'हिन्दी';
}else{
	txtUserId.text = Alloy.Globals.dataToCapture.user_id;
	txtUserName.text = Alloy.Globals.dataToCapture.user_name;
	txtUserEmail.text = Alloy.Globals.dataToCapture.user_email;
	txtUserMobile.text = Alloy.Globals.dataToCapture.user_mobile;
	txtUserMarket.text = Alloy.Globals.dataToCapture.user_market;
	txtUserLanguage.text = Alloy.Globals.dataToCapture.language;
}

function openNextScreen(e){
	var userIdValue = txtUserId.text;
	var userNameValue = txtUserName.text;
	var userEmailValue = txtUserEmail.text;
	var userMobileValue = txtUserMobile.text;
	var userMarketValue = txtUserMarket.text;
	var userLang = Ti.App.Properties.getString('selectedLanguage', "en");
	if(txtUserLanguage.text == "" || userIdValue == null || userIdValue.trim() == ""){
		return;
	}
	if(txtUserLanguage.text == "" || userNameValue == null || userNameValue.trim() == ""){
		return;
	}
	if(txtUserLanguage.text == "" || userEmailValue == null || userEmailValue.trim() == ""){
		return;
	}
	if(txtUserLanguage.text == "" || userMobileValue == null || userMobileValue.trim() == "" || userMobileValue.length < 10){
		return;
	}
	if(txtUserLanguage.text == "" || userMarketValue == null || userMarketValue.trim() == ""){
		return;
	}
	// if(radioGroup2.selectedValue == 0){
		// Ti.App.Properties.setString('selectedLanguage','en');
		// Alloy.Globals.language = 'en';
		// Ti.Locale.setLanguage('en');
	// }
	// if(radioGroup2.selectedValue == 1){
		// Ti.App.Properties.setString('selectedLanguage','hi');
		// Alloy.Globals.language = 'hi';
		// Ti.Locale.setLanguage('hi');
	// }
	// Ti.API.info(radioGroup2.selectedIndex + " Vertical radioGroup selectedIdx: " + radioGroup2.selectedValue);
	Alloy.Globals.dataToCapture.language = userLang;
	Alloy.Globals.dataToCapture.user_id = userIdValue;
	Alloy.Globals.dataToCapture.user_name = userNameValue;
	Alloy.Globals.dataToCapture.user_email = userEmailValue;
	Alloy.Globals.dataToCapture.user_mobile = userMobileValue;
	Alloy.Globals.dataToCapture.user_market = userMarketValue;
	// Ti.App.Properties.setString('userID', userIdValue);
	Alloy.createController("SecondScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
