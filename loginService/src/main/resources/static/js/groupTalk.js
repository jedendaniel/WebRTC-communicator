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
        }
    }
}