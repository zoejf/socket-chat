$(function() {

	//connect to socket
	var socket = io();

	var $messageList = $('#messages-list');
	//compile handlebars template
	var source = $('#messages-template').html();
	var template = Handlebars.compile(source);

	//will there be a scope issue with username?
	var username;
	//on submit of username form, message form and chat view appears
	$('#username').on('submit', function (event) {
		event.preventDefault();

		username = $('#username').val();
		$('#send-msg').toggle();
		$('.welcome').toggle();
	});

	// submit form to send a message
	$('#send-msg').on('submit', function (event) {
		event.preventDefault();

		//get new message from form input
		var newMsg = $('#new-msg').val();
		// var username = $('#username').val();

		//send new message to socket (server)
		socket.emit('chat message', newMsg, username);
	});

	//recieve message from socket (server)
	socket.on('chat message', function (msg, username) {
		// $('#messages').append($('<li>' + msg + '</li>'));
		var messageHtml = template({ message: msg, username: username });
		console.log(messageHtml);
		$messageList.append(messageHtml);
		$('#new-msg').val("");
		$('#username').val("");
		$('#new-msg').focus();
	});


});