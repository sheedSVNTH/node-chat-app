var socket = io();

socket.on('connect', function () {
	console.log('Connected to Server');	
});
			
socket.on('disconnect', function() {
	console.log('Disconnected from Server');
});

//Server-side event listener 
socket.on('newMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#message-template').html();
	// Mustache takes template you want to render
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});
	
	jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#location-message-template').html();
	// Mustache takes template you want to render
	var html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	});
	
	jQuery('#messages').append(html);
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
