var connectedUser, myConnection, dataChannel;

//when a user clicks the login button
loginBtn.addEventListener("click", function(event) {
    name = loginInput.value;
    send({
        type: "login",
        name: name
    });
});

//handle messages from the server
connection.onmessage = function(message) {
    console.log("Got message", message.data);
    var data = JSON.parse(message.data);

    switch (data.type) {
        case "login":
            onLogin(data.success);
            break;
        case "offer":
            onOffer(data.offer, data.name);
            break;
        case "answer":
            onAnswer(data.answer);
            break;
        case "candidate":
            onCandidate(data.candidate);
            break;
        default:
            break;
    }
};

//when a user logs in
function onLogin(success) {

    if (success === false) {
        alert("oops...try a different username");
    } else {
        //creating our RTCPeerConnection object
        var configuration = {
            "iceServers": [{ "urls": "stun:stun.1.google.com:19302" }]
        };

        myConnection = new webkitRTCPeerConnection(configuration, {
            optional: [{ RtpDataChannels: true }]
        });
        //ondatachannel is defined a bit later, commented out this line.
        //myConnection.ondatachannel = event => dataChannel = event.channel;
        console.log("RTCPeerConnection object was created");
        console.log(myConnection);

        //setup ice handling
        //when the browser finds an ice candidate we send it to another peer
        myConnection.onicecandidate = function(event) {

            if (event.candidate) {
                send({
                    type: "candidate",
                    candidate: event.candidate
                });
            }
        };
        myConnection.oniceconnectionstatechange = e => console.log(myConnection.iceConnectionState);
        myConnection.ondatachannel = function(ev) {
            console.log('Data channel is created!');
            ev.channel.onopen = function() {
                console.log('Data channel is open and ready to be used.');
            };
        }
    }
};

connection.onopen = function() {
    console.log("Connected");
};

connection.onerror = function(err) {
    console.log("Got error", err);
};

// Alias for sending messages in JSON format
function send(message) {
    if (connectedUser) {
        message.name = connectedUser;
    }

    connection.send(JSON.stringify(message));
};

//setup a peer connection with another user
connectToOtherUsernameBtn.addEventListener("click", function() {

    var otherUsername = otherUsernameInput.value;
    connectedUser = otherUsername;

    if (otherUsername.length > 0) {
        //Create channel before sending the offer
        openDataChannel();
        //make an offer
        myConnection.createOffer(function(offer) {
            send({
                type: "offer",
                offer: offer
            });

            myConnection.setLocalDescription(offer);
        }, function(error) {
            alert("An error has occurred.:", error);
        });
    }
});

//when somebody wants to call us
function onOffer(offer, name) {
    connectedUser = name;
    myConnection.setRemoteDescription(new RTCSessionDescription(offer));

    myConnection.createAnswer(function(answer) {
        myConnection.setLocalDescription(answer);
        send({
            type: "answer",
            answer: answer
        });

    }, function(error) {
        alert("oops...error: ", error);
    });
}

//when another user answers to our offer
function onAnswer(answer) {
    myConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

//when we got ice candidate from another user
function onCandidate(candidate) {
    myConnection.addIceCandidate(new RTCIceCandidate(candidate));
    console.log("candidate added");
}

//creating data channel
function openDataChannel() {

    var dataChannelOptions = {
        reliable: true
    };
    dataChannel = myConnection.createDataChannel("myDataChannel", dataChannelOptions);
    console.log("Channel created");

    dataChannel.onerror = function(error) {
        console.log("Error:", error);
    };

    dataChannel.onmessage = function(event) {
        console.log("new message received");
        console.log("Got message:", event.data);
    };
    dataChannel.onopen = function() {
        console.log("channel opened");
    };
}


//when a user clicks the send message button
sendMsgBtn.addEventListener("click", function(event) {
    console.log("send message");
    var val = msgInput.value;
    dataChannel.send(val);
});