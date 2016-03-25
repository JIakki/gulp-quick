'use strict';

/*===============================
=            modules            =
===============================*/


const gulp = require('gulp');
const sass = require('gulp-sass');
const sync = require('browser-sync').create();

var gulpif = require('gulp-if');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer');
var assign = require('lodash.assign');
var watchify = require('watchify');
var browserify = require('browserify');
var stringify = require('stringify');


const path = require('path')

var root = path.dirname(require.main.filename);



/*============================
=            Task            =
============================*/

// Closure for add params to methods 


/**
 * Livereload, sync browsers 
 * @param  {Object} params
 * @return {Function} 
 */
function syncTaks(params) {
	return function () {
		sync.init({
			server: {
				baseDir: path.join(root + '/' + params.dist) ,
			},
			port: 8080
		});

		gulp.watch(path.join(root + '/' + params.dist  + '/*.html') ).on('change', sync.reload)
	}
}

/**
 * Sass task
 * @param  {Object} params
 * @return {Function} 
 */
function sassTask(params) {
	return function() {
		gulp.src( path.join(root + '/' + params.watch) )
			.pipe(sass({
				outputStyle: params.style
			}))
			.pipe(gulp.dest( path.join(root + '/' + params.dist) ))
			.pipe(sync.stream({
				match: path.join(root + '/' + params.dist + '/*.*')
			}))
	}
}


/**
 * Sass task
 * @param  {Object} params
 * @return {Function} 
 */
function jsTask(params) {
	var opts = assign({}, watchify.args, {entries: [ path.join(root + '/' + params.main) ]});
	return function() {

		// if  params.browserify is not exist then just reload page
		if(!params.browserify) {
			sync.reload()
		}

		watchify(
			browserify(opts)
			.transform(stringify, {
				appliesTo: { includeExtensions: ['.html'] }
			})
		)

		.bundle()

		.on('end', () => {
			sync.reload()
		})
		.pipe(source(path.basename(root + '/' + params.main)))
		.pipe(buffer())
		.pipe(gulpif( params.minify, uglify() ))
		.pipe(babel({
		}))
		.pipe(gulp.dest( path.join(root + '/' + params.dist) ))
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

Quick.prototype.sync = function(params) {

	gulp.task('sync', syncTaks(params));

	return this;
}

Quick.prototype.sass = function (params) {

	gulp.watch( path.join(root + '/' + params.watch) , ['sass'])

	gulp.task('sass', sassTask(params));

	return this;
}

Quick.prototype.js = function(params) {
	gulp.watch( path.join(root + '/' + params.watch) , ['js'])

	gulp.task('js', jsTask(params));
}

Quick.prototype.run = function() {
	let self = this;

	if(self.task) {
		gulp.run(self.task)
	}
}

/*==============================
=            export            =
==============================*/




module.exports = new Quick;