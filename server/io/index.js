'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    
	io.on('connection', function(socket){
		socket.on('message',function(mssg){
			socket.broadcast.emit('everyone', mssg);
		})
	});
    
    return io;
};
