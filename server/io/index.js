'use strict';
var socketio = require('socket.io');
var uuid = require('node-uuid');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);
    var waiting = {}; //player waiting to play
    var clients = {}; //all connected clients
    var rooms = {}; // Object are easier to delete obj[key]
    

	io.on('connection', function(client){
		function Room(user1, user2) {
		      this.id = uuid.v4().toString();
		      this.players = [{
		        id: user1.id
		      }, {
		        id: user2.id
		      }];
		}

		clients[client.id] = client;

		client.on('message',function(mssg){
			client.broadcast.emit('everyone', mssg);
		})

		client.on('joinPrivate', function(animal){
			waiting[animal] = client;
			if(Object.keys(waiting).length>1){
				delete waiting[animal];
				var user2 = waiting[Object.keys(waiting)[0]];
				delete waiting[Object.keys(waiting)[0]];
				var newRoom = new Room(client, user2);
        		rooms[newRoom.id] = newRoom;
        		client.join(newRoom.id);
        		client.room = newRoom.id;
        		user2.join(newRoom.id);
        		user2.room = newRoom.id;
        		setTimeout(function(){
	        		io.to(newRoom.id).emit('found', newRoom.id);
        		},1000)
        	}
		})

		client.on('private message', function(room, mssg){
			console.log(room, client.id);
			client.broadcast.to(room).emit("private response", mssg);
		})
	});
    
    return io;
};
