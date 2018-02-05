var groupName;

function setupGroupContent(name) {
    groupName = name //document.getElementById("groupName").value;
    $("#content-div").html("");
    $("#content-div").load("groupTalk.html", function() {
        document.getElementById('files').addEventListener('change', handleFileSelect, false);
        singleMode = false;
        sender = localStorage.getItem('login');
        stompClient.subscribe('/topic/group/' + groupName, function(response) {
            onGroupMessage(response);
        });
    });
}

function setupGroupTalk(name) {
    setupGroupContent(name);
    sendWebSocketGroupMessage(
        '/app/group/' + name, {
            type: 'joinedGroup',
            recipient: null,
            sender: sender,
            data: null
        }
    )
}

function inviteToGroup() {
    sendWebSocketMessage({
        type: "groupInvitation",
        recipient: document.getElementById("groupFriend").value,
        sender: localStorage.getItem('login'),
        data: groupName
    });
    document.getElementById("groupFriend").innerText = "";
}

function sendWebSocketGroupMessage(address, message) {
    stompClient.send(address, {}, JSON.stringify(message));
}

function onGroupMessage(message) {
    console.log("Got group message", message.body);
    var msg = JSON.parse(message.body);
    if (msg.sender !== sender) {
        sender = localStorage.getItem('login');
        switch (msg.type) {
            case "joinedGroup":
                init = false;
                recipient = msg.sender;
                singleMode = false;
                setupGroupConnection();
                sendWebSocketMessage({
                    type: "initializeRequest",
                    recipient: msg.sender,
                    sender: sender,
                    data: null
                });
                break;
            case "leftGroup":
                if (sender !== recipient) {
                    yourConn = connectionsGroup[recipient];
                    disconnect();
                    document.getElementById("videoDiv").removeChild(videosGroup[recipient]);
                    delete connectionsGroup[recipient];
                    delete videosGroup[recipient];
                } else {
                    for (var key in connectionsGroup) {
                        yourConn = connectionsGroup[key];
                        disconnect();
                    }
                }
                break;
        }
    }
}

function disconnectFromGroup() {
    stompClient.subscribe('/topic/group/' + groupName);
    sendWebSocketGroupMessage(
        '/app/group/' + groupName, {
            type: 'leftGroup',
            recipient: null,
            sender: sender,
            data: null
        }
    )
    groupName = null;
    for (var key in connectionsGroup) {
        yourConn = connectionsGroup[key];
        disconnect();
    }
    stream.getTracks().forEach(element => {
        element.stop();
    });
    // var track = stream.getTracks()[0];
    // track.stop();
    connectionsGroup = {};
    videosGroup = {};
    localVideo = null;
    singleMode = null;
    init = null;
    location.reload();
}