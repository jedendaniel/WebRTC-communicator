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

function onMessage(message) {
    console.log("Got message", message.body);
    var msg = JSON.parse(message.body);
    var data = JSON.parse(msg.data);
    setRecipient(msg.sender);

    switch (msg.type) {
        case "invitationSent":
            confirmBox();
            break;
        case "invitationAccepted":
            sendOffer();
            break;
        case "invitationRejected":
            disconnect();
            break;
        case "offer":
            handleOffer(data);
            break;
        case "answer":
            handleAnswer(data);
            break;
        case "candidate":
            handleCandidate(data);
            break;
        case "leave":
            disconnect();
            break;
        default:
            break;
    }
};

function confirmBox() {
    if (confirm("accept")) {
        acceptVideoTalk();
    } else {
        sendMessage({
            type: "invitationRejected",
            recipient: recipient,
            sender: sender,
            data: JSON.stringify(null)
        });
    }
}

function acceptInvitation() {
    sendMessage({
        type: "invitationAccepted",
        recipient: recipient,
        sender: sender,
        data: JSON.stringify(null)
    });
}

function sendInvitation() {
    sendMessage({
        type: "invitationSent",
        recipient: recipient,
        sender: sender,
        data: JSON.stringify(null)
    });
}