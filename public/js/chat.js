var socket = io();

function ScrollToBottom () {
	//Selectors
	var messages = jQuery('#messages');
	var newMessage = messages.children('li:last-child');
	//Heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();
	
	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

socket.on('connect', function () {
	var params = jQuery.deparam(window.location.search);
	
	socket.emit('join', params, function (err) {
		if (err) {
			//Send user an alert error and redirect to home.
			alert(err);
			window.location.href = '/';
		} else {
			console.log('No error.');
		}
	});
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
	ScrollToBottom();
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
	ScrollToBottom();
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
