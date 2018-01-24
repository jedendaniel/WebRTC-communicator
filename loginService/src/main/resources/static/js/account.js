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
    changeNameBtn.addEventListener('click', function() { changeLogin() });
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
        // update user
        alert("Password has been changed!");
    }
};

function changeLogin() {
    if (validateLogin() === true) {
        // update user
        alert("Login has been changed!");
    }
};

function validateLogin() {
    //validate login
    return true;
};

function changeName() {
    if (validateName() === true) {
        // update user
        alert("Name has been changed!");
    }
};

function validateName() {
    //validate name
    return true;
};

function changeAll() {
    if (validateName() === true && validateLogin() === true && validatePassword() === true) {
        // update user
        alert("Data has been updated");
    }
};