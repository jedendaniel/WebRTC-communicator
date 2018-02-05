function setupTalkContent() {
    if (remoteVideo !== null) {
        $("#content-div").html("");
        $("#content-div").load("videoTalk.html", function() {
            document.getElementById("remoteVideo").src = remoteVideo.src;
            document.getElementById("localVideo").src = localVideo.src;
        });
    } else {
        if (Object.keys(connectionsGroup).length > 0) {
            $("#content-div").html("");
            $("#content-div").load("groupTalk.html", function() {
                for (var key in videosGroup) {
                    document.getElementById("videoDiv").appendChild(videosGroup[key]);
                }
                document.getElementById("localVideo").src = localVideo.src;
            });
        } else {
            $("#content-div").load("talkContent.html");
        }
    }
}

function startVideoTalk() {
    setRecipient(document.getElementById("talkFriend").value);
    $("#content-div").html("");
    $("#content-div").load("videoTalk.html", function() {
        singleMode = true;
        init = true;
        setupConnection();
        document.getElementById('files').addEventListener('change', handleFileSelect, false);
    });
}

function acceptVideoTalk() {
    $("#content-div").html("");
    $("#content-div").load("videoTalk.html", function() {
        singleMode = true;
        init = false;
        setupConnection();
        document.getElementById('files').addEventListener('change', handleFileSelect, false);
    });
}

function handleFileSelect(evt) {
    files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', escape(f.name), '</strong>',
            f.size, '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
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