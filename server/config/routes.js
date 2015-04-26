var auth = require("./auth");
var users = require('../controllers/users');
var notes = require('../controllers/notes');
var mongoose = require("mongoose");
var User = mongoose.model("User");

module.exports = function (app) {

	app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
	app.post('/api/users', users.createUser);
	app.put('/api/users', users.updateUser);

	app.post('/api/notes', notes.createNote);
	app.get('/api/notes/:id', notes.getUserNotes);
	//app.get('/api/notes/:noteid:', notes.getUserNote);
	app.get('/api/notes', auth.requiresRole('admin'), notes.getNotes);
	app.delete('/api/notes/:id', notes.deleteNote);
	app.put('/api/notes/:id', notes.updateNote);

	app.get('/partials/*', function (req, res) {
		res.render('../../public/app/' + req.params[0]);
	});

	app.post('/login', auth.authenticate);

	app.post('/logout', function (req, res) {
		req.logout();//logout is a passport func
		res.end();//no need for redirecting on server because it's handled on the client side
	});

	app.all('/api/*', function(req, res) {
		res.sendStatus(404);
	});

	app.get('*', function (req, res) {
		res.render('index', {
			bootstrappedUser: req.user
		});
	});
}