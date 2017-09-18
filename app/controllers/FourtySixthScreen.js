// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var radioButton	= require('/RadioOptions');
var buttonBack = $.headerView.getView('backView');
buttonBack.visible = true;
buttonBack.addEventListener('click', function(e){
	$.fourtySixthScreen.close();	
});

$.headerView.setRightImage('');
$.headerView.setRightText('');

var radioGroup2 = radioButton.createGroup({
	groupId:1,
	width:150,
	height:150,
	layout:'vertical',
	radioItemsValue:['Hi, the process is successful', 'Sorry, the process failed. Please try after some time', 'Message was not going through from my mobile', 'Message sent, no reply recieved from the server', 'Digicom service invalid', 'set top box usb not working', 'Ignore this response'],
	radioItemsSaveValue:['Yes', 'No, Please specify reason'],
	radioItemsPadding:20,
	radioItemsBackgroundSelectedImage:'/radioImages/radio_button_on.png',
	radioItemsBackgroundImage:'/radioImages/radio_button_off.png',
	radioItemsWidth:33,
	radioItemsHeight:34,
	callback : openNextScreen
});
// radioGroup2.left = 20;
// $.baseView.add(radioGroup2);

function openNextScreen(e){
	// if(radioGroup2.selectedValue == null){
		// return;
	// }
	// Ti.API.info(radioGroup2.selectedIndex + " Vertical radioGroup selectedIdx: " + radioGroup2.selectedValue);
	Alloy.Globals.dataToCapture.conclusion_screen = 'yes';
	// Alloy.createController("FourtySixthScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
	
	var data_to_sync = Ti.App.Properties.getObject('dataToSync', []);
	if(Alloy.Globals.dataToCapture.dummy_or_live != 'Dummy' && Alloy.Globals.dataToCapture.dummy_or_live != "डमी"){
		data_to_sync.push(Alloy.Globals.dataToCapture);
	}
		
	Ti.App.Properties.setObject('dataToSync', data_to_sync);
	
	var data_to_sync1 = Ti.App.Properties.getObject('dataToSync', []);
	Ti.API.info('data_to_sync1 : '+JSON.stringify(data_to_sync1));
	Ti.App.Properties.setBool('savedFirstObj', true);
	Ti.App.Properties.setString('userID', Alloy.Globals.dataToCapture.user_id);
	
	Alloy.createController("FirstScreen").getView().open();
}
