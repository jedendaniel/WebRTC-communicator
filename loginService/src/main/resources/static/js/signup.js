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
            validateAndChange();
        });
    });
});

var pasword1;
var pasword2;
var notEqualPswd;
var emptyPswd;

var login;
var loginMessage;
var name;
var nameMessage;


function validateAndChange() {
    if (password1.value !== password2.value) {
        notEqualPswd.innerText = "Passwords are not the same!";
        return;
        //validateLogin(false);
    } else {
        notEqualPswd.innerText = " ";
    }
    if (password1.value === "" || password2.value === "") {
        emptyPswd.innerText = "Field cannot be empty!";
        //validateLogin(false);
        return;
    } else {
        emptyPswd.innerText = " ";
    }
    //validateLogin(true);
    createAccount();
};

function validateLogin(prevState) {
    if (login.value === "") {
        loginMessage.innerText = "Field cannot be empty!";
        validateName(false);
    } else {
        loginMessage.innerText = " ";
        // $.ajax({
        //     type: 'GET',
        //     url: 'http://localhost:8090/api/auth/user?login=' + login.value,
        //     success: function() {
        //         loginMessage.innerText = "Login is already in use";
        //         validateName(false);
        //     },
        //     error: function() {
        //         loginMessage.innerText = " ";
        //         validateName(prevState);
        //     }
        // });
    }
};

function validateName(prevState) {
    if (name.value === "") {
        nameMessage.innerText = "Field cannot be empty!";
    } else {
        nameMessage.innerText = " ";
        // $.ajax({
        //     type: 'GET',
        //     url: 'http://localhost:8090/api/auth/user?name=' + name.value,
        //     success: function() {
        //         nameMessage.innerText = "Name is already in use";
        //     },
        //     error: function() {
        //         nameMessage.innerText = " ";
        //         createAccount();
        //     }
        // });
    }
};

function createAccount() {
    var user = {
        name: $('#name').val(),
        login: $('#login').val(),
        password: $('#password1').val(),
        role: "USER",
    };

    $.ajax({
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: 'POST',
        url: 'http://localhost:8090/api/noauth/users',
        data: JSON.stringify(user),
        success: function() {
            alert('Account has been created :)');
        },
        error: function() {
            alert('Error: name bussy, login bussy or something went wrong :(');
        }
    });
}