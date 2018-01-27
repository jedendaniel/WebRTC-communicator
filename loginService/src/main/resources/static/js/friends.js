var relations;

function setupFriendsContent() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8090/api/auth/relations?user=' + localStorage.getItem("login"),
        success: function(response) {
            relations = response;
            loadWaitingTable();
        },
        error: function() {
            alert('friend list error :(');
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
            var actions = "  <label style='color:blue;pading-left:2px;pading-right:4px;cursor:pointer;' onclick='accept('" + element.usr1Id.name + "');'><u>accept</u></label>";
            actions += "   <label style='color:blue;cursor:pointer;' onclick='reject('" + element.usr1Id.name + "');'><u>reject</u></label>";
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
        if (element.status1 === "BLOCKED" && element.usr1Id.name === localStorage.getItem("login")) {
            var table = document.getElementById("sentTable");
            var row = table.insertRow(i);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = element.usr2Id.name;
            cell2.innerHTML = "<label style='color:blue;pading-left:2px;cursor:pointer;' onclick='unblock('" + element.usr1Id.name + "');'><u>unblock</u></label>";
            i++;
        }
    }, this);
}

function accept(user) {
    alert("acccccccept  " + user);
}

function reject(user) {
    alert("rejjjjjject  " + user);
}

function unblock(user) {
    alert("unnnnnblock  " + user);
}

function sentInvitation() {

}