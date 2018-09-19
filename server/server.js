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
	
	//Server Event emiter to client-side
	socket.emit('newMessage', {
		from: "Jimena",
		text: "Hey, what time do you want to go to Starbucks?",
		createAt: 123123
	});
	
	//Custom Event listener for 'createMessage' event 
	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
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