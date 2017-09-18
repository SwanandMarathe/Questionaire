// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var memberCount = Alloy.Globals.dataToCapture.no_of_familymember;
if(memberCount > 9)
	memberCount = 9;

var radioButton	= require('/RadioOptions');

var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.fiftyFirstScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});

var widget = Alloy.createWidget("checkbox",{value : false, left : 5});
// widget.value = true;
var widgetView = widget.getView();
widgetView.left = 100;
widgetView.borderColor = '#000000';
widgetView.borderWidth = 1;
// widgetView.value = true;

$.cweview.add(Ti.UI.createLabel({left : 10, text : "CWE = HW",right : 5,color : '#000000' }));
$.cweview.add(widgetView);

widgetView.addEventListener('change',function(e){
	if(memberCount < 2)
		return;
	
	var memListChildren = $.memberList.children;
	if(e.value)
		memListChildren[1].opacity = 0.4;
	else
		memListChildren[1].opacity = 1;
		
	for (var i=0; i < memListChildren[1].children.length; i++) {
  		memListChildren[1].children[i].touchEnabled = !e.value;
	};
	for (var i=0; i < memListChildren[1].children[2].children[0].children.length; i++) {
  		memListChildren[1].children[2].children[0].children[i].touchEnabled = !e.value;
  		memListChildren[1].children[2].children[1].children[i].touchEnabled = !e.value;
	};
});

for(var i=0;i<memberCount;i++){
	var view = Ti.UI.createView({
		height : Ti.UI.SIZE,
		left : 20,
		right : 20
	});
	view.add(Ti.UI.createLabel({text : (i==0)?'CWE':(i==1)?'HW':i+1, color : '#000', left : 5}));
	view.add(Ti.UI.createTextField({left:50, width : 100, keyboardType: Ti.UI.KEYBOARD_TYPE_NUMBER_PAD, hintText : 'Age', hintTextColor : 'gray', color : '#000', borderColor:'gray', borderWidth : 1}));
	
	var radioGroup2 = radioButton.createGroup({
		groupId:1,
		width:250,
		height:150,
		layout:'horizontal',
		radioItemsValue:["M","F"],
		radioItemsSaveValue:["M","F"],
		radioItemsPadding:25,
		radioItemsBackgroundSelectedImage:'/radioImages/radio_button_on.png',
		radioItemsBackgroundImage:'/radioImages/radio_button_off.png',
		radioItemsWidth:23,
		radioItemsHeight:24,
		// callback : openNextScreen
	});
	radioGroup2.left = 160;
	view.add(radioGroup2);
	$.memberList.add(view);
}

function openNextScreen(e){
	var memListChildren = $.memberList.children;
	var agemf = "";
	
	for(var i=0;i<memListChildren.length;i++){
		if(i != 1 ){
		if((memListChildren[i].children[1].value.trim() == '' || memListChildren[i].children[1].value == "" ||
			memListChildren[i].children[1].value < 1 || memListChildren[i].children[1].value > 99) && widget.value == false){
			return;
		}
		}
		if(i != 1 ){
		if((memListChildren[i].children[2].selectedSaveValue == null) && widget.value == false){
			return;
		}
		}
		
		agemf = agemf+"_"+(memListChildren[i].children[0].text +","+memListChildren[i].children[1].value+","+memListChildren[i].children[2].selectedSaveValue);
	}
	
	Alloy.Globals.dataToCapture.cwe_is_hw = widget.value;
	Alloy.Globals.dataToCapture.member_values = agemf;
	
	Alloy.createController("FourtyNinethScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
