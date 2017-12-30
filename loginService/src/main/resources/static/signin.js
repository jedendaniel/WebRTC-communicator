function validateLogin() {
    var x = document.forms["newAccForm"]["login"].value;
    if (x == "") {
        document.getElementById("loginInfo").innerHTML = "Login cannot be empty";
    } else {
        document.getElementById("loginInfo").innerHTML = "";
    }
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
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                //type: 'POST',
                url: 'http://localhost:8090/api/users/' + $('#login').val() + '&' + $('#password').val(),
                data: JSON.stringify(user),
                success: function() {
                    window.location.href = "http://localhost:8090/main.html";
                },
                error: function() {
                    alert('error :(');
                }
            });
        });
    });
});