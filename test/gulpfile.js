var quick = require('../index');

quick.sync({
	dist: './e2e/'
});

quick.js({
	browserify: true,
	//minify: true, // working with browserify
	main: './e2e/js/index.js',
	dist: './e2e/dist',
	watch: [
		'./e2e/js/**'
	]
})

quick.run();