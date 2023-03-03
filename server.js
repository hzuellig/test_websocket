var express = require("express");
var totalClients = 0;
var activeScreen = 0;
var app = express();
var server = app.listen(3000);
app.use(express.static("public"));
var socket = require("socket.io");
var io = socket(server);
io.sockets.on("connection", newConnection);

function newConnection(socket) {

    socket.on("settings", Msg);

    function Msg(data) {

        let settings = {
            id: totalClients,
            socketid: socket.id
        }
        totalClients++;
        io.to(socket.id).emit("settings", settings);
    }

    socket.on("canIstart", Msgstart);

    function Msgstart(data) {
        if (data.id == activeScreen) {
            data.start = 1;
            io.to(socket.id).emit("canIstart", data);
        }
    }

    socket.on("next", setNext);

    function setNext(data) {
        data.visible = 0;
        io.to(socket.id).emit("next", data);
        activeScreen = activeScreen + 1;
    }


}
