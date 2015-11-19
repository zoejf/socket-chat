$(function() {

	//connect to socket
	var socket = io();

	var $messageList = $('#messages-list');
	//compile handlebars template
	var source = $('#messages-template').html();
	var template = Handlebars.compile(source);

	// submit form to send a message
	$('#send-msg').on('submit', function (event) {
		event.preventDefault();

		//get new message from form input
		var newMsg = $('#new-msg').val();
		var username = $('#username').val();

		//send new message to socket (server)
		socket.emit('chat message', newMsg);
	});

	//recieve message from socket (server)
	socket.on('chat message', function (msg) {
		// $('#messages').append($('<li>' + msg + '</li>'));
		var messageHtml = template({ message: msg});
		console.log(messageHtml);
		$messageList.append(messageHtml);
		$('#new-msg').val("");
	});


});