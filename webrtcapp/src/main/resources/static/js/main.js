var stompClient = null;

$(function() {
    $(document).ready(function() {
        setTimeout(window.close, 300000);
        window.onbeforeunload = function() {
            // setTimeout(function() { setAvailability(0); }, 200000);
            setAvailability(0);
            groupName = null;
            for (var key in connectionsDict) {
                yourConn = connectionsDict[key];
                disconnect();
            }
        };
        connectionsDict = {};
        remoteVideosDict = {};
        remoteVideo = null;
        localVideo = null;
        singleMode = null;
        init = null;
        setAvailability(1);
        loadHomeContent();
        //displayFriendsList();
    });
});

function loadHomeContent() {
    $.ajax({
        type: 'GET',
        url: 'https://192.168.0.110:8090/api/user?login=' + localStorage.getItem('login'),
        success: function(response) {
            localStorage.setItem('name', response.name);
        },
        error: function() {
            alert('Send WebSocket message error :(');
        }
    });
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


function checkNotifications() {
    $.ajax({
        type: 'GET',
        url: 'https://192.168.0.110:8090/api/relations?user=' + localStorage.getItem("login"),
        success: function(response) {
            var i = 0;
            response.forEach(function(element) {
                if (element.status2 === "PENDING" && element.usr2Id.login === localStorage.getItem("login")) {
                    i++;
                }
            }, this);
            if (i > 0) {
                alert("Unhandled notifications (" + i + ")");
            }
        },
        error: function() {
            alert('notifications error :(');
        }
    });
}

function setAvailability(value) {
    var patchData = [{
            login: localStorage.getItem("login")
        },
        {
            availability: value
        }
    ];
    $.ajax({
        contentType: "application/json; charset=utf-8",
        type: 'PATCH',
        url: 'https://192.168.0.110:8090/api/users',
        data: JSON.stringify(patchData),
        success: function(response) {},
        error: function(response) {}
    });
}