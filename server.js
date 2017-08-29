var express = require('express'),
    app = express(),
    http = require('http'),
    socketIO = require('socket.io'),
    server,
    io,
    sockets = [];

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

server = http.Server(app);
server.listen(5000);

io = socketIO(server);

io.on('connection', function (socket) {
    sockets.push(socket);
    socket.on('message', function (message) {
        for (var i = 0; i < sockets.length; i++) {
            sockets[i].send(message);
        }
    });
    socket.on('disconnect', function () {
        for (var i = 0; i < sockets.length; i++) {
            if (sockets[i].id === socket.id) {
                sockets .splice(i, 1);
            }
        }
        console.log('The socket disconnected');
    });
});
