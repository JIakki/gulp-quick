'use strict';

/*===============================
=            modules            =
===============================*/


const gulp = require('gulp');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const sync = require('browser-sync').create();
const ts = require('gulp-typescript');



/*============================
=            Task            =
============================*/

// Closure for add params to methods 


function syncTaks(param, watch) {
	console.log(arguments)
	return function () {
		sync.init({
			server: {
				baseDir: param
			},
			port: 8080
		});

		gulp.watch(watch).on('change', sync.reload)
	}
}


/*===================================
=            Constructor            =
===================================*/


function Quick() {
	let self = this;

	/**
	 * array of tasks 
	 * @type {Array}
	 */
	this.task = [];

	/**
	 * For each method in prototype before calling original method we need add name in this.task
	 * @return {Function} return an origanal method with new arguments 
	 */
	Object.keys(self.constructor.prototype).forEach(function (key) {

		// don't add 'run' to task
		if(key === 'run') { return }

		// save original method
		var original = self.constructor.prototype[key];

		self.constructor.prototype[key] = function () {

			// push task name
			self.task.push(key);

			return original.apply(self, arguments);
		};
	});

}

Quick.prototype.sync = function(path, watch) {

	gulp.task('sync', syncTaks(path, watch));

}

Quick.prototype.run = function() {
	let self = this;

	if(self.task) {
		gulp.run(self.task);
	}
}

/*==============================
=            export            =
==============================*/




module.exports = new Quick;