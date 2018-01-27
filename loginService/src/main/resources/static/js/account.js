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

    changeLoginBtn.addEventListener('click', function() { validateLogin(true) });
    changeNameBtn.addEventListener('click', function() { validateName(true) });
    changePasswordBtn.addEventListener('click', function() { validatePassword() });
    changeAllBtn.addEventListener('click', function() { validateAll() });
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
                login: localStorage.getItem("login")
            },
            {
                password: newPassword1
            }
        ];
        $.ajax({
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            type: 'PATCH',
            url: 'http://localhost:8090/api/auth/users',
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
    var patchData = [{
            login: localStorage.getItem("login")
        },
        {
            login: newLogin.value
        }
    ];
    $.ajax({
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: 'PATCH',
        url: 'http://localhost:8090/api/auth/users',
        data: JSON.stringify(patchData),
        success: function() {
            alert('Account has been updated :)');
        },
        error: function() {
            alert('error :(');
        }
    });
};

function validateLogin(one) {
    if (newLogin.value === "") {
        newLoginMessage.innerText = "Field cannot be empty!";
        return false;
    } else {
        newLoginMessage.innerText = " ";
    }
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8090/api/auth/user?login=' + newLogin.value,
        success: function() {
            newLoginMessage.innerText = "Login is already in use";
            return false;
        },
        error: function() {
            newLoginMessage.innerText = " ";
            if (one) changeLogin();
        }
    });
    return true;
};

function changeName() {
    var patchData = [{
            login: localStorage.getItem("login")
        },
        {
            name: newName.value
        }
    ];
    $.ajax({
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: 'PATCH',
        url: 'http://localhost:8090/api/auth/users',
        data: JSON.stringify(patchData),
        success: function() {
            alert('Account has been updated :)');
        },
        error: function() {
            alert('error :(');
        }
    });
};

function validateName(one) {
    if (newName.value === "") {
        newNameMessage.innerText = "Field cannot be empty!";
        return false;
    } else {
        newNameMessage.innerText = " ";
    }
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8090/api/auth/user?name=' + newName.value,
        success: function() {
            newNameMessage.innerText = "Name is already in use";
            return false;
        },
        error: function() {
            newNameMessage.innerText = " ";
            if (one) changeName();
        }
    });
    return true;
};

function validateAll() {
    if ((validateName(false) + validateLogin(false) + validatePassword()) === 3) {
        changeAll();
    }
}

function changeAll() {
    var patchData = {
        name: newName,
        login: newLogin,
        password: newPassword1
    };
    $.ajax({
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: 'PATCH',
        url: 'http://localhost:8090/api/auth/users',
        data: JSON.stringify(patchData),
        success: function() {
            alert('Account has been updated :)');
        },
        error: function() {
            alert('error :(');
        }
    });
};