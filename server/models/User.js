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