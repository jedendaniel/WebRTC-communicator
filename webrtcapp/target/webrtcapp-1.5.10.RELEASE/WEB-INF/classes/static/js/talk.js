function setupTalkContent() {
    if (remoteVideo !== null) {
        $("#content-div").html("");
        $("#content-div").load("videoTalk.html", function() {
            document.getElementById("remoteVideo").src = remoteVideo.src;
            document.getElementById("localVideo").src = localVideo.src;
        });
    } else {
        if (Object.keys(connectionsDict).length > 0) {
            $("#content-div").html("");
            $("#content-div").load("groupTalk.html", function() {
                for (var key in remoteVideosDict) {
                    document.getElementById("videoDiv").appendChild(remoteVideosDict[key]);
                }
                document.getElementById("localVideo").src = localVideo.src;
            });
        } else {
            $("#content-div").load("talkContent.html");
        }
    }
}

function startVideoTalk() {
    recipient = document.getElementById("talkFriend").value;
    $("#content-div").html("");
    $("#content-div").load("videoTalk.html", function() {
        singleMode = true;
        init = true;
        setupConnection();
        document.getElementById('file').addEventListener('change', handleFileSelect, false);
    });
}

function acceptVideoTalk() {
    $("#content-div").html("");
    $("#content-div").load("videoTalk.html", function() {
        singleMode = true;
        init = false;
        setupConnection();
        document.getElementById('file').addEventListener('change', handleFileSelect, false);
    });
}

function handleFileSelect(evt) {
    file = document.getElementById('file').files[0];
    currentChunk = 0;
    // readNextChunk();
}

function disconnectFromTalk() {
    sendWebSocketMessage({
        type: "leave",
        recipient: recipient,
        sender: sender,
        data: null
    });
    clearTalk();
}