var stompClient = null;

$(function() {
    $(document).ready(function() {
        window.onbeforeunload = function() {
            setAvailability(0);
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
        };
        setAvailability(1);
        loadHomeContent();
        displayFriendsList();
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
        url: 'http://localhost:8090/api/users',
        data: JSON.stringify(patchData),
        success: function(response) {},
        error: function(response) {}
    });
}