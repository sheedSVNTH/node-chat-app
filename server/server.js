const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
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
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to The Chat App'));
		
			//Alert everyother user except the one that joined. 
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));
	
	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			callback('Name and room name are required.');
		}
		
		callback();
	});
	
	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);
		//io.emit used to emit to every connection
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
		//When we call callback, it communicates function at client-side for the acknowledgement message.
	});
	
	socket.on('createLocationMessage',  (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('ADMIN', coords.latitude, coords.longitude));
	});
	
	socket.on('disconnect', () => {
		console.log('Server.js - CLIENT DISCONNECTED');
	});
});

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