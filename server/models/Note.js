var mongoose = require("mongoose");
//var User = require('mongoose').model('User');

var noteSchema = mongoose.Schema({
		userid: String,//{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		content: String,
		category: String,
		created: {type: Date, default: Date.now }
	});

var Note = mongoose.model('Note', noteSchema);

function createDefaultNotes() {

	Note.find({}).exec(function (err, collection) {
		if (collection.length === 0) {
			Note.create({
				userid: '5522ac23ca95169416ecda35',
				content: 'hlynur note 1',
				category: 'cat1'
			})
			Note.create({
				userid: '5522ac23ca95169416ecda35',
				content: 'hlynur note 2',
				category: 'cat2'
			})
			Note.create({
				userid: '5521638684f8a27825bf256e',
				content: 'tara note 1',
				category: 'cat1'
			})
			Note.create({
				userid: '5521638684f8a27825bf256e',
				content: 'tara note 2',
				category: 'cat2'
			})
			Note.create({
				userid: '5521638684f8a27825bf256f',
				content: 'Natalia note 1',
				category: 'cat1'
			})
			Note.create({
				userid: '5521638684f8a27825bf256f',
				content: 'Natalia note 2',
				category: 'cat2'
			})
		}
	})
};

exports.createDefaultNotes = createDefaultNotes;
//module.exports = noteSchema;

