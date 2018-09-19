const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

	//Call to Express
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New User Connected');
				
			//Greeting the individual user
	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the Chat App.',
		createdAt: new Date().getTime()
	});
		
			//Alert everyother user except the one that joined. 
	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New User Joined',
		createdAt: new Date().getTime()
	});
	
	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
				//io.emit used to emit to every connection
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});
	});
	
	socket.on('disconnect', () => {
		console.log('Server.js - CLIENT DISCONNECTED');
	});
});

//EMPYT COMMENT   		console.log('Server.js - CLIENT DISCONNECTED');

	//Local Port 3000 set-up
server.listen(port, () => {
	console.log(`SERVER IS RUNNING ON PORT: ${port}`);
});









//	//Custom Event listener for 'createMessage' event 
//	socket.on('createMessage', (message) => {
//		console.log('createMessage', message);

//	//Event emiter to client-side from server
//	socket.emit('newEmail', {
//		from: "jimena@example.com",
//		text: "Hey, what time do you want to go to Starbucks?",
//		createAt: 123
//	});
//	
//	//Custom Event listener for 'createEmail' event 
//	socket.on('createEmail', (newEmail) => {
//		console.log('createEmail', newEmail);
//	});

//	//Server Event emiter to client-side. Emits only to a single connection
//	socket.emit('newMessage', {
//		from: "Jimena",
//		text: "Hey, what time do you want to go to Starbucks?",
//		createAt: 123123
//	});