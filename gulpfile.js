'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha')

gulp.task('tests', () => {
	gulp.watch("./test/*.js", ['tdd']);
	gulp.watch("./index.js", ['tdd']);
})

gulp.task('tdd', () => {
	gulp.src('./test/spec.js')
		.pipe(mocha({reporter: 'nyan'}))
        .once('error', (err) => {
        	console.log(err.message)
        });
})

gulp.task('default', ['tests']);