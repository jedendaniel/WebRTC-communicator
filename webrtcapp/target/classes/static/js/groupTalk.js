var groupName;
var msg;

function setupGroupContent(name) {
    groupName = name
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
    for (var key in connectionsDict) {
        yourConn = connectionsDict[key];
        disconnect();
    }
    stream.getTracks().forEach(element => {
        element.stop();
    });
    connectionsDict = {};
    remoteVideosDict = {};
    localVideo = null;
    singleMode = null;
    init = null;
    location.reload();
}