var passport = require("passport");

// Gather user log in information
exports.authenticate = function(req, res, next){
	req.body.username = req.body.username.toLowerCase();

	var auth = passport.authenticate('local', function (err, user) {
		if(err) {return next(err);}
		if(!user) { res.send({success: false})}
		//explicitly log in the user, this is done with XHR post. The user comes from the server.js passport middleware
		req.logIn(user, function (err) {
			if(err) {return next(err);}
			res.send({success:true, user: user});
		})
	})
	auth(req, res, next);
};

exports.requiresApiLogin = function (req, res, next) {
	if(!req.isAuthenticated()){
		res.status(403);
		res.end();
	} else {
		next();
	}
};

exports.requiresRole = function (role) {
	return function (req, res, next) {
		if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
			res.status(403);
			res.end();
		} else {
			next();
		}
	}
};