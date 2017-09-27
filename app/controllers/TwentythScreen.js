// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Globals.windowStack.push($.twentythScreen);

var radioButton	= require('/RadioOptions');
var buttonBack = $.headerView.getView('backView');
buttonBack.addEventListener('click', function(e){
	$.twentythScreen.close();	
});

var buttonNext = $.headerView.getView('rightView');
buttonNext.visible = true;
buttonNext.addEventListener('click', function(e){
	openNextScreen();
});

// var radioGroup2 = radioButton.createGroup({
	// groupId:1,
	// width:150,
	// height:150,
	// layout:'vertical',
	// radioItemsValue:[L("use_donot"),L("use_daily"),L("use_onceweek"),L("use_oncefort"),L("use_oncemonth"),L("use_less_frequent"),L("use_twice_week")],
	// radioItemsSaveValue:[L("use_donot"),L("use_daily"),L("use_onceweek"),L("use_oncefort"),L("use_oncemonth"),L("use_less_frequent"),L("use_twice_week")],
	// radioItemsPadding:20,
	// radioItemsBackgroundSelectedImage:'/radioImages/radio_button_on.png',
	// radioItemsBackgroundImage:'/radioImages/radio_button_off.png',
	// radioItemsWidth:33,
	// radioItemsHeight:34,
	// callback : openNextScreen
// });
// radioGroup2.left = 20;
// $.baseView.add(radioGroup2);

var options = ['Desktop/Laptop', 'Mobile', 'Tablet', 'Smart TV', 'Others'];

for(var i=0;i<options.length;i++){
	var view = Ti.UI.createView({
		top : 20,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});
	view.add(Ti.UI.createLabel({left : 0, top:5, color : '#000', text : options[i]}));
	var picker = Ti.UI.createPicker({
		width: 300, 
		backgroundColor: 'gray',
		color : '#fff', 
		zIndex: 10, 
		top : 30,
		index : i
		// layout : 'horizontal',
	});
	var data = [];
	data[0]=Ti.UI.createPickerRow({title:'Select', width : 50, color : '#fff'});
	data[1]=Ti.UI.createPickerRow({title:'Do not use', width : 50, color : '#fff'});
	data[2]=Ti.UI.createPickerRow({title:'Daily', width : 50, color : '#fff'});
	data[3]=Ti.UI.createPickerRow({title:'Twice a week', width : 50, color : '#fff'});
	data[4]=Ti.UI.createPickerRow({title:'Once a week', width : 50, color : '#fff'});
	data[5]=Ti.UI.createPickerRow({title:'Once a fortnight', width : 50, color : '#fff'});
	data[6]=Ti.UI.createPickerRow({title:'Once a month', width : 50, color : '#fff'});
	data[7]=Ti.UI.createPickerRow({title:'Less Frequent', width : 50, color : '#fff'});
	picker.add(data);
	picker.selectionIndicator = true;
	view.add(picker);
	$.baseView.add(view);
}

function openNextScreen(e){
	// if(radioGroup2.selectedValue == null){
		// return;
	// }
	// Ti.API.info(radioGroup2.selectedIndex + " Vertical radioGroup selectedIdx: " + radioGroup2.selectedValue);
	
	var hourSpend = "";
	
	for (var i=1; i < $.baseView.children.length; i++) {
		if($.baseView.children[i].children[1].getSelectedRow(0).title == 'Select'){
			alert('Please select a value');
			return;
		}
		hourSpend = hourSpend+','+$.baseView.children[i].children[0].text+':'+$.baseView.children[i].children[1].getSelectedRow(0).title;
	};
	
	Alloy.Globals.dataToCapture.internet_usage = hourSpend;//radioGroup2.selectedSaveValue;
	Alloy.createController("TwentyFirstScreen").getView().open();
	
	Ti.API.info('Alloy.Globals.dataToCapture : '+JSON.stringify(Alloy.Globals.dataToCapture));
}
