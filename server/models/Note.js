var mongoose = require("mongoose");
//var User = require('mongoose').model('User');

var noteSchema = mongoose.Schema({
		userid: String,//{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		content: String,
		category: String,
		created: {type: Date, default: Date.now }
	});

var Note = mongoose.model('Note', noteSchema);