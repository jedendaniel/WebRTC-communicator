function setupTalkContent() {
    // TODO: things like names sugestions or checking if user or group exist.
}

function startVideoTalk() {
    setRecipient(document.getElementById("talkFriend").value);
    $("#content-div").html("");
    $("#content-div").load("videoTalk.html", function() {
        init = true;
        setupConnection();
        document.getElementById('files').addEventListener('change', handleFileSelect, false);
    });
}

function acceptVideoTalk() {
    $("#content-div").html("");
    $("#content-div").load("videoTalk.html", function() {
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