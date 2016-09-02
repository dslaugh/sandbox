var assert = require('chai').assert;
var UrlParser = require('../js/url_parser');

describe('url_parser', function() {
	it('pass back an object with the url and the query params', function() {
		var url = 'http://localhost:8000/?hello=world&foo=bar';
		var parsed = UrlParser.parse(url);
		assert.equal(parsed.url, 'http://localhost:8000/');
		assert.deepEqual(parsed.queryParams, {hello: 'world', foo: 'bar'});
	});
});