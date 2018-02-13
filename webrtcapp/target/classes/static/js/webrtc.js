var localVideo;
var remoteVideo;
var chatArea;
var newChatMessage;

var files = [];
var blob;

var recipient;
var sender = localStorage.getItem("login");

var init;
var singleMode;

function setupConnection() {
    localVideo = document.getElementById('localVideo');
    if (singleMode) {
        remoteVideo = document.getElementById('remoteVideo');
        videosGroup[recipient] = remoteVideo;
    } else {
        var newVideo = document.createElement('video');
        newVideo.className += " remoteVideo";
        document.getElementById("videoDiv").appendChild(newVideo);
        videosGroup[recipient] = newVideo;
    }
    chatArea = document.getElementById('chatArea');
    newChatMessage = document.getElementById('newChatMessage');
    sender = localStorage.getItem("login");
    if (navigator.userAgent.indexOf("Chrome") != -1) {
        sender = localStorage.getItem("login");
        navigator.webkitGetUserMedia({ video: true, audio: true }, function(myStream) {
            initConnection(myStream)
        }, function(error) {
            console.log(error);
        });
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(function(mediaStream) {
                initConnection(mediaStream);
            })
            .catch(function(err) { console.log(err.name + ": " + err.message); });
    }
}

function setupVideoStreams() {

}

function initConnection(myStream) {
    stream = myStream;
    localVideo.src = window.URL.createObjectURL(stream);

    var configuration = {
        "iceServers": [{ "url": "stun:stun2.1.google.com:19302" }]
    };
    connectionsGroup[recipient] = new RTCPeerConnection(configuration, { optional: [{ RtcDataChannels: true }] });
    console.log("RTCPeerConnection object was created");
    connectionsGroup[recipient].addStream(stream);

    connectionsGroup[recipient].onaddstream = function(e) {
        videosGroup[recipient].src = window.URL.createObjectURL(e.stream);
    };

    connectionsGroup[recipient].onicecandidate = function(event) {
        if (event.candidate) {
            sendWebSocketMessage({
                type: "candidate",
                recipient: recipient,
                sender: sender,
                data: JSON.stringify(event.candidate)
            });
        }
    };
    setupDataChannel();
}

function setupDataChannel() {
    if (init) {
        dataChannelsGroup[recipient] = connectionsGroup[recipient].createDataChannel("myDataChannel", { reliable: true });
        dataChannelsGroup[recipient].onmessage = handleChatMessage;
        if (singleMode) { sendInvitation(); } else {
            sendOffer();
        }
    } else {
        connectionsGroup[recipient].ondatachannel = function(event) {
            dataChannelsGroup[recipient] = event.channel;
            console.log('Data channel created!');
            dataChannelsGroup[recipient].onerror = function(error) {
                console.log("Error:", error);
            };
            dataChannelsGroup[recipient].onmessage = handleChatMessage;
            dataChannelsGroup[recipient].onopen = function() {
                console.log("channel opened");
            };
        }
        if (singleMode) { acceptInvitation(); }
    }
}

function onInitError(error) {
    console.log(error);
}

function sendOffer() {
    connectionsGroup[recipient].createOffer(function(offer) {
        sendWebSocketMessage({
            type: "offer",
            recipient: recipient,
            sender: sender,
            data: JSON.stringify(offer)
        });
        connectionsGroup[recipient].setLocalDescription(offer);
    }, function(error) {
        alert("Error when creating an offer");
    });
};

function disconnect() {
    connectionsGroup[recipient].close();
    connectionsGroup[recipient].onicecandidate = null;
    console.log("Disconnected");
    if (stompClient !== null) {
        stompClient.disconnect();
    }
}

function handleOffer(offer) {
    connectionsGroup[recipient].setRemoteDescription(new RTCSessionDescription(offer));

    //create an answer to an offer 
    connectionsGroup[recipient].createAnswer(function(answer) {
        connectionsGroup[recipient].setLocalDescription(answer);
        sendWebSocketMessage({
            type: "answer",
            recipient: recipient,
            sender: sender,
            data: JSON.stringify(answer)
        });
    }, function(error) {
        alert("Error when creating an answer");
    });

};

//when we got an answer from a remote user 
function handleAnswer(answer) {
    connectionsGroup[recipient].setRemoteDescription(new RTCSessionDescription(answer));
};

//when we got an ice candidate from a remote user 
function handleCandidate(candidate) {
    connectionsGroup[recipient].addIceCandidate(new RTCIceCandidate(candidate));
    console.log("candidate added");
};

function sendChatMessage() {
    // dataChannelsGroup[recipient].send(JSNO.stringify({
    //     type: chat,
    //     data: newChatMessage.value
    // }));
    for (var key in dataChannelsGroup) {
        dataChannelsGroup[key].send(JSON.stringify({
            type: 'chat',
            data: newChatMessage.value
        }));
    }
    chatArea.value += "\n" + sender + ": " + newChatMessage.value;
    newChatMessage.value = "";
}

function handleChatMessage() {
    if (typeof event.data === 'string') {
        var msg = JSON.parse(event.data);
        if (msg.type === 'chat') {
            chatArea.value += "\n" + recipient + ": " + msg.data;
            return;
        } else if (msg.type === 'file') {
            incomingFileInfo = JSON.parse(msg.data);
            startDownload(event.data);
        }
    }
    if (typeof event.data === 'object') {
        progressDownload(event.data);
    }
}

const BYTES_PER_CHUNK = 1200;
var file;
var currentChunk;
var fileInput = $('input[type=file]');
var fileReader = new FileReader();

function sendFile() {
    dataChannelsGroup[recipient].send(JSON.stringify({
        type: 'file',
        data: JSON.stringify({
            fileName: file.name,
            fileSize: file.size
        })
    }));
    readNextChunk();
}

function readNextChunk() {
    var start = BYTES_PER_CHUNK * currentChunk;
    var end = Math.min(file.size, start + BYTES_PER_CHUNK);
    fileReader.readAsArrayBuffer(file.slice(start, end));
}

fileReader.onload = function() {
    // dataChannelsGroup[recipient].send(fileReader.result);
    dataChannelsGroup[recipient].send(fileReader.result);
    currentChunk++;

    if (BYTES_PER_CHUNK * currentChunk < file.size) {
        readNextChunk();
    }
};

var incomingFileInfo;
var incomingFileData;
var bytesReceived;
var downloadInProgress = false;

function startDownload(data) {
    // incomingFileInfo = JSON.parse(data.toString());
    incomingFileData = [];
    bytesReceived = 0;
    downloadInProgress = true;
    console.log('incoming file <b>' + incomingFileInfo.fileName + '</b> of ' + incomingFileInfo.fileSize + ' bytes');
}

function progressDownload(data) {
    bytesReceived += data.byteLength;
    incomingFileData.push(data);
    console.log('progress: ' + ((bytesReceived / incomingFileInfo.fileSize) * 100).toFixed(2) + '%');
    if (bytesReceived === incomingFileInfo.fileSize) {
        endDownload();
    }
}

function endDownload() {
    downloadInProgress = false;
    var blob = new window.Blob(incomingFileData);
    var anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = incomingFileInfo.fileName;
    anchor.textContent = 'XXXXXXX';

    if (anchor.click) {
        anchor.click();
    } else {
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        anchor.dispatchEvent(evt);
    }
}