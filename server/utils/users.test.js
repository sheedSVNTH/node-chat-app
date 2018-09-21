const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
	var users;
	
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Mike',
			room: 'Node Talk'
		}, {
			id: '2',
			name: 'Rasheed',
			room: 'Gym Talk'
		}, {
			id: '3',
			name: 'Andrew',
			room: 'Node Talk'
		}];
	});

	it('Should add new user', () => {
		var users = new Users();
		var user = {
			id: '123',
			name: 'Rasheed',
			room: 'Tiger Tracker'
		};
		var resUser = users.addUser(user.id, user.name, user.room);
		expect(users.users).toEqual([user]);
	});

	it('Should remove a user with valid ID', () => {
		var userID = '1';
		var removedUser = users.removeUser(userID);
		
		expect(removedUser.id).toBe(userID);	
		expect(users.users.length).toBe(2);
	});	

	it('Should NOT remove a user with Invalid ID', () => {
		var userID = '15';
		var removedUser = users.removeUser(userID);
		
		expect(removedUser).toBe(undefined);	
		expect(users.users.length).toBe(3);
	});	

	it('Should find user by valid ID', () => {
		var userID = '2';
		var selectedUser = users.getUser(userID);
		expect(selectedUser.id).toBe(userID);
	});	
	
	it('Should NOT find user with Invalid ID', () => {
		var userID = '15';
		var selectedUser = users.getUser(userID);
		expect(selectedUser).toBe(undefined);
	});	
	
	it('Should return names for Node Talk Chatroom', () => {
		var userList = users.getUserList('Node Talk');
		expect(userList).toEqual(['Mike', 'Andrew']);
	});
	
	it('Should return names for Gym Talk Chatroom', () => {
		var userList = users.getUserList('Gym Talk');
		expect(userList).toEqual(['Rasheed']);
	});	
		

});