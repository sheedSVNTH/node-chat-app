var socket = io();

socket.on('connect', function () {
	console.log('Connected to Server');	
});
			
socket.on('disconnect', function() {
	console.log('Disconnected from Server');
});

//Server-side event listener 
socket.on('newMessage', function(message) {
	console.log('New Message', message);
});

socket.emit('createMessage', {
	from: 'Frank',
	text: 'We are not hiring you anymore.'
}, function (serverData) {
	//Add acknowledge message on client-side
	console.log('Got the message.', serverData)
});

//	
//	//Client-side script that emits 'createEmail' event to server. 
//	socket.emit('createMessage', {
//	from: 'Rasheed',
//	text: 'Yeah buy some coffee please.',
//	});
