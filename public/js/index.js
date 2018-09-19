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
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);
	
	jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();
	socket.emit('createMessage', {
		from: 'USER',
		text: jQuery('[name=message]').val()
	}, function () {
		
	});
});


//	
//	//Client-side script that emits 'createEmail' event to server. 
//	socket.emit('createMessage', {
//	from: 'Rasheed',
//	text: 'Yeah buy some coffee please.',
//	});
