var mongoose = require("mongoose");
var userModel = require("../models/User");
var notesModel = require("../models/Note");

module.exports = function (config) {
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
		console.log('meanstack db opened');
	});

	userModel.createDefaultUsers();
	notesModel.createDefaultNotes();


}
