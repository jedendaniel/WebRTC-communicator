var stompClient = null;

$(function() {
    $(document).ready(function() {
        loadHomeContent();
        displayFriendsList();
    });
});

function loadHomeContent() {
    $("#content-div").load("homeContent.html");
}

function loadAccountContent() {
    $("#content-div").html("");
    $("#content-div").load("accountContent.html", function() { setupAccountContent() });
}

function loadTalkContent() {
    $("#content-div").html("");
    $("#content-div").load("talkContent.html", function() { setupTalkContent() });
}

function loadFriendsContent() {
    $("#content-div").html("");
    $("#content-div").load("friendsContent.html", function() { setupFriendsContent() });
}

function loadAboutContent() {
    $("#content-div").html("Note about app and me...");
}

function logout() {
    localStorage.removeItem("login");
    window.location.href = "http://localhost:8090/index.html";
}