// var newPassword1;
// var newPassword2;
// var changePasswordBtn;
// var newLogin;
// var changeLoginBtn;
// var newName;
// var changeNameBtn;
// var changeAllBtn;

// var notEqualPswd;
// var emptyPswd;
// var newLoginMessage;
// var newNameMessage;

// var change;

var message;

function setupAccountContent() {
    // change = true;
    newPassword1 = document.getElementById("newPassword1");
    newPassword2 = document.getElementById("newPassword2");
    changePasswordBtn = document.getElementById("changePassword");
    newLogin = document.getElementById("newLogin");
    newName = document.getElementById("newName");
    changeLoginBtn = document.getElementById("changeLogin");
    changeNameBtn = document.getElementById("changeName");
    changeAllBtn = document.getElementById("changeAll");

    notEqualPswd = document.getElementById("notEqualPswd");
    emptyPswd = document.getElementById("emptyPswd");
    newLoginMessage = document.getElementById("newLoginMessage");
    newNameMessage = document.getElementById("newNameMessage");

    // changeLoginBtn.addEventListener('click', function() { validateLogin(true) });
    // changeNameBtn.addEventListener('click', function() { validateName(true) });
    // changePasswordBtn.addEventListener('click', function() { validatePassword(true) });
    // changeAllBtn.addEventListener('click', function() { validatePassword(false) });
}

function validatePassword() {
    if (newPassword1.value !== newPassword2.value) {
        notEqualPswd.innerText = "Passwords are not the same!";
        return false;
    } else {
        notEqualPswd.innerText = " ";
    }
    if (newPassword1.value === "" || newPassword2.value === "") {
        emptyPswd.innerText = "Field cannot be empty!";
        return false;
    } else {
        emptyPswd.innerText = " ";
        return true;
    }
};

function validateName() {
    if (newName.value === "") {
        newNameMessage.innerText = "Field cannot be empty!";
        return false;
    } else {
        newNameMessage.innerText = " ";
        return true;
    }
};

function validateLogin() {
    if (newLogin.value === "") {
        newLoginMessage.innerText = "Field cannot be empty!";
        return false;
    } else {
        newLoginMessage.innerText = " ";
        return true;
    }
};

function changePassword() {
    if (validatePassword()) {
        var patchData = [{
                login: localStorage.getItem("login")
            },
            {
                password: newPassword1
            }
        ];
        $.ajax({
            contentType: "application/json; charset=utf-8",
            type: 'PATCH',
            url: 'https://192.168.0.103:8090/api/users',
            data: JSON.stringify(patchData),
            success: function(response) {
                alert(response);
            },
            error: function(response) {
                alert(response);
            }
        });
    }
};

function changeLogin() {
    if (validateLogin()) {
        var patchData = [{
                login: localStorage.getItem("login")
            },
            {
                login: newLogin.value
            }
        ];
        $.ajax({
            contentType: "application/json; charset=utf-8",
            type: 'PATCH',
            url: 'https://192.168.0.103:8090/api/users',
            data: JSON.stringify(patchData),
            success: function(response) {
                alert(response);
                localStorage.setItem("login", newLogin.value);
                localStorage.setItem("name", newName.value);
                return false;
            },
            error: function(response) {
                alert(response.responseText);
            }
        });
    }
};

function changeName() {
    if (validateName()) {
        var patchData = [{
                login: localStorage.getItem("login")
            },
            {
                name: newName.value
            }
        ];
        $.ajax({
            contentType: "application/json; charset=utf-8",
            type: 'PATCH',
            url: 'https://192.168.0.103:8090/api/users',
            data: JSON.stringify(patchData),
            success: function(response) {
                alert(response);
            },
            error: function(response) {
                alert(response.responseText);
            }
        });
    }
};

function changeAll() {
    if (validatePassword() && validateName() && validateLogin()) {
        var patchData = [{
                login: localStorage.getItem("login")
            },
            {
                name: newName.value,
                login: newLogin.value,
                password: newPassword1.value
            }
        ];
        $.ajax({
            contentType: "application/json; charset=utf-8",
            type: 'PATCH',
            url: 'https://192.168.0.103:8090/api/users',
            data: JSON.stringify(patchData),
            success: function(response) {
                alert(response);
                localStorage.setItem("login", newLogin.value);
                localStorage.setItem("name", newName.value);
            },
            error: function(response) {
                alert(response.responseText);
            }
        });
    }
};