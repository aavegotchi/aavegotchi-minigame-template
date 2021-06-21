require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
import { Socket } from 'socket.io';
const server = require('express')();

const https = process.env.NODE_ENV === "production"
  ? require('https').createServer()
  : require('http').createServer(server);

const io = require('socket.io')(https, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 443;

const connectedGotchis = {};

io.on('connection', function (socket: Socket) {
    const userId = socket.id;

    console.log('A user connected: ' + userId);
    connectedGotchis[userId] = {id: userId};

    socket.on('handleDisconnect', () => {
      socket.disconnect();
    })

    socket.on('setGotchiData', (gotchi) => {
      connectedGotchis[userId].gotchi = gotchi;
    })

    socket.on('disconnect', function () {
      console.log('A user disconnected: ' + userId);
      delete connectedGotchis[userId];
    });
});

https.listen(port, function () {
    console.log(`Listening on - PORT:${port}`);
});

