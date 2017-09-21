// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var radioButton	= require('/RadioOptions');
var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.eighteenthScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
buttonNext.visible = true;
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});

var radioItemsValue = [L("broadband"),L("mobile"),L("dongle"),L("kind_of_conn_dnk"),L("kind_of_conn_other")];
var radioItemsSaveValue = [L("broadband"),L("mobile"),L("dongle"),L("kind_of_conn_dnk"),L("kind_of_conn_other")];

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
	view.add(lbl);
	$.baseView.add(view);
}


var txtFieldOther = Ti.UI.createTextField({
	top : 20,
	width : 200,
	hintText : 'Please name others',
	hintTextColor : 'gray',
	color : '#000',
	borderColor : 'gray',
	borderWidth : 1,
	visible : false
});
$.baseView.add(txtFieldOther);

function chklblClick(e){
	var chkbox = e.source.parent.children[0].widget;
	chkbox.setValue(!e.source.parent.children[0].value);
	// alert(chkbox.value);
		// for(var j=1; j<$.baseView.children.length-1; j++){
			// var chkbox = $.baseView.children[j].children[0].widget;
			// chkbox.setValue(false);
		// }
	if(e.source.text == "Other"){
		// if(e.source.parent.children[0].value){
		txtFieldOther.visible = e.source.parent.children[0].value;
		// }
	}
}

function openNextScreen(e){
	var typeOfConn = "";
	for(var j=1; j<$.baseView.children.length-1; j++){
		// alert($.baseView.children[j].children[0].value);
		if($.baseView.children[j].children[0].value == true){
			typeOfConn = typeOfConn +", "+ $.baseView.children[j].children[1].text;
			
			if($.baseView.children[j].children[1].text == "Other"){
				typeOfConn = typeOfConn +", "+ txtFieldOther.value;
			}
		}
	}
	
	if(typeOfConn == ""){
		typeOfConn = L("none_above");
	}
	Alloy.Globals.dataToCapture.typeof_internet_connection = typeOfConn;
	// Alloy.createController("NineteenthScreen").getView().open();
	Alloy.createController("TwentythScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
