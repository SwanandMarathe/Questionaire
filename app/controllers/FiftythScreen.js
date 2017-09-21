// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var radioButton	= require('/RadioOptions');
var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.fiftythScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
buttonNext.visible = true;
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});

var radioItemsValue = [L("stb_type_sd"),L("stb_type_hd"),L("stb_type_hdpvr"),L("stb_type_hdtpvr"),L("stb_type_sdpvr"),L("stb_type_4k"),L("stb_type_dnk")];
var radioItemsSaveValue = [L("stb_type_sd"),L("stb_type_hd"),L("stb_type_hdpvr"),L("stb_type_hdtpvr"),L("stb_type_sdpvr"),L("stb_type_4k"),L("stb_type_dnk")];

// var radioGroup2 = radioButton.createGroup({
	// groupId:1,
	// width:150,
	// height:150,
	// layout:'vertical',
	// radioItemsValue:[L("stb_type_sd"),L("stb_type_hd"),L("stb_type_hdpvr"),L("stb_type_hdtpvr"),L("stb_type_sdpvr"),L("stb_type_4k"),L("stb_type_dnk")],
	// radioItemsSaveValue:[L("stb_type_sd"),L("stb_type_hd"),L("stb_type_hdpvr"),L("stb_type_hdtpvr"),L("stb_type_sdpvr"),L("stb_type_4k"),L("stb_type_dnk")],
	// radioItemsPadding:20,
	// radioItemsBackgroundSelectedImage:'/radioImages/radio_button_on.png',
	// radioItemsBackgroundImage:'/radioImages/radio_button_off.png',
	// radioItemsWidth:26,
	// radioItemsHeight:27,
	// callback : openNextScreen
// });
// radioGroup2.left = 20;
// $.baseView.add(radioGroup2);

for(var i=0; i < radioItemsValue.length; i++){
	var view = Ti.UI.createView({
		// layout : 'horizontal',
		left : 20,
		right : 20,
		height : Ti.UI.SIZE,
		top : 10
	});
	
	var widget = Alloy.createWidget("checkbox",{value : false, left : 5});
	// widget.value = true;
	var widgetView = widget.getView();
	widgetView.widget = widget;
	widgetView.left = 5;
	widgetView.borderColor = '#000000';
	widgetView.borderWidth = 1;
	// widgetView.value = true;
	widgetView.index = i;
	view.add(widgetView);
	
	var lbl = Ti.UI.createLabel({left : 50, text : radioItemsSaveValue[i],right : 5,color : '#000000' });
	lbl.addEventListener('click', chklblClick);
	widgetView.addEventListener('change', chklblClick);
	view.add(lbl);
	$.baseView.add(view);
}

function chklblClick(e){
	var chkbox = e.source.parent.children[0].widget;
	chkbox.setValue(!e.source.parent.children[0].value);
	// alert(chkbox.value);
	if(e.source.text == "Don’t know/Can’t say" || e.source.text == "पता नहीं/ बता नहीं सकते"){
		for(var j=1; j<$.baseView.children.length-1; j++){
			var chkbox = $.baseView.children[j].children[0].widget;
			chkbox.setValue(false);
		}
	}else{
		for(var j=1; j<$.baseView.children.length; j++){
			if(j==$.baseView.children.length-1){
				var chkbox = $.baseView.children[j].children[0].widget;
				chkbox.setValue(false);
			}
		}
	}
}

function openNextScreen(e){
	// if(radioGroup2.selectedValue == null){
		// return;
	// }
	// Ti.API.info(radioGroup2.selectedIndex + " Vertical radioGroup selectedIdx: " + radioGroup2.selectedValue);
	
	var stb_type = "";
	for(var j=1; j<$.baseView.children.length; j++){
		// alert($.baseView.children[j].children[0].value);
		if($.baseView.children[j].children[0].value == true){
			stb_type = stb_type +", "+ $.baseView.children[j].children[1].text;
			
			if($.baseView.children[j].children[1].text == "Don’t know/Can’t say" || $.baseView.children[j].children[1].text == "पता नहीं/ बता नहीं सकते"){
				stb_type = $.baseView.children[j].children[1].text;
			}
		}
	}
	
	if(stb_type == ""){
		stb_type = L("stb_type_dnk");
	}
	
	Alloy.Globals.dataToCapture.stb_type = stb_type;
	Alloy.createController("FourteenthScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
