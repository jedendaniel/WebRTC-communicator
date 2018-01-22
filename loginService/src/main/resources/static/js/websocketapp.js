var stompClient = null;

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/response', function (response) {
                alert(JSON.parse(response.body).content);
            });
            stompClient.subscribe('/user/queue/messages', function(message) {
                onMessage(message);
            });
    });
}

function sendMessage() {
    var recipient = document.getElementById("chatFriend").value;
    var message = JSON.stringify({
                        'm':"message",
                        'e':"dlsaksa"
                        });
    var data = JSON.stringify({
                       'type': "test",
                       'recipient': recipient,
                       'message' :message
                       });
    stompClient.send("/app/chat", {}, data);

//    var data = {
//        login: "test",
//        password: "test",
//    };
//    stompClient.send("/app/message", {}, JSON.stringify({'type': "type", 'data': JSON.stringify(data)}));
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

function onMessage(message){
    console.log("Got message", message.data);
    var data = JSON.parse(message.data);

    switch (data.type) {
        case "login":
//            handleLogin(data.success);
            handleLogin(true);
            break;
            //when somebody wants to call us
        case "offer":
//            handleOffer(data.offer, data.name);
            break;
        case "answer":
//            handleAnswer(data.answer);
            break;
            //when a remote peer sends an ice candidate to us
        case "candidate":
//            handleCandidate(data.candidate);
            break;
        case "leave":
//            handleLeave();
            break;
        default:
            break;
    }
};

var localVideo = document.querySelector('#localVideo');
var remoteVideo = document.querySelector('#remoteVideo');

function handleLogin(success) {

    if (success === false) {
        alert("Ooops...try a different username");
    } else {

        navigator.webkitGetUserMedia({ video: true, audio: true }, function(myStream) {
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
                    send({
                        type: "candidate",
                        candidate: event.candidate
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

        }, function(error) {
            console.log(error);
        });
    }
};