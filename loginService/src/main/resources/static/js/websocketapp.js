var stompClient = null;

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/response', function (response) {
                alert(JSON.parse(response.body).content);
            });
            stompClient.subscribe('/user/queue/messages', function(message) {
                alert(JSON.parse(message.body).content);
            });
    });
}

function sendMessage() {
    var recipient = document.getElementById("chatFriend").value;
    var recipient2 = $('#chatFriend').value;
    stompClient.send("/app/chat", {}, JSON.stringify({
        'type': "test",
        'recipient': recipient,
        'message' : JSON.stringify({'m':"message"})
      }));

//    var data = {
//        login: "test",
//        password: "test",
//    };
//    stompClient.send("/app/message", {}, JSON.stringify({'type': "type", 'data': JSON.stringify(data)}));
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
    stompClient.send("/app/message", {}, JSON.stringify({'type': "test"}));
}
//
//function showGreeting(message) {
//    $("#greetings").append("<tr><td>" + message + "</td></tr>");
//}

//$(function () {
//    $( "#connect" ).click(connect());
////    $( "#disconnect" ).click(function() { disconnect(); });
//    $( "#send" ).click(sendMessage());
//});