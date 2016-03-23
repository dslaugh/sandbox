var expect = require('chai').expect;
var ColorConverter = require('../color_converter');

describe('Testing rgbToXYZ', function() {
	it('should return an array', function() {
		var actual = ColorConverter.rgbToXYZ();
		expect(actual).to.be.an('object');
	});

	it('should covert rgb to XYZ', function() {
		var actual = ColorConverter.rgbToXYZ(255, 0, 0);
		var expected = {x: 41.24, y: 21.26, z: 1.93};
		expect(actual).to.eql(expected);
	});
});