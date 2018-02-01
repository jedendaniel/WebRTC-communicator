function setupTalkContent() {
    // TODO: things like names sugestions or checking if user or group exist.
}

function startVideoTalk() {
    setRecipient(document.getElementById("talkFriend").value);
    $("#content-div").html("");
    $("#content-div").load("videoTalk.html", function() {
        init = true;
        setupConnection();
    });
}

function acceptVideoTalk() {
    $("#content-div").html("");
    $("#content-div").load("videoTalk.html", function() {
        init = false;
        setupConnection();
    });
}