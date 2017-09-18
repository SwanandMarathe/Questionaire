// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

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
var radioItemsSaveValue = [L("lpg_stove"),L("ceiling_fan"),L("fridge"),L("washing_mc"),L("personal_comp"),L("moter_cycle"),L("four_wheeler"),L("air_cond"),L("agri_land"),L("micro_wave"),L("digital_slr"),L("smart_phone"),L("cycle"),L("radio"),L("video_game"),L("kerosene_stove"),L("dining_table"),L("kitchen_sink"),L("basic_phone"),L("car_gps"),L("dish_washer"),L("vaccum_cleaner"),L("ele_water_purifier"),L("nele_water_purifier"),L("mixer"),L("inverter"),L("air_cooler"),L("induction_stove"),L("generator"),L("music_sys"),L("music_sysp"),L("none_above")];

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
	for(var j=1; j<$.baseView.children.length; j++){
		// alert($.baseView.children[j].children[0].value);
		if($.baseView.children[j].children[0].value == true){
			listOfAppliances = listOfAppliances +", "+ $.baseView.children[j].children[1].text;
			
			if($.baseView.children[j].children[1].text == "None of the Above" || $.baseView.children[j].children[1].text == "उपरोक्त में से कोई नहीं"){
				listOfAppliances = $.baseView.children[j].children[1].text;
			}
		}
	}
	
	if(listOfAppliances == ""){
		listOfAppliances = L("none_above");
	}
	// alert(listOfAppliances);
	// Ti.API.info(radioGroup2.selectedIndex + " Vertical radioGroup selectedIdx: " + radioGroup2.selectedValue);
	Alloy.Globals.dataToCapture.list_of_allpiances = listOfAppliances;
	Alloy.createController("FiftythScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
