// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Globals.windowStack.push($.fourtyEighthScreen);

var radioButton	= require('/RadioOptions');
var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.fourtyEighthScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
// buttonNext.visible = false;
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});

var radioItemsValue = [L("lpg_stove"),L("ceiling_fan"),L("fridge"),L("washing_mc"),L("personal_comp"),L("moter_cycle"),L("four_wheeler"),L("air_cond"),L("agri_land"),L("micro_wave"),L("digital_slr"),L("smart_phone"),L("cycle"),L("radio"),L("video_game"),L("kerosene_stove"),L("dining_table"),L("kitchen_sink"),L("basic_phone"),L("car_gps"),L("dish_washer"),L("vaccum_cleaner"),L("ele_water_purifier"),L("nele_water_purifier"),L("mixer"),L("inverter"),L("air_cooler"),L("induction_stove"),L("generator"),L("music_sys"),L("music_sysp"),L("none_above")];
var radioItemsSaveValue = ["lpg_stove", "ceiling_fan", "fridge", "washing_mc", "personal_comp", "moter_cycle", "four_wheeler", "air_cond", "agri_land", "micro_wave", "digital_slr", "smart_phone", "cycle", "radio", "video_game", "kerosene_stove", "dining_table", "kitchen_sink", "basic_phone", "car_gps", "dish_washer", "vaccum_cleaner", "ele_water_purifier", "nele_water_purifier", "mixer", "inverter", "air_cooler", "induction_stove", "generator", "music_sys", "music_sysp", "none_above"];

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
	
	var lbl = Ti.UI.createLabel({left : 50, text : radioItemsValue[i], value : radioItemsSaveValue[i], right : 5,color : '#000000' });
	if(i<9){
		lbl.color = 'red';
		lbl.font = {fontWeight : 'bold'};
	}
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
			if(j < 9)
				goAhade = true;
			Ti.Locale.setLanguage('en');
			listOfAppliances = listOfAppliances +", "+ L($.baseView.children[j].children[1].value);
			
			if($.baseView.children[j].children[1].text == "None of the Above" || $.baseView.children[j].children[1].text == "उपरोक्त में से कोई नहीं"){
				listOfAppliances = L($.baseView.children[j].children[1].value);
			}
			Ti.Locale.setLanguage(Alloy.Globals.language);
		}
	}
	if(!goAhade){
		alert('Please select at-least 1 option from red color options.');
		return;
	}
	
	if(listOfAppliances == ""){
		Ti.Locale.setLanguage('en');
		listOfAppliances = L("none_above");
		Ti.Locale.setLanguage(Alloy.Globals.language);
	}
	// alert(listOfAppliances);
	// Ti.API.info(radioGroup2.selectedIndex + " Vertical radioGroup selectedIdx: " + radioGroup2.selectedValue);
	Alloy.Globals.dataToCapture.list_of_allpiances = listOfAppliances;
	Alloy.createController("FiftythScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
