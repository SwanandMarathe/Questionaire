// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Globals.windowStack.push($.nineteenthScreen);

var radioButton	= require('/RadioOptions');
var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.nineteenthScreen.close();	
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
	radioItemsValue:[L("device_laptop"),L("device_mobile"),L("device_tablet"),L("device_tv"),L("device_other")],
	radioItemsSaveValue:["device_laptop", "device_mobile", "device_tablet", "device_tv", "device_other"],
	radioItemsPadding:20,
	radioItemsBackgroundSelectedImage:'/radioImages/radio_button_on.png',
	radioItemsBackgroundImage:'/radioImages/radio_button_off.png',
	radioItemsWidth:33,
	radioItemsHeight:34,
	callback : openNextScreen
});
radioGroup2.left = 20;
// $.baseView.add(radioGroup2);

var radioItemsValue = [L("device_laptop"),L("device_mobile"),L("device_tablet"),L("device_tv"),L("device_other")];
var radioItemsSaveValue = [L("device_laptop"),L("device_mobile"),L("device_tablet"),L("device_tv"),L("device_other")];

var widget = Alloy.createWidget("checkbox",{value : false, left : 5});
// widget.value = true;
var widgetView = widget.getView();
widgetView.left = 100;
widgetView.borderColor = '#000000';
widgetView.borderWidth = 1;

for(var i=0;i<radioItemsValue.length;i++){
	var view = Ti.UI.createView({
		height : Ti.UI.SIZE,
		left : 20,
		right : 20,
		top : 10
	});
	view.add(Ti.UI.createLabel({text : radioItemsValue[i], value : radioItemsSaveValue[i], color : '#000', left : 5}));
	view.add(Ti.UI.createTextField({left:150, width : 50, maxLength:2, keyboardType: Ti.UI.KEYBOARD_TYPE_NUMBER_PAD, hintText : 'Hr', hintTextColor : 'gray', color : '#000', borderColor:'gray', borderWidth : 1}));
	
	$.baseView.add(view);
}

function openNextScreen(e){
	// if(radioGroup2.selectedValue == null){
		// return;
	// }
	Ti.API.info(radioGroup2.selectedIndex + " Vertical radioGroup selectedIdx: " + radioGroup2.selectedValue);
	// Alloy.Globals.dataToCapture.internet_usage = radioGroup2.selectedSaveValue;
	var value = "";
	var baseViewChildren = $.baseView.children;
	for(var i=1;i<baseViewChildren.length;i++){
		value = value +","+baseViewChildren[i].children[0].text+"-"+baseViewChildren[i].children[1].value;
	}
	Alloy.Globals.dataToCapture.internet_usage = value;
	Alloy.createController("TwentythScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
