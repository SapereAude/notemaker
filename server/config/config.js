var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		db: 'mongodb://localhost/meanstackdb',
		rootPath: rootPath,
		port: process.env.PORT || 3030
	},
	production: {
		db: 'mongodb://hlynurinn:FloatTitan1C.@ds061741.mongolab.com:61741/notemakerdb',
		rootPath: rootPath,
		port: process.env.PORT || 80
	}
}