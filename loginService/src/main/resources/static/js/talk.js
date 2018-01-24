function setupTalkContent() {
    // TODO: things like names sugestions or checking if user or group exist.
}

function startVideoTalk() {
    $("#content-div").html("");
    $("#content-div").load("videoTalk.html", function() {
        setRecipient($("#talkFriend").value);
        connect();
        initConnection();
    });
}