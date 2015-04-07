var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		db: 'mongodb://localhost/meanstackdb',
		rootPath: rootPath,
		port: process.env.PORT || 3030
	},
	production: {
		db: 'mongodb://hlynurinn:hlynurErMed7henduR@ds037611.mongolab.com:37611/hlynurinn',
		rootPath: rootPath,
		port: process.env.PORT || 80
	}
}