var stompClient = null;
var socket = new SockJS('/gs-guide-websocket');

stompClient = Stomp.over(socket);
stompClient.connect({}, function(frame) {
    stompClient.subscribe('/topic/response', function(response) {
        alert(JSON.parse(response.body).content);
    });
    stompClient.subscribe('/user/queue/messages', function(message) {
        onMessage(message);
    });
});