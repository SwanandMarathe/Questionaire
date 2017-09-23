
/* Custom Webservices */

var webservice = require('webService');
var config = require('config');
var Alloy = require('alloy');
var Logging = require('Logging');

//Object to store Social API status reponse
var status = {};

//Endpoint configuration
var baseEndpoint = config.baseEndpoint + '/api/' + config.apiVersion;


/**
 *
 * User registration API
 * @param {String} _firstname
 * @param {String} _lastname
 * @param {String} _dob
 * @param {String} _username
 * @param {String} _email
 * @param {String} _password
 * @param {Function} callback
 */
exports.syncData = function(callback) {
	var endpoint = baseEndpoint + '/create_survey';
	var header_data = [];
	var data_to_sync = Ti.App.Properties.getObject('dataToSync', []);
	var param = {
		'data' : data_to_sync
	};
	Logging.printConsoleLogs('param : '+JSON.stringify(param));
	Logging.printConsoleLogs('endpoint : '+endpoint);
	webservice.callWebServiceJSON('POST', endpoint, param, header_data, 'json', false, function(e) {
		Logging.printConsoleLogs('create_survey : '+JSON.stringify(e));
		callback(e);
	}, true);
};

/**
 * 
 * generate CSRF Token API
 * @param {Function} callback
 */
exports.generateCSRFToken = function(callback) {
	var endpoint = config.baseEndpoint + '/rest/session/token';
	var header_data = [];
	var param = "";
	
	Logging.printConsoleLogs('generateCSRFToken param : '+JSON.stringify(param));
	webservice.callWebServiceJSON('POST', endpoint, param, header_data, 'json', false, function(e) {
		Logging.printConsoleLogs('generateCSRFToken : '+e);
		 setTimeout(function(){
			callback(e);
		 },1000);
	}, true);
};

/**
 * 
 * User Login API
 * @param {String} _phoneNumber
 * @param {String} _deviceId
 * @param {String} _userId
 * @param {String} _password
 * @param {String} _language
 * @param {Function} callback
 */
exports.userLogin = function(_phoneNumber, _deviceId, _userId, _password, _language, callback) {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.clearCookies(config.baseEndpoint);
	var endpoint = baseEndpoint + '/custom/user/login?_format=json';
	var header_data = [];
	var param = {
		username : _phoneNumber,
		'device_id' :_deviceId,
		'user_id' :_userId,
		'password' : _password,
		'language' :_language
	};
	Logging.printConsoleLogs('userLogin param : '+JSON.stringify(param));
	/*
	var e ={
			 "success" :true,
			 "message" :"Please enter correct password",
			 "first_time_app_login" :true,
		 };*/
	
	webservice.callWebServiceJSON('POST', endpoint, param, header_data, 'json', false, function(e) {
		Logging.printConsoleLogs('userLogin : '+JSON.stringify(e));
		 //setTimeout(function(){
			callback(e);
		// },1000);
	}, true);
};


