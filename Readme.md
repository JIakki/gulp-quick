# Usage


## Install

```
npm install --save-dev gulp-quick
```

## Example


```javascript

var quick = require('gulp-quick');

// auto reloading browser and sync with other browser
quick.sync({
	dist: './' // path to index.html page
});

// convert sass to css
quick.sass({
	style: 'compressed', // if you need to minify your css

	dist: './dist', // output css

	// watching sass file to livereload and other
	watch: [ 
		'./sass/**' 
	]
})

// collect your js
quick.js({
	browserify: true, // plugin for require() file like in node.js
	minify: true, // working with browserify
	main: './js/index.js', // main output file 
	dist: './dist', // output js
	
	// watch to livereload and auto collect js
	watch: [
		'./js/**'
	]
})

// Important. Run gulp
quick.run();

```
