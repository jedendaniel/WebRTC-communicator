var relations;

function setupFriendsContent() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8090/api/relations?user=' + "asd",
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
        if (element.status2 === "PENDING" && element.usr2Id.name === "asd") {
            var table = document.getElementById("waitingTable");
            var row = table.insertRow(i);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = element.usr1Id.name;
            var actions = "  <q style='color:blue;pading-left:2px;pading-right:4px;cursor:pointer;' onclick='accept('" + element.usr1Id.name + "');'><u>accept</u></q>";
            actions += "   <q style='color:blue;cursor:pointer;' onclick='reject('" + element.usr1Id.name + "');'><u>reject</u></q>";
            cell2.innerHTML = actions;
            i++;
        }
    }, this);
    // if (i > 1) {
    //     var friendsMenu = $("#friendsMenu");
    //     friendsMenu.innerText.append(" (" + i - 1 + ")");
    //     friendsMenu.innerText.style.color = "#fe11";
    // }
}

function loadSentTable() {
    var i = 1;
    relations.forEach(function(element) {
        if (element.status1 === "SENT" && element.usr1Id.name === "asd") {
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
        if (element.status1 === "BLOCKED" && element.usr1Id.name === "asd") {
            var table = document.getElementById("sentTable");
            var row = table.insertRow(i);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = element.usr2Id.name;
            cell2.innerHTML = "<q style='color:blue;pading-left:2px;cursor:pointer;' onclick='unblock('" + element.usr1Id.name + "');'><u>unblock</u></q>";
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