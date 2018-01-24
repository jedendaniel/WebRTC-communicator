var stompClient = null;

var localVideo = document.getElementById('localVideo');
var remoteVideo = document.getElementById('remoteVideo');

var recipient = document.getElementById('chatFriend');
var sender = localStorage.getItem("login");

var yourConn;
var dataChannel;

function connect() {
    localVideo = document.getElementById('localVideo');
    remoteVideo = document.getElementById('remoteVideo');
    recipient = document.getElementById('chatFriend');
    //sender = localStorage.getItem("login");
    if (navigator.userAgent.indexOf("Chrome") != -1) {
        sender = "asd";
        navigator.webkitGetUserMedia({ video: true, audio: true }, function(myStream) {
            initConnection(myStream)
        }, function(error) {
            console.log(error);
        });
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        sender = "qwe";
        navigator.mozGetUserMedia({ video: true, audio: true }, function(myStream) {
            initConnection(myStream)
        }, function(error) {
            console.log(error);
        });
    }
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/response', function(response) {
            alert(JSON.parse(response.body).content);
        });
        stompClient.subscribe('/user/queue/messages', function(message) {
            onMessage(message);
        });
    });
}

function initConnection(myStream) {
    stream = myStream;

    //displaying local video stream on the page
    localVideo.src = window.URL.createObjectURL(stream);

    //using Google public stun server
    var configuration = {
        "iceServers": [{ "url": "stun:stun2.1.google.com:19302" }]
    };

    yourConn = new webkitRTCPeerConnection(configuration);
    console.log("RTCPeerConnection object was created");
    console.log(yourConn);

    // setup stream listening
    yourConn.addStream(stream);

    //when a remote user adds stream to the peer connection, we display it
    yourConn.onaddstream = function(e) {
        remoteVideo.src = window.URL.createObjectURL(e.stream);
    };

    // Setup ice handling
    yourConn.onicecandidate = function(event) {
        if (event.candidate) {
            sendMessage({
                type: "candidate",
                recipient: recipient,
                sender: sender,
                data: JSON.stringify({ candidate: event.candidate })
            });
        }
    };
    yourConn.oniceconnectionstatechange = e => console.log(yourConn.iceConnectionState);
    yourConn.ondatachannel = function(ev) {
        dataChannel = ev.channel;
        console.log('Data channel is created!');
        dataChannel.onerror = function(error) {
            console.log("Error:", error);
        };
        dataChannel.onmessage = handleMessage;
        dataChannel.onopen = function() {
            console.log("channel opened");
        };
    }
    sendOffer();
}

function onInitError(error) {
    console.log(error);
}

function sendMessage(message) {
    stompClient.send("/app/chat", {}, JSON.stringify(message));
    //    stompClient.send("/app/message", {}, JSON.stringify({'type': "type", 'data': JSON.stringify(data)}));
}

function sendOffer() {
    yourConn.createOffer(function(offer) {
        // openDataChannel();
        sendMessage({
            type: "offer",
            recipient: recipient,
            sender: sender,
            data: JSON.stringify({ offer: offer })
        });
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

function onMessage(message) {
    console.log("Got message", message.data);
    var data = JSON.parse(message.data);

    switch (data.type) {
        // case "login":
        //     //            handleLogin(data.success);
        //     handleLogin(true);
        //     break;
        //when somebody wants to call us
        case "offer":
            handleOffer(data.offer, data.name);
            break;
        case "answer":
            //            handleAnswer(data.answer);
            break;
            //when a remote peer sends an ice candidate to us
        case "candidate":
            //            handleCandidate(data.candidate);
            break;
        case "leave":
            disconnect();
            break;
        default:
            break;
    }
};

function handleOffer(offer, name) {
    connectedUser = name;
    yourConn.setRemoteDescription(new RTCSessionDescription(offer));

    //create an answer to an offer 
    yourConn.createAnswer(function(answer) {
        yourConn.setLocalDescription(answer);
        send({
            type: "answer",
            answer: answer
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