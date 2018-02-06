var relations;

function setupFriendsContent() {
    document.getElementById("invite").addEventListener('click', function() { sendInvitation(); });
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8090/api/relations?user=' + localStorage.getItem("login"),
        success: function(response) {
            relations = response;
            loadWaitingTable();
            loadSentTable();
            loadBlockedTable();
        },
        error: function() {
            alert('friend list error :(');
        }
    });
}

function sendInvitation() {
    var relation = {
        usr1Id: {
            login: localStorage.getItem("login")
        },
        usr2Id: {
            name: document.getElementById("friendName").value
        },
        status1: "SENT",
        status2: "PENDING"
    };

    $.ajax({
        contentType: "application/json; charset=utf-8",
        type: 'POST',
        url: 'http://localhost:8090/api/relations',
        data: JSON.stringify(relation),
        success: function() {
            var table = document.getElementById("sentTable");
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = document.getElementById("friendName").value;
            cell2.innerHTML = "PENDING";
        },
        error: function() {
            alert('User does not exist or blocked you :(');
        }
    });
}

function loadWaitingTable() {
    var i = 1;
    relations.forEach(function(element) {
        if (element.status2 === "PENDING" && element.usr2Id.name === localStorage.getItem("login")) {
            var table = document.getElementById("waitingTable");
            var row = table.insertRow(i);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = element.usr1Id.name;
            var actions = "  <label style='color:blue;pading-left:2px;pading-right:4px;cursor:pointer;' onclick=accept('" + element.usr1Id.name + "'," + i + ")><u>accept</u></label>";
            actions += "   <label style='color:blue;cursor:pointer;' onclick=reject('" + element.usr1Id.name + "'," + i + ")><u>reject</u></label>";
            cell2.innerHTML = actions;
            i++;
        }
    }, this);
}

function loadSentTable() {
    var i = 1;
    relations.forEach(function(element) {
        if (element.status1 === "SENT" && element.usr1Id.name === localStorage.getItem("login")) {
            var table = document.getElementById("sentTable");
            var row = table.insertRow(i);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = element.usr2Id.name;
            cell2.innerHTML = element.status2;
            i++;
        }
    }, this);
}

function loadBlockedTable() {
    var i = 1;
    relations.forEach(function(element) {
        if (element.status2 === "BLOCKED" && element.usr1Id.name === localStorage.getItem("login")) {
            var table = document.getElementById("blockedTable");
            var row = table.insertRow(i);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = element.usr2Id.name;
            cell2.innerHTML = "<label style='color:blue;pading-left:2px;cursor:pointer;' onclick=unblock('" + element.usr1Id.name + "'," + true + "," + i + ")><u>unblock</u></label>";
            i++;
        } else if (element.status1 === "BLOCKED" && element.usr2Id.name === localStorage.getItem("login")) {
            var table = document.getElementById("blockedTable");
            var row = table.insertRow(i);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = element.usr1Id.name;
            cell2.innerHTML = "<label style='color:blue;pading-left:2px;cursor:pointer;' onclick='unblock(" + element.usr1Id.name + "'," + false + "," + i + ")><u>unblock</u></label>";
            i++;
        }
    }, this);
}

function accept(user, i) {
    var relation = {
        usr1Id: {
            name: user
        },
        usr2Id: {
            login: localStorage.getItem("login")
        },
        status1: "FRIENDS",
        status2: "FRIENDS"
    };

    $.ajax({
        contentType: "application/json; charset=utf-8",
        type: 'PATCH',
        url: 'http://localhost:8090/api/relations',
        data: JSON.stringify(relation),
        success: function() {
            document.getElementById("waitingTable").deleteRow(i);
            refreshFriendsList();
        },
        error: function() {
            alert('error while accepting');
        }
    });
}

function reject(user, i) {
    var relation = {
        usr1Id: {
            name: user
        },
        usr2Id: {
            login: localStorage.getItem("login")
        },
        status1: "SENT",
        status2: "REJECTED"
    };

    $.ajax({
        contentType: "application/json; charset=utf-8",
        type: 'PATCH',
        url: 'http://localhost:8090/api/relations',
        data: JSON.stringify(relation),
        success: function() {
            document.getElementById("waitingTable").deleteRow(i);
        },
        error: function() {
            alert('error while rejecting');
        }
    });
}

function unblock(user, meFirsInRelation, i) {
    var relation;
    if (meFirsInRelation === true) {
        relation = {
            usr1Id: {
                login: localStorage.getItem("login")
            },
            usr2Id: {
                name: user
            },
            status1: "FRIENDS",
            status2: "FRIENDS"
        };
    } else {
        relation = {
            usr1Id: {
                name: user
            },
            usr2Id: {
                login: localStorage.getItem("login")
            },
            status1: "FRIENDS",
            status2: "FRIENDS"
        };
    }

    $.ajax({
        contentType: "application/json; charset=utf-8",
        type: 'PATCH',
        url: 'http://localhost:8090/api/relations',
        data: JSON.stringify(relation),
        success: function() {
            alert('accepted');
            document.getElementById("blockedTable").deleteRow(i);
        },
        error: function() {
            alert('error while unblocking');
        }
    });
}

function sentInvitation() {

}