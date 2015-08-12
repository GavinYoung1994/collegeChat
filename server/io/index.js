'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    
	io.on('connection', function(socket){
		console.log("a user is connected");
		socket.on('message',function(socket){
			console.log(socket);
		})
	});
    
    return io;

};
