var localVideo;
var remoteVideo;

var recipient;
var sender = localStorage.getItem("login");

var yourConn;
var dataChannel;

var init;

function setRecipient(name) {
    recipient = name;
}

function setupConnection() {
    localVideo = document.getElementById('localVideo');
    remoteVideo = document.getElementById('remoteVideo');
    sender = localStorage.getItem("login");
    if (navigator.userAgent.indexOf("Chrome") != -1) {
        sender = localStorage.getItem("login");
        navigator.webkitGetUserMedia({ video: true, audio: true }, function(myStream) {
            initConnection(myStream)
        }, function(error) {
            console.log(error);
        });
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        sender = "qwe";
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
    yourConn = new webkitRTCPeerConnection(configuration);
    console.log("RTCPeerConnection object was created");
    yourConn.addStream(stream);

    yourConn.onaddstream = function(e) {
        remoteVideo.src = window.URL.createObjectURL(e.stream);
    };

    yourConn.onicecandidate = function(event) {
        if (event.candidate) {
            sendMessage({
                type: "candidate",
                recipient: recipient,
                sender: sender,
                data: JSON.stringify(event.candidate)
            });
        }
    };
    // yourConn.oniceconnectionstatechange = e => console.log(yourConn.iceConnectionState);
    yourConn.ondatachannel = function(event) {
        dataChannel = event.channel;
        console.log('Data channel is created!');
        dataChannel.onerror = function(error) {
            console.log("Error:", error);
        };
        dataChannel.onmessage = handleMessage;
        dataChannel.onopen = function() {
            console.log("channel opened");
        };
    }

    if (init) {
        sendInvitation();
    } else {
        acceptInvitation();
    }
}

function onInitError(error) {
    console.log(error);
}

function sendMessage(message) {
    stompClient.send("/app/chat", {}, JSON.stringify(message));
}

function sendOffer() {
    yourConn.createOffer(function(offer) {
        // openDataChannel();
        sendMessage({
            type: "offer",
            recipient: recipient,
            sender: sender,
            data: JSON.stringify(offer)
        });
        yourConn.setLocalDescription(offer);
    }, function(error) {
        alert("Error when creating an offer");
    });
};

function disconnect() {
    yourConn.close();
    yourConn.onicecandidate = null;
    console.log("Disconnected");
    if (stompClient !== null) {
        stompClient.disconnect();
    }
}

function handleOffer(offer) {
    yourConn.setRemoteDescription(new RTCSessionDescription(offer));

    //create an answer to an offer 
    yourConn.createAnswer(function(answer) {
        yourConn.setLocalDescription(answer);
        sendMessage({
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
    yourConn.setRemoteDescription(new RTCSessionDescription(answer));
};

//when we got an ice candidate from a remote user 
function handleCandidate(candidate) {
    yourConn.addIceCandidate(new RTCIceCandidate(candidate));
    console.log("candidate added");
};