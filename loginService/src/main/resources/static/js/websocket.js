var stompClient = null;
var socket = new SockJS('/webrtcapi-websocket');
stompClient = Stomp.over(socket);
stompClient.connect({}, function(frame) {
    stompClient.subscribe('/user/queue/messages', function(message) {
        onMessage(message);
    });
});

function sendWebSocketMessage(message) {
    stompClient.send("/app/chat", {}, JSON.stringify(message));
}

function onMessage(message) {
    console.log("Got message", message.body);
    var msg = JSON.parse(message.body);
    recipient = msg.sender;
    sender = localStorage.getItem("login");
    switch (msg.type) {
        case "invitationSent":
            confirmBox(msg.sender);
            break;
        case "invitationAccepted":
            sendOffer();
            break;
        case "invitationRejected":
            disconnect();
            break;
        case "offer":
            handleOffer(JSON.parse(msg.data));
            break;
        case "answer":
            handleAnswer(JSON.parse(msg.data));
            break;
        case "candidate":
            handleCandidate(JSON.parse(msg.data));
            break;
        case "leave":
            clearTalk();
            break;
        case "groupInvitation":
            groupConfirmBox(msg);
            break;
        case "initializeRequest":
            init = true;
            singleMode = false;
            setupGroupConnection();
            break;
        default:
            break;
    }
};

function confirmBox(sender) {
    if (confirm(sender + " invites you to talk. Do you accept invitation?")) {
        acceptVideoTalk();
    } else {
        sendWebSocketMessage({
            type: "invitationRejected",
            recipient: recipient,
            sender: sender,
            data: null
        });
    }
}

function acceptInvitation() {
    sendWebSocketMessage({
        type: "invitationAccepted",
        recipient: recipient,
        sender: sender,
        data: null
    });
}

function sendInvitation() {
    sendWebSocketMessage({
        type: "invitationSent",
        recipient: recipient,
        sender: sender,
        data: null
    });
}

function groupConfirmBox(msg) {
    if (confirm(msg.sender + " invites you to group: " + msg.data + ". Do you accept invitation?")) {
        setupGroupTalk(msg.data);
    } else {
        sendWebSocketMessage({
            type: "groupinvitationRejected",
            recipient: recipient,
            sender: sender,
            data: null
        });
    }
}

function clearTalk() {
    disconnect();
    stream.getTracks().forEach(element => {
        element.stop();
    });
    delete connectionsGroup[recipient];
    remoteVideo = null;
    localVideo = null;
    singleMode = null;
    init = null;
    recipient = null;
    location.reload();
}