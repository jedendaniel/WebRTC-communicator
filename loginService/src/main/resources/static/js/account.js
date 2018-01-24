var newPassword1;
var newPassword2;
var changePasswordBtn;
var newLogin;
var changeLoginBtn;
var newName;
var changeNameBtn;
var changeAllBtn;

var notEqualPswd;
var emptyPswd;
var newLoginMessage;
var newNameMessage;

function setupAccountContent() {
    newPassword1 = document.getElementById("newPassword1");
    newPassword2 = document.getElementById("newPassword2");
    changePasswordBtn = document.getElementById("changePassword");
    newLogin = document.getElementById("newLogin");
    changeLoginBtn = document.getElementById("changeLogin");
    newName = document.getElementById("newName");
    changeNameBtn = document.getElementById("changeName");
    changeAllBtn = document.getElementById("changeAll");

    notEqualPswd = document.getElementById("notEqualPswd");
    emptyPswd = document.getElementById("emptyPswd");
    newLoginMessage = document.getElementById("newLoginMessage");
    newNameMessage = document.getElementById("newNameMessage");

    changeLoginBtn.addEventListener('click', function() { changeLogin() });
    changeNameBtn.addEventListener('click', function() { changeName() });
    changePasswordBtn.addEventListener('click', function() { changePassword() });
    changeAllBtn.addEventListener('click', function() { changeAll() });
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
    }
    return true;
};

function changePassword() {
    if (validatePassword() === true) {
        var patchData = [{
                login: "asd"
            },
            {
                password: newPassword1
            }
        ];
        $.ajax({
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            type: 'PATCH',
            url: 'http://localhost:8090/api/users',
            data: JSON.stringify(patchData),
            success: function() {
                alert('Account has been updated :)');
            },
            error: function() {
                alert('error :(');
            }
        });
    }
};

function changeLogin() {
    if (validateLogin() === true) {
        var patchData = [{
                login: "asd"
            },
            {
                login: newLogin.value
            }
        ];
        $.ajax({
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            type: 'PATCH',
            url: 'http://localhost:8090/api/users',
            data: JSON.stringify(patchData),
            success: function() {
                alert('Account has been updated :)');
            },
            error: function() {
                alert('error :(');
            }
        });
    }
};

function validateLogin() {
    if (newLogin.value === "") {
        newLoginMessage.innerText = "Field cannot be empty!";
        return false;
    } else {
        newLoginMessage.innerText = " ";
    }
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8090/api/user?login=' + newLogin.value,
        success: function() {
            newLoginMessage.innerText = "Login is already in use";
            return false;
        },
        error: function() {
            newLoginMessage.innerText = " ";
        }
    });
    return true;
};

function changeName() {
    if (validateName() === true) {
        var patchData = [{
                login: "asd"
            },
            {
                name: newName.value
            }
        ];
        $.ajax({
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            type: 'PATCH',
            url: 'http://localhost:8090/api/users',
            data: JSON.stringify(patchData),
            success: function() {
                alert('Account has been updated :)');
            },
            error: function() {
                alert('error :(');
            }
        });
    }
};

function validateName() {
    if (newName.value === "") {
        newNameMessage.innerText = "Field cannot be empty!";
        return false;
    } else {
        newNameMessage.innerText = " ";
    }
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8090/api/user?name=' + newName.value,
        success: function() {
            newNameMessage.innerText = "Name is already in use";
            return false;
        },
        error: function() {
            newNameMessage.innerText = " ";
        }
    });
    return true;
};

function changeAll() {
    if (validateName() === true && validateLogin() === true && validatePassword() === true) {
        var patchData = {
            name: newName,
            login: newLogin,
            password: newPassword1
        };
        $.ajax({
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            type: 'PATCH',
            url: 'http://localhost:8090/api/users',
            data: JSON.stringify(patchData),
            success: function() {
                alert('Account has been updated :)');
            },
            error: function() {
                alert('error :(');
            }
        });
    }
};