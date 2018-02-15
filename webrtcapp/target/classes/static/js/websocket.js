var stompClient = null;
var socket = new SockJS('/webrtcapi-websocket');
stompClient = Stomp.over(socket);
stompClient.connect({}, function(frame) {
    stompClient.subscribe('/user/queue/messages', function(message) {
        $.ajax({
            type: 'GET',
            url: 'https://192.168.0.110:8090/api/user?login=' + JSON.parse(message.body).sender,
            success: function(response) {
                var msg = JSON.parse(message.body);
                msg.sender = response.name;
                onMessage(msg);
            },
            error: function() {
                alert('On WebSocket message error :(');
            }
        });
    });
});

function sendWebSocketMessage(message) {
    $.ajax({
        type: 'GET',
        url: 'https://192.168.0.110:8090/api/user?name=' + message.recipient,
        success: function(response) {
            message.recipient = response.login;
            stompClient.send("/app/chat", {}, JSON.stringify(message));
        },
        error: function() {
            alert('Send WebSocket message error :(');
        }
    });
}

function onMessage(msg) {
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
            //herere
            setupConnection();
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

function clearTalk() {
    disconnect();
    stream.getTracks().forEach(element => {
        element.stop();
    });
    delete connectionsDict[recipient];
    remoteVideo = null;
    localVideo = null;
    singleMode = null;
    init = null;
    recipient = null;
    location.reload();
}

function sendWebSocketGroupMessage(address, message) {
    stompClient.send(address, {}, JSON.stringify(message));
}

function onGroupMessage(message) {
    $.ajax({
        type: 'GET',
        url: 'https://192.168.0.110:8090/api/user?login=' + JSON.parse(message.body).sender,
        success: function(response) {
            var msg = JSON.parse(message.body);
            msg.sender = response.name;
            if (msg.sender !== localStorage.getItem('name')) {
                sender = localStorage.getItem('login');
                switch (msg.type) {
                    case "joinedGroup":
                        init = false;
                        recipient = msg.sender;
                        singleMode = false;
                        //herere
                        setupConnection();
                        sendWebSocketMessage({
                            type: "initializeRequest",
                            recipient: msg.sender,
                            sender: sender,
                            data: null
                        });
                        break;
                    case "leftGroup":
                        if (sender !== recipient) {
                            yourConn = connectionsDict[recipient];
                            disconnect();
                            document.getElementById("videoDiv").removeChild(remoteVideosDict[recipient]);
                            delete connectionsDict[recipient];
                            delete remoteVideosDict[recipient];
                        } else {
                            for (var key in connectionsDict) {
                                yourConn = connectionsDict[key];
                                disconnect();
                            }
                        }
                        break;
                }
            }
        },
        error: function() {
            alert('Send WebSocket message error :(');
        }
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