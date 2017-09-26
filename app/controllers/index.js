var db = require('/DatabaseConnector');
var savedFirstObj = Ti.App.Properties.getBool('savedFirstObj', false);

if(savedFirstObj){
	Alloy.createController("FirstScreen").getView().open();
}else{
	Alloy.createController("FiftyFifthScreen").getView().open();
}

// Ti.App.Properties.setString('selectedLanguage','hi');
// Alloy.Globals.language = 'hi';
// Ti.Locale.setLanguage('hi');

// Alloy.createController("ThirtythScreen").getView().open();
// Alloy.createController("FourthScreen").getView().open();
// Alloy.createController("FourtyEighthScreen").getView().open();
// Alloy.createController("FourtyNinethScreen").getView().open();
// Alloy.createController("SixteenthScreen").getView().open();
// Alloy.createController("ThirtySeventhScreen").getView().open();
// Alloy.createController("EighthScreen").getView().open();
// Alloy.createController("TwentythScreen").getView().open();
// Alloy.createController("FifteenthScreen").getView().open();
// Alloy.createController("FourtyNinethScreen").getView().open();
// Alloy.createController("EighteenthScreen").getView().open();
// Alloy.createController("TwentyFirstScreen").getView().open();
