var stompClient = null;

$(function() {
    $(document).ready(function() {
        loadHomeContent();
        displayFriendsList();
        groupName = null;
        for (var key in connectionsGroup) {
            yourConn = connectionsGroup[key];
            disconnect();
        }
        connectionsGroup = {};
        videosGroup = {};
        remoteVideo = null;
        localVideo = null;
        singleMode = null;
        init = null;
    });
});

function loadHomeContent() {
    $("#content-div").load("homeContent.html");
    checkNotifications();
}

function loadAccountContent() {
    $("#content-div").html("");
    $("#content-div").load("accountContent.html", function() { setupAccountContent(); });
}

function loadTalkContent() {
    $("#content-div").html("");
    setupTalkContent();
}

function loadFriendsContent() {
    $("#content-div").html("");
    $("#content-div").load("friendsContent.html", function() { setupFriendsContent(); });
}

function loadAboutContent() {
    $("#content-div").html("Note about app and me...");
}

function logout() {
    //     document.cookie = encodeURIComponent("JSESSIONID") + "=deleted; expires=" + new Date(0).toUTCString();
    // //    $.cookie('JSESSIONID', null, {path: '/'});
    // //    localStorage.removeItem("JSESSIONID");
    // document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //    $.ajax({
    //        type: 'POST',
    //        url: 'http://localhost:8090/logout'
    //    });
    //    window.location.href = "http://localhost:8090/";
}

function checkNotifications() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8090/api/relations?user=' + localStorage.getItem("login"),
        success: function(response) {
            var i = 0;
            response.forEach(function(element) {
                if (element.status2 === "PENDING" && element.usr2Id.name === localStorage.getItem("login")) {
                    i++;
                }
            }, this);
            if (i > 0) {
                alert("Powiadomionka (" + i + ")");
            }
        },
        error: function() {
            alert('friend list error :(');
        }
    });
}