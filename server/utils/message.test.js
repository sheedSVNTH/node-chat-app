	//Test to verify object is what we expect

var expect = require('expect');

	//Import generateMessage function w/ ES6 destructuring
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('Should generate correct message object', () => {
		var from = 'Tim';
		var text = 'Some new message';
		var message = generateMessage(from, text);
		
		//expect(typeof message.createdAt).toBe('number'); 
		expect(message).toMatchObject({from, text});
	});
});
	
	describe('generateLocationMessage', () => {
		it('Should generate correct location object', () => {
			var from = 'AdminTest';
			var latitude = 15;
			var longitude = 20;
			var url = 'https://www.google.com/maps?q=15,20';
			var message = generateLocationMessage(from, latitude, longitude);
					
		//expect(typeof message.createdAt).toBe('number'); 
		expect(message).toMatchObject({from, url});
		});
	});
