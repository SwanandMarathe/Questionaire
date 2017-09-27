// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Globals.windowStack.push($.fourtyNinethScreen);

var radioButton	= require('/RadioOptions');
var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.fourtyNinethScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
// buttonNext.visible = false;
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});

var radioItemsValue = [L("home_activity_restautant"),L("home_activity_drink"),L("home_activity_shopping"),L("home_activity_gym"),L("home_activity_library"),L("home_activity_dayout"),L("home_activity_concert"),L("home_activity_party"),L("home_activity_child"),L("home_activity_cleaning"),L("home_activity_holiday"),L("home_activity_none_above")];
var radioItemsSaveValue = ["home_activity_restautant", "home_activity_drink", "home_activity_shopping", "home_activity_gym", "home_activity_library", "home_activity_dayout", "home_activity_concert", "home_activity_party", "home_activity_child", "home_activity_cleaning", "home_activity_holiday", "home_activity_none_above"];

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
	
	var lbl = Ti.UI.createLabel({left : 50, text : radioItemsValue[i], value : radioItemsSaveValue[i],right : 5,color : '#000000' });
	lbl.addEventListener('click', chklblClick); 
	widgetView.addEventListener('change', chklblClick);
	view.add(lbl);
	
	$.baseView.add(view);
}

function chklblClick(e){
	var chkbox = e.source.parent.children[0].widget;
	chkbox.setValue(!e.source.parent.children[0].value);
	// alert(chkbox.value);
	if(e.source.text == "None of the Above" || e.source.text == "उपरोक्त में से कोई नहीं"){
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
	var listOfAppliances = "";
	var goAhade = false;
	for(var j=1; j<$.baseView.children.length; j++){
		// alert($.baseView.children[j].children[0].value);
		if($.baseView.children[j].children[0].value == true){
			Ti.Locale.setLanguage('en');
			listOfAppliances = listOfAppliances +", "+ L($.baseView.children[j].children[1].value);
			goAhade = true;
			if($.baseView.children[j].children[1].text == "None of the Above" || $.baseView.children[j].children[1].text == "उपरोक्त कोई नहीं"){
				listOfAppliances = L($.baseView.children[j].children[1].value);
			}
			Ti.Locale.setLanguage(Alloy.Globals.language);
		}
	}
	if(!goAhade){
		alert('Please select at-least 1 option');
		return;
	}
	if(listOfAppliances == ""){
		Ti.Locale.setLanguage('en');
		listOfAppliances = L("none_above");
		Ti.Locale.setLanguage(Alloy.Globals.language);
	}
	// alert(listOfAppliances);
	Ti.Locale.setLanguage(Alloy.Globals.language);
	// Ti.API.info(radioGroup2.selectedIndex + " Vertical radioGroup selectedIdx: " + radioGroup2.selectedValue);
	Alloy.Globals.dataToCapture.home_activity = listOfAppliances;
	Alloy.createController("SeventeenthScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
