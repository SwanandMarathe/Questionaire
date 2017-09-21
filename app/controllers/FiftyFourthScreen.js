// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var radioButton	= require('/RadioOptions');
var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.fiftyFourthScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
buttonNext.visible = true;
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});

var radioGroup2 = radioButton.createGroup({
	groupId:1,
	width:150,
	height:150,
	layout:'vertical',
	radioItemsValue:[L("yes"),L("no")],
	radioItemsSaveValue:[L("yes"),L("no")],
	radioItemsPadding:20,
	radioItemsBackgroundSelectedImage:'/radioImages/radio_button_on.png',
	radioItemsBackgroundImage:'/radioImages/radio_button_off.png',
	radioItemsWidth:33,
	radioItemsHeight:34,
	callback : togglefield
});
radioGroup2.left = 20;
$.baseView.add(radioGroup2);

var subTxt = Ti.UI.createTextField({
	width : 300,
	hintTextColor : '#7a7a7a',
	borderColor : 'gray',
	borderWidth : 1,
	color : '#000000',
	keyboardType : Ti.UI.KEYBOARD_TYPE_NUMBER_PAD,
	maxLength : 10,
	top : 10,
	visible : false
});
$.baseView.add(subTxt);

function togglefield(e){
	if(radioGroup2.selectedValue == 0){
		subTxt.visible = false;
	}else{
		subTxt.visible = true;
	}
}

function openNextScreen(e){
	if(radioGroup2.selectedValue == null){
		return;
	}
	
	Ti.API.info(radioGroup2.selectedIndex + " Vertical radioGroup selectedIdx: " + radioGroup2.selectedValue);
	Alloy.Globals.dataToCapture.is_sub_id_same = radioGroup2.selectedSaveValue;
	// Alloy.createController("FourtySixthScreen").getView().open();
	if(radioGroup2.selectedValue == 0){
		Alloy.createController("FourtySixthScreen").getView().open();
	}else{
		
		var subIdValue = subTxt.value;
		if(subIdValue == null || subIdValue.trim() == "" || subIdValue.length < 10 ||
			subIdValue < 1000000000 || subIdValue > 1999999999){
			alert('Please Enter a proper values.');
			return;
		}
		
		Alloy.Globals.dataToCapture.subscriber2_id = subTxt.value;
		
		Alloy.createController("FourtyFourthScreen",{isfirstDongle : false}).getView().open();
	}
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
