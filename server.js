var net = require('net');
var S = require('string');

var clients = [];
var total = 0;
 
net.createServer(function (socket) {

	clients.push(socket);

	var id = clients.length -1;
	var name = 'User ' + (++total);
	
	socket._name = name;
	 
	clients.forEach(function (client) {

		client.write(name+' Connected\n');

	});
	 
	socket.on('data', function (data) {

		// Ejemplo de comando
		var resp = "";
		if (S(data).trim().startsWith('/n ')) {
			name = S(data).trim().strip('/n ').s;
			socket._name = name;
			resp = "name changed to: " + name + '\n';
		}

		clients.forEach(function (client) {

        	if (client._name !== name) 
        		client.write( name + ': ' + data);
        	else
        		client.write(resp);

		});
	});
	 
	socket.on('end', function () {

			clients.splice(id, 1);
			clients.forEach(function (client) {
			client.write(name+' Disconnected\n');

		});
	});

}).listen(6000);