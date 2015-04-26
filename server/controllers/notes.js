var Note = require('mongoose').model('Note');

//_id: req.body.userid
//userid: req.params.id
exports.getUserNotes = function (req, res) {
	Note.find({userid: req.params.id}).exec(function (err, collection) {
		if(err) { return err; }
		console.log(collection);
		res.send(collection);
	})
};

exports.getUserNote =function (req, res) {
	Note.findOne({_id: req.params.id}).exec(function (err, data) {
		if(err) { return err; }
		console.log(data);
		res.send(data);
	});
};

exports.getNotes = function (req, res) {
	Note.find({}).exec(function (err, collection) {
		if(err) return err;
		res.send(collection);
	});
};

exports.createNote = function (req, res, next) {

	var noteData = req.body;
	console.log(noteData);
	res.send(noteData);
	Note.create(noteData);
	
};

exports.deleteNote = function (req, res) {

	Note.remove({_id: req.params.id}, function (err) {
    	if (err) return err;
    	res.sendStatus(200);
	});
};

exports.updateNote = function (req, res) {
	Note.update({_id: req.params.id}, req.body, function (err, data) {
		if(err) return err;
		res.sendStatus(200);
	});
};