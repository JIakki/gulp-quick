var quick = require('../index');

quick.sync({
	dist: './test/e2e/'
});

quick.sass({
	style: 'compressed',
	dist: './test/e2e/dist',
	watch: [
		'./test/e2e/sass/**'
	]
})

quick.js({
	browserify: true,
	minify: true, // working with browserify
	main: './test/e2e/js/index.js',
	dist: './test/e2e/dist',
	watch: [
		'./test/e2e/js/**'
	]
})

quick.run();