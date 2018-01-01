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
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                type: 'GET',
                url: 'http://localhost:8090/api/users/login="' + $('#login').val() + '"',
                //data: JSON.stringify(user),
                success: function(response) {
                    var user = {
                                    login: $('#login').val(),
                                    password: $('#password').val(),
                                };
                    var respUser = JSON.parse(response);
                    if(user.password === respUser.password){
                        localStorage.setItem("login", $("#login"));
                        window.location.href = "http://localhost:8090/home.html";
                    }
                    else{
                        alert('wrong login or password');
                    }
                },
                error: function() {
                    alert('error :(');
                }
            });
        });
    });
});

$(function () {
    $( "#sign-in" ).click(function() { saveData(); });
});

function saveData(){
    localStorage.setItem("login", $("#login"));
}