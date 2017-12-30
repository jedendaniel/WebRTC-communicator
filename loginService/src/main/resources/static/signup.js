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
        var $users = $('#users');

        $('#create-user').on('click', function() {

            var user = {
                name: $('#name').val(),
                login: $('#login').val(),
                password: $('#password').val(),
            };

            $.ajax({
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                type: 'POST',
                url: 'http://localhost:8090/user/create',
                data: JSON.stringify(user),
                success: function(newUser) {
                    alert('dodano :)');
                },
                error: function() {
                    alert('error :(');
                }
            });
        });
    });
});