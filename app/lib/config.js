var config = (function() {


	//Dev Url//
 	// this.baseEndpoint = "http://dev.mynube.gs";
 	
 	//Stage Url//
 	this.baseEndpoint = "http://stage.mynube.gs";
 	
	// Production Url//
	// this.baseEndpoint = "http://mynube.gs";
	
	// Azure server 
	// this.baseEndpoint = "http://prod.mynube.gs";
	
	
	this.apiVersion = "v1";
	this.userImage = "";
	this.userName = "";
	this.firstName = "";
	this.lastName = "";
	this.deviceToken = "";
	this.featureMsg = "This feature is not available.";
	this.offileFeatureMsg = "This feature is not available when offline.";
	this.internetFailureMsg = "Please check your internet connection";
	this.isLoggingEnabled = true;

	return this;
})();
module.exports = config;
