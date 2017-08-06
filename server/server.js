var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var {resolve} = require('path');
var socketio = require('socket.io');
var setupListener = require('./dataStream.js')

var server = app.listen(1337, () => console.log('listening on port 1337'));
var io = socketio(server);

setupListener(io);

// io.on('connection', function (socket) {
//     var id = socket.id
//     console.log('A new client',id, 'connected!');
//     socket.on('disconnect', function () {
//         console.log('Client:', id, 'disconnected!');
//     })
//     socket.on('aDraw', function (start, end, strokeColor) {
//         console.log(start, end, strokeColor)
//         socket.broadcast.emit('drawForEveryone', start, end, strokeColor);
//     })
// })

app.use(express.static(resolve(__dirname, '../public')));

app.get('/', function(req, res){
  res.sendFile('index.html');
});
