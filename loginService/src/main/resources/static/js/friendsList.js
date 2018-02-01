var usersNames = [];
var deleteImg = "../images/delete.bmp";
var talkImg = "../images/talk.bmp";
var blockImg = "../images/block.bmp";
var rowNumber;

getUserNames();

function createFriendButton(list, username) {
    var friendBlock = document.createElement('button');
    friendBlock.classList.add("accordion");
    friendBlock.innerText = username;

    friendBlock.addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
    list.append(friendBlock);
}

function createFriendActionPanel(friendsList, username) {
    var friendPanel = document.createElement('div');
    friendPanel.classList.add("panel");
    instertButtonWithImageIntoNewDiv(talkImg, friendPanel).addEventListener('click', function() { talkFriend(username); });
    instertButtonWithImageIntoNewDiv(blockImg, friendPanel).addEventListener('click', function() { blockFriend(username); });
    instertButtonWithImageIntoNewDiv(deleteImg, friendPanel).addEventListener('click', function() { deleteFriend(username); });
    friendsList.append(friendPanel);
}

function talkFriend(username) {

}

function blockFriend(username) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8090/api/auth/relation?user1=' + username + '&user2=' + localStorage.getItem("login"),
        success: function(relation) {
            if (relation.usr1Id.name === localStorage.getItem("login")) {
                relation.status2 = "BLOCKED";
            } else {
                relation.status1 = "BLOCKED";
            }
            $.ajax({
                contentType: "application/json; charset=utf-8",
                type: 'PATCH',
                url: 'http://localhost:8090/api/auth/relations',
                data: JSON.stringify(relation),
                success: function(response) {
                    refreshFriendsList();
                    var table = document.getElementById("blockedTable");
                    if (table !== null) {
                        if (response.status2 === "BLOCKED" && response.usr1Id.name === localStorage.getItem("login")) {
                            var row = table.insertRow(1);
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            cell1.innerHTML = response.usr2Id.name;
                            cell2.innerHTML = "<label style='color:blue;pading-left:2px;cursor:pointer;' onclick=unblock('" + response.usr1Id.name + "'," + true + "," + 1 + ")><u>unblock</u></label>";
                            i++;
                        } else if (response.status1 === "BLOCKED" && response.usr2Id.name === localStorage.getItem("login")) {
                            var row = table.insertRow(1);
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            cell1.innerHTML = response.usr1Id.name;
                            cell2.innerHTML = "<label style='color:blue;pading-left:2px;cursor:pointer;' onclick='unblock(" + response.usr1Id.name + "'," + false + "," + 1 + ")><u>unblock</u></label>";
                            i++;
                        }
                    }
                },
                error: function() {
                    alert("Blocking error2")
                }
            });
        },
        error: function() {
            alert("Blocking error1")
        }
    });
}

function deleteFriend(username) {
    var relation = {
        usr1Id: {
            login: localStorage.getItem("login")
        },
        usr2Id: {
            name: username
        }
    };

    $.ajax({
        contentType: "application/json; charset=utf-8",
        type: 'DLETE',
        url: 'http://localhost:8090/api/auth/relations',
        data: JSON.stringify(relation),
        success: function() {
            var table = document.getElementById("sentTable");
            var row = table.insertRow(i);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = element.usr1Id.name;
            cell2.innerHTML = "PENDING";
        },
        error: function() {
            alert('User does not exist or blocked you :(');
        }
    });
}

function instertButtonWithImageIntoNewDiv(src, element, eve, ) {
    var imgDiv = document.createElement('div');
    imgDiv.classList.add("friendActionDiv");
    element.append(imgDiv);
    var imgButton = document.createElement('button');
    imgButton.classList.add("friendActionButton");
    imgButton.style["background-image"] = "url(" + src + ")";
    imgDiv.append(imgButton);
    return imgButton;
}

function fillFriendsTable() {
    getUserNames();
    var friends = document.getElementsByClassName("fblock");
    if (friends.length > 0) {
        friends[0].classList.add("active");
    }
}

function getUserNames() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8090/api/auth/relations?user=' + localStorage.getItem("login"),
        success: function(response) {
            usersNames = response;
            displayFriendsList();
        },
        error: function() {
            alert('friend list error :(');
        }
    });
}

function displayFriendsList() {
    var friendsList = document.getElementById("friendsList");
    usersNames.forEach(element => {
        if (element.status1 === "FRIENDS" && element.status2 === "FRIENDS")
            if (element.usr1Id.name === localStorage.getItem("login")) {
                createFriendButton(friendsList, element.usr2Id.name);
                createFriendActionPanel(friendsList, element.usr2Id.name);
            } else if (element.usr2Id.name === localStorage.getItem("login")) {
            createFriendButton(friendsList, element.usr1Id.name);
            createFriendActionPanel(friendsList, element.usr1Id.name);
        }
    });
}

function cleanFriendsList() {
    var friendsList = document.getElementById("friendsList");
    while (friendsList.firstChild) {
        friendsList.removeChild(friendsList.firstChild);
    }
}

function refreshFriendsList() {
    cleanFriendsList();
    getUserNames();
}