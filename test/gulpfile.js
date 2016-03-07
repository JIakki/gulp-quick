var gulp = require('gulp')
var quick = require('../index');

quick.sync(__dirname + '/e2e', [
	__dirname + '/e2e/*'
]);

quick.run()