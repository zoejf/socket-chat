var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	bodyParser = require('body-parser'),
	io = require('socket.io')(http);

http.listen(3000, function() {
	console.log('server started');
});

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');

//connect to socket
io.on('connection', function(socket) {
	console.log('a user connected');

	//recieve and broadcast chat messages
	socket.on('chat message', function (msg) {
		console.log('message:', msg);
		io.emit('chat message', msg);
	});

	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});

//STATIC ROUTES
app.get('/', function (req,res) {
	res.render('index');
});

