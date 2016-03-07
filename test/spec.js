'use strict';

const expect = require('chai').expect;
const quick = require('../index')


describe("gulp-quick", () => {

	beforeEach(() => {
		
	})

	it("sync", () => {
		expect(quick.sync).to.be.a('function');
		expect(quick.task).to.have.length(0);
		quick.sync(__dirname + '/e2e', [
			__dirname + '/e2e/*'
		]);
		expect(quick.task).to.have.length(1);
	});

	it('run', () => {
		quick.run();
		expect(quick.run).to.be.a('function');
	})
});



