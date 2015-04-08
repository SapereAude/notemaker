var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		db: 'mongodb://localhost/meanstackdb',
		rootPath: rootPath,
		port: process.env.PORT || 3030
	},
	production: {
		db: 'mongodb://hlynurinn:FloatTitan1C.@ds035300.mongolab.com:35300/heroku_app35657173',
		rootPath: rootPath,
		port: process.env.PORT || 80
	}
}