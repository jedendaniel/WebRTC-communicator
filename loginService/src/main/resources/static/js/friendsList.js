var usersNames = [];
var deleteImg = "../images/delete.bmp";
var talkImg = "../images/talk.bmp";
var blockImg = "../images/block.bmp";

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

function createFriendActionPanel(friendsList) {
    var friendPanel = document.createElement('div');
    friendPanel.classList.add("panel");
    instertButtonWithImageIntoNewDiv(talkImg, friendPanel);
    instertButtonWithImageIntoNewDiv(blockImg, friendPanel);
    instertButtonWithImageIntoNewDiv(deleteImg, friendPanel);
    friendsList.append(friendPanel);
}


function instertButtonWithImageIntoNewDiv(src, element) {
    var imgDiv = document.createElement('div');
    imgDiv.classList.add("friendActionDiv");
    element.append(imgDiv);
    var imgButton = document.createElement('button');
    imgButton.classList.add("friendActionButton");
    imgButton.style["background-image"] = "url(" + src + ")";
    imgDiv.append(imgButton);
}

function fillFriendsTable() {
    getUserNames();
    usersNames.forEach(element => {
        createFriendElement(element);
    });
    var friends = document.getElementsByClassName("fblock");
    if (friends.length > 0) {
        friends[0].classList.add("active");
    }
}

function getUserNames() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8090/api/auth/relations?user=' + "asd",
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
        if (element.status1 === "FRIENDS")
            if (element.usr1Id.name === "asd") {
                createFriendButton(friendsList, element.usr2Id.name);
                createFriendActionPanel(friendsList);
            } else if (element.usr2Id.name === "asd") {
            createFriendButton(friendsList, element.usr1Id.name);
            createFriendActionPanel(friendsList);
        }
    });
}