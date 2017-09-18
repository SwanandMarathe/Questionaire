// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.fifteenthScreen.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_STATE_VISIBLE;
setTimeout(function(){$.txtSubId.focus();},100);

var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.fifteenthScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});

// var picker = Ti.UI.createPicker({
	// width: 300, 
	// backgroundColor: '#fff',
	// color : '#000', 
	// zIndex: 10, 
	// // layout : 'horizontal',
// });
// var data = [];
// data[0]=Ti.UI.createPickerRow({title:'Tata Sky', width : 50, color : '#000'});
// data[1]=Ti.UI.createPickerRow({title:'Any Cable TV', width : 50, color : '#000'});
// data[2]=Ti.UI.createPickerRow({title:'Dish TV', width : 50, color : '#000'});
// data[3]=Ti.UI.createPickerRow({title:'Sun Direct', width : 50, color : '#000'});
// data[4]=Ti.UI.createPickerRow({title:'Airtel Digital', width : 50, color : '#000'});
// data[5]=Ti.UI.createPickerRow({title:'Reliance Digital', width : 50, color : '#000'});
// data[6]=Ti.UI.createPickerRow({title:'Videocon D2H', width : 50, color : '#000'});
// 
// picker.add(data);
// picker.selectionIndicator = false;
// $.tvType.add(picker);

$.txtSubId.addEventListener('change', function(e){
	if(e.value.length == 0)
		return;
	$.tvType.removeAllChildren();
	for(var i=0;i<e.value;i++){
		var picker = Ti.UI.createPicker({
			width: 300, 
			backgroundColor: 'gray',
			color : '#fff', 
			zIndex: 10, 
			top : 20,
			index : i
			// layout : 'horizontal',
		});
		var data = [];
		data[0]=Ti.UI.createPickerRow({title:'Tata Sky', width : 50, color : '#fff'});
		data[1]=Ti.UI.createPickerRow({title:'Any Cable TV', width : 50, color : '#fff'});
		data[2]=Ti.UI.createPickerRow({title:'Dish TV', width : 50, color : '#fff'});
		data[3]=Ti.UI.createPickerRow({title:'Sun Direct', width : 50, color : '#fff'});
		data[4]=Ti.UI.createPickerRow({title:'Airtel Digital', width : 50, color : '#fff'});
		data[5]=Ti.UI.createPickerRow({title:'Reliance Digital', width : 50, color : '#fff'});
		data[6]=Ti.UI.createPickerRow({title:'Videocon D2H', width : 50, color : '#fff'});
		picker.add(data);
		picker.selectionIndicator = true;
		$.tvType.add(picker);
		
	} 
});

function openNextScreen(e){
	var subIdValue = $.txtSubId.value;
	if(subIdValue == null || subIdValue.trim() == ""){
		return;
	}
	
	var typeOfstb = "";
	
	var tvTypeChildren = $.tvType.children;
	for(var i=0;i<tvTypeChildren.length;i++){
		typeOfstb = typeOfstb +","+(tvTypeChildren[i].getSelectedRow(0).title);
	}
	
	Alloy.Globals.dataToCapture.no_of_color_tv = $.txtSubId.value;
	Alloy.Globals.dataToCapture.type_ofstb = typeOfstb;
	Alloy.createController("SixteenthScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
