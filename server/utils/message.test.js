	//Test to verify object is what we expect

var expect = require('expect');

	//Import generateMessage function w/ ES6 destructuring
var {generateMessage} = require('./message');

describe('generateMessage', () => {
	it('Should generate correct message object', () => {
		var from = 'Tim';
		var text = 'Some new message';
		var message = generateMessage(from, text);
		
		expect(typeof message.createdAt).toBe('number'); 
		expect(message).toMatchObject({from, text});
	});
	
});