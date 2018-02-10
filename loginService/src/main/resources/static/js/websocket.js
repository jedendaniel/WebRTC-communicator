var stompClient = null;
var socket = new SockJS('/gs-guide-websocket');

stompClient = Stomp.over(socket);
stompClient.connect({}, function(frame) {
    // stompClient.subscribe('/topic/response', function(response) {
    //     alert(JSON.parse(response.body).content);
    // });
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
            yourConn = connectionsGroup[recipient];
            sendOffer();
            break;
        case "invitationRejected":
            alert("User does not want to talk :(");
            disconnect();
            break;
        case "offer":
            yourConn = connectionsGroup[recipient];
            handleOffer(JSON.parse(msg.data));
            break;
        case "answer":
            yourConn = connectionsGroup[recipient];
            handleAnswer(JSON.parse(msg.data));
            break;
        case "candidate":
            yourConn = connectionsGroup[recipient];
            handleCandidate(JSON.parse(msg.data));
            break;
        case "leave":
            clearTalk();
            break;
        case "groupInvitation":
            groupConfirmBox(msg);
            break;
        case "initializeRequest":
            initGroupConnection
            console.log("initializeRequest message handling")
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
    yourConn = connectionsGroup[recipient];
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