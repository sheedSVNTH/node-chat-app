const expect = require('expect');
const {isRealString} = require('./validation');

//import isRealString

describe('isRealString', () => {
	it('Should reject non-string values', () => {

		var res = isRealString(123);
		expect(res).toBe(false); 
	});
	
	it('Should reject string with only spaces', () => {
		var res = isRealString('  ');
		expect(res).toBe(false);  
	});
	
	it('Should allow string with non-space characters', () => {
		var res = isRealString(' Rasheed ');
		expect(res).toBe(true);  
	});
});
	

	//  should reject non-string values
	// should reject string with only spaces
	// should allow string with non-space character 