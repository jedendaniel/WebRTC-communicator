var pasword1;
var pasword2;
var notEqualPswd;
var emptyPswd;

var login;
var loginMessage;
var name;
var nameMessage;

$(function() {
    $(document).ready(function() {
        pasword1 = document.getElementById("password1");
        pasword2 = document.getElementById("password2");
        notEqualPswd = document.getElementById("notEqualPswd");
        emptyPswd = document.getElementById("emptyPswd");

        login = document.getElementById("login");
        loginMessage = document.getElementById("loginMessage");
        name = document.getElementById("name");
        nameMessage = document.getElementById("nameMessage");

        $('#createUser').on('click', function() {
            if (validatePassword() + validateLogin() + validateName() === 3) {
                createAccount();
            }
        });
    });
});

function validatePassword() {
    if (password1.value !== password2.value) {
        notEqualPswd.innerText = "Passwords are not the same!";
        return 0;
    } else {
        notEqualPswd.innerText = " ";
    }
    if (password1.value === "" || password2.value === "") {
        emptyPswd.innerText = "Field cannot be empty!";
        return 0;
    } else {
        emptyPswd.innerText = " ";
    }
    return 1;
};

function validateLogin(prevState) {
    if (login.value === "") {
        loginMessage.innerText = "Field cannot be empty!";
        return 0;
    } else {
        loginMessage.innerText = " ";
        return 1;
    }
};

function validateName(prevState) {
    if (name.value === "") {
        nameMessage.innerText = "Field cannot be empty!";
        return 0;
    } else {
        nameMessage.innerText = " ";
        return 1;
    }
};

function createAccount() {
    var user = {
        name: $('#name').val(),
        login: $('#login').val(),
        password: $('#password1').val(),
        role: "ROLE_USER",
    };

    $.ajax({
        contentType: "application/json; charset=utf-8",
        type: 'POST',
        url: 'http://localhost:8090/public/newAccount',
        data: JSON.stringify(user),
        success: function(response) {
            alert('Account has been created :)');
        },
        error: function(response) {
            document.getElementById("infoFromServer").innerText = response.responseText;
        }
    });
}