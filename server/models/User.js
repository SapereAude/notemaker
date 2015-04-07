var mongoose = require("mongoose");
var encrypt = require("../utilities/encryption");

var userSchema = mongoose.Schema({
	firstName: {type: String, required: '{PATH} is required'},
	lastName: {type: String, required: '{PATH} is required'},
	username: {
		type: String,
		required: '{PATH} is required',
		unique: true
	},
	salt: {type: String, required: '{PATH} is required'},
	hashed_pwd: {type: String, required: '{PATH} is required'},
	roles: [String]
});
userSchema.methods = {
	authenticate: function (passwordToMatch) {
		return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
	},
	hasRole: function (role) {
		return this.roles.indexOf(role) > -1;
	}
}

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {

	User.find({}).exec(function (err, collection) {
		if (collection.length === 0) {
			var salt, hash;
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'hlynur');
			User.create({
				firstName: 'Hlynur',
				lastName: 'Kjartansson',
				username: 'hlynur@hlynur.is',
				salt: salt,
				hashed_pwd: hash,
				roles: ['admin']
			});
			var salt, hash;
			salt = encrypt.createSalt();	
			hash = encrypt.hashPwd(salt, 'tara');
			User.create({
				firstName: 'Tara',
				lastName: 'Pétursdóttir',
				username: 'tara@tara.is',
				salt: salt,
				hashed_pwd: hash,
				roles: []
			});
			var salt, hash;
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'natalia');
			User.create({
				firstName: 'Natalía Marín',
				lastName: 'Hlynsdóttir',
				username: 'natalia@natalia.is',
				salt: salt,
				hashed_pwd: hash,
				roles: []
			});
			var salt, hash;
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'petur');
			User.create({
				firstName: 'Pétur Ragnar',
				lastName: 'Hlynsson',
				username: 'petur@petur.is',
				salt: salt,
				hashed_pwd: hash
			});
		}
	})
};

exports.createDefaultUsers = createDefaultUsers;