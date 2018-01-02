function validateLogin() {
    var x = document.forms["newAccForm"]["login"].value;
    if (x == "") {
        document.getElementById("loginInfo").innerHTML = "Login cannot be empty";
    } else {
        document.getElementById("loginInfo").innerHTML = "";
    }
}

function validatePassword(password) {

}

$(function() {
    $(document).ready(function() {

        $('#sign-in').on('click', function() {
            console.log("Signing, not singing...")
            var user = {
                login: $('#login').val(),
                password: $('#password').val(),
            };

            $.ajax({
                contentType: "application/json; charset=utf-8",
                type: 'GET',
                url: 'http://localhost:8090/api/users?login=' +
                    $('#login').val() + '&password=' + $('#password').val(),
                //data: JSON.stringify(user),
                success: function(response) {
                    localStorage.setItem("login", $("#login").val());
                    window.location.href = "http://localhost:8090/home.html";
                },
                error: function() {
                    alert('Wrong login or password :/');
                }
            });
        });
    });
});