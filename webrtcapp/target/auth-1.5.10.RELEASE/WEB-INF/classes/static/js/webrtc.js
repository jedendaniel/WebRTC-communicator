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
    remoteVideo = document.getElementById('remoteVideo');
    videosGroup[recipient] = remoteVideo;
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
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }, function(myStream) {
            initConnection(myStream)
        }, function(error) {
            console.log(error);
        });
    }
}

function initConnection(myStream) {
    stream = myStream;
    localVideo.src = window.URL.createObjectURL(stream);

    var configuration = {
        "iceServers": [{ "url": "stun:stun2.1.google.com:19302" }]
    };
    connectionsGroup[recipient] = new webkitRTCPeerConnection(configuration, { optional: [{ RtcDataChannels: true }] });
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


    if (init) {
        dataChannelsGroup[recipient] = connectionsGroup[recipient].createDataChannel("myDataChannel", { reliable: true });
        dataChannelsGroup[recipient].onmessage = handleChatMessage;
        connectionsGroup[recipient] = connectionsGroup[recipient];
        if (singleMode) { sendInvitation(); } else {

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
        if (singleMode) { acceptInvitation(); } else {

        }
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
    dataChannelsGroup[recipient].send(newChatMessage.value);
    chatArea.value += "\n" + sender + ": " + newChatMessage.value;
    newChatMessage.value = "";
}

function handleChatMessage() {
    if (typeof event.data === 'string') {
        chatArea.value += "\n" + recipient + ": " + event.data;
        return;
        // new File([new Uint8Array(event.data)]);
    }
    // blob = new Blob([new Uint8Array(event.data)]);
    // new Flie([])
}

function sendFiles() {
    var i = 0;
    var reader = new FileReader();
    var CHUNK_LEN = 64000;
    var binaryFiles = [];
    reader.onloadend = function() {
        binaryFiles.push(reader.result);
        if (i < files.length) {
            binaryFiles.push(reader.readAsBinaryString(files[i]));
            i++;
        } else {
            for (i = 0; i < binaryFiles.length; i++) {
                var len = binaryFiles[i].length;
                var numChunks = binaryFiles[i].length / CHUNK_LEN;
                var n = binaryFiles[i].length / CHUNK_LEN;

                for (i = 0; i < n; i++) {
                    var start = i * CHUNK_LEN;
                    var end = (i + 1) * CHUNK_LEN;
                    connectionsGroup[recipient].send(binaryFiles[i].substring(start, end));
                }
                if (len % CHUNK_LEN) {
                    connectionsGroup[recipient].send(binaryFiles[i].substring(n * CHUNK_LEN));
                }
                connectionsGroup[recipient].send(binaryFiles[i]);
            }
        }
    }
    if (files.length > 0) {
        reader.readAsArrayBuffer(files[i]);
        // reader.readAsBinaryString();
        i++;
    }
}