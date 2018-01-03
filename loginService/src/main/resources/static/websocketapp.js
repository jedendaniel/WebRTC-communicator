var stompClient = null;


$(function () {
    connect();
});

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/websocket/messages', function (response) {
            alert("Response: " + response);
        });
    });
    sendMessage("login", localStorage.getItem("login"));
}

function sendMessage(type, data) {
    stompClient.send("/app/message", {}, JSON.stringify({'type': type, 'data': data}));
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

//function sendName() {
//    stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
//}
//
//function showGreeting(message) {
//    $("#greetings").append("<tr><td>" + message + "</td></tr>");
//}

//TODO: onLoad connect()