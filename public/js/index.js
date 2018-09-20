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

socket.on('newLocationMessage', function(message) {
	var li = jQuery('<li></li>');
		
	//_blank opens link in different browser tab
	var a = jQuery('<a target="_blank">My Current Location</a>');
	li.text(`${message.from}: `);
		
	//Set the href value to the url from message.js
	a.attr('href', message.url);
	li.append(a);
	jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();
	
	var messageTextbox = jQuery('[name=message]');
	socket.emit('createMessage', {
		from: 'USER',
		text: messageTextbox.val()
	}, function () {
		messageTextbox.val('')
	});
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your Browser.')
	} 
	
	locationButton.attr('disabled', 'disabled').text('Sending Location...');
	
	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled').text('Send Location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function () {
		locationButton.removeAttr('disabled').text('Send Location');
		alert('Unable to fetch location.');
	});
});

//	
//	//Client-side script that emits 'createEmail' event to server. 
//	socket.emit('createMessage', {
//	from: 'Rasheed',
//	text: 'Yeah buy some coffee please.',
//	});
