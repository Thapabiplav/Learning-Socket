const express = require("express");
const app = express();
const { Server } = require("socket.io");

const server = app.listen(4000, () => {
  console.log("Server has started at port 4000 "); //http communciation for establishment required for socket.io
});

const io = new Server(server); // instancation of server

io.on("connection", (socket) => { //connection established huda socket auxa
  console.log("connection established");

  socket.on("dataSend", (data) => {
    console.log(data);
  });
});


