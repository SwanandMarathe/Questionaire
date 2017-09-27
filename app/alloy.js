// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Ti.App.Properties.setString('selectedLanguage','en');
var language = Ti.App.Properties.getString('selectedLanguage','en');
Alloy.Globals.language = language;
Ti.Locale.setLanguage(language);

Alloy.Globals.windowStack = [];

Alloy.Globals.dataToCapture = {};

var savedFirstObj = Ti.App.Properties.getBool('savedFirstObj', false);

var data_to_sync = Ti.App.Properties.getObject('dataToSync', []);
