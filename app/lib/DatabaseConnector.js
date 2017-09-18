var DATABASE_NAME = 'quesDatabase';

var openDatabase = function() {
	if (database != null) {
		return;
	}
	var db = Ti.Database.open(DATABASE_NAME);
	database = db;
	db = null;
};

var closeDatabase = function() {
	if (database != null) {
		database.close();
		database = null;
	}
};

exports.createAllTables = function() {
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute("CREATE TABLE IF NOT EXISTS MessageCollection (msgID INTEGER PRIMARY KEY,to_uid INTEGER,from_uid INTEGER,to_team_id INTEGER,messageValue TEXT,msgTimestamp INTEGER);");
	db.execute("CREATE TABLE IF NOT EXISTS AllConnection (uid INTEGER PRIMARY KEY,team_id INTEGER,name TEXT,image_url TEXT,unread_count INTEGER);");

	db.close();
};
var addColumn = function(dbname, tblName, newFieldName, colSpec) {
	Ti.API.info('dbname' + dbname);
	Ti.API.info('tblName' + tblName);
	Ti.API.info('newFieldName' + newFieldName);
	Ti.API.info('colSpec' + colSpec);
	var db = Ti.Database.open(dbname);
	var fieldExists = false;
	var resultSet;
	resultSet = db.execute('PRAGMA TABLE_INFO(' + tblName + ')');
	while (resultSet.isValidRow()) {
		Ti.API.info('inside while loop' + resultSet.field(1));
		if (resultSet.field(1) == newFieldName) {
			Ti.API.info('exists');
			fieldExists = true;
		}
		resultSet.next();
	}// end while
	if (!fieldExists) {
		Ti.API.info('not exists');
		// field does not exist, so add it
		db.execute('ALTER TABLE ' + tblName + ' ADD COLUMN ' + newFieldName + ' ' + colSpec);
	}
	db.close();
};

function _executeDatabaseQuery(query) {
	var returnValue = true;
	try {
		var db = Ti.Database.open(DATABASE_NAME);
		db.execute(query);
		db.close();
		db = null;
	} catch(e) {
		returnValue = false;
		Ti.API.info("Exception while executing query: " + e);
	}
	return returnValue;
};
exports.executeDatabaseQuery = _executeDatabaseQuery;

function _getDataFromDatabase(query) {
	var dataArray = [];
	try {
		var db = Ti.Database.open(DATABASE_NAME);
		var resultSet = db.execute(query);

		var rowIndex = 0;
		while (resultSet.isValidRow()) {
			var columnIndex = 0;
			dataArray[rowIndex] = {};
			while (columnIndex < resultSet.getFieldCount()) {
				dataArray[rowIndex][resultSet.fieldName(columnIndex)] = resultSet.field(columnIndex);
				columnIndex++;
			}
			rowIndex++;
			resultSet.next();
		}
		resultSet.close();
		db.close();
		resultSet = null;
		db = null;
	} catch(e) {
		Ti.API.info("Exception while fetching data: " + e);
	}
	return dataArray;
};
exports.getDataFromDatabase = _getDataFromDatabase;

exports.insertEventListData = function(nid, title, type, description, start_datetime, end_datetime, location, categoryImage, team_id, team_name, opponent, owner_id, team1_score, team2_score, isEditable, isOfflineData, offlineId) {
	// nid, 		title, 			type, 			description, 		start_datetime, 		end_datetime, 		location, 		categoryImage, 			team_id, 	team_name, 		opponent, 		owner_id, 		team1_score, 	team2_score, 		isEditable, 	isOfflineData, 		offlineId
	var query = 'INSERT INTO EventList (nid, title, type, description, start_datetime, end_datetime, location, categoryImage, team_id, team_name, opponent, owner_id, team1_score, team2_score, isEditable, isOfflineData, offlineId) VALUES ("' + nid + '","' + title + '","' + type + '","' + description + '","' + start_datetime + '","' + end_datetime + '","' + location + '","' + categoryImage + '","' + team_id + '","' + team_name + '","' + opponent + '","' + owner_id + '","' + team1_score + '","' + team2_score + '","' + isEditable + '","' + isOfflineData + '","' + offlineId + '")';
	_executeDatabaseQuery(query);
};

exports.updateProfileInfo = function(uid, fileURL) {
	var query = 'UPDATE ProfileInfo SET  profile_picture="' + fileURL + '"  WHERE pid=' + uid;
	_executeDatabaseQuery(query);
};

function _getDivisionsData(show_id) {
	var query = 'SELECT * FROM Divisions';
	var teamsData = _getDataFromDatabase(query);
	return teamsData;
};
exports.getDivisionsData = _getDivisionsData;

function _getDataFromDatabaseUnescaped(query) {
	var dataArray = [];
	try {
		var db = Ti.Database.open(DATABASE_NAME);
		var resultSet = db.execute(query);

		var rowIndex = 0;
		while (resultSet.isValidRow()) {
			var columnIndex = 0;
			dataArray[rowIndex] = {};
			while (columnIndex < resultSet.getFieldCount()) {
				dataArray[rowIndex][resultSet.fieldName(columnIndex)] = unescape(resultSet.field(columnIndex));
				columnIndex++;
			}
			rowIndex++;
			resultSet.next();
		}
		resultSet.close();
		db.close();
		resultSet = null;
		db = null;
	} catch(e) {
		Ti.API.info("Exception while fetching data: " + e);
	}
	return dataArray;
};
exports.getDataFromDatabaseUnescaped = _getDataFromDatabaseUnescaped;

function addslashes( str ) {
    var str = (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
    return str.replace(/\r|\n/g, "\-new line-");
}

exports.getLastTimestamp = function(from_uid, to_team_id) {
	var timestamp = Math.floor(Date.now() / 1000);
	return timestamp;
};

