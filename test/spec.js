'use strict';

const expect = require('chai').expect;
const quick = require('../index')


describe("gulp-quick", () => {

	beforeEach(() => {
		
	})

	it("sync", () => {
		expect(quick.sync).to.be.a('function');
		expect(quick.task).to.have.length(0);
		quick.sync({
			dist: __dirname + '/e2e',
			watch: [
				__dirname + '/e2e/*.html'
			]
		});
		expect(quick.task).to.have.length(1);
	});

	it('sass', () => {
		expect(quick.sass).to.be.a('function');
		quick.sass({
			dist: __dirname + '/e2e/dist',
			watch: [
				__dirname + '/e2e/sass/**'
			]
		})
	})

	it('run', () => {
		quick.run();
		expect(quick.run).to.be.a('function');
	})
});



