var stompClient = null;


$(function () {
    connect();
});

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
            stompClient.subscribe('/client/response', function (greeting) {
                alert(JSON.parse(greeting.body).content);
            });
    });
}

function sendMessage(type, data) {
    var data = {
        login: "test",
        password: "test",
    };
    stompClient.send("/server/answer", {}, JSON.stringify({'type': type, 'data': JSON.stringify(data)}));
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

function sendName() {
//    var user = {
//        login: "test",
//        password: "test",
//    };
    stompClient.send("/app/hello", {}, JSON.stringify({'type': "test"}));
}
//
//function showGreeting(message) {
//    $("#greetings").append("<tr><td>" + message + "</td></tr>");
//}

//TODO: onLoad connect()