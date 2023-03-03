var socket;
//socket = io.connect("https://test-websocket-animation.onrender.com/");
socket = io();

var settings = {
    start: 0,
    finished: 0,
    id: 0
}

socket.emit("settings", settings);
socket.on("settings", logSetting);
socket.on("canIstart", startDrawing);

function logSetting(data) {
    settings.socketid = data.socketid;
    settings.id = data.id;
    console.log(settings.id)
}

let question=setInterval(function () {
    socket.emit("canIstart", settings);
}, 500);



function startDrawing(setting) {
    settings.start = setting.start;
    console.log( "Ich starte")
    if (settings.start == 1) {
        //stop from asking server to start
        clearInterval(question);

        //get all elements with tagname circle
        //loop through array and set css property animation-name to your animation name
        //add Event Listener when animation is finished
        //send message to server 
        let collection = document.getElementsByTagName("circle");
        console.log(collection)
        for (let i = 0; i < collection.length; i++) {
            collection[i].style.animationName="rotating-circles";
            collection[i].addEventListener('animationend', (event) => {
                if (settings.finished == 0) {
                    socket.emit("next", settings);
                }
                settings.finished = 1;
            });
        }
    }


}