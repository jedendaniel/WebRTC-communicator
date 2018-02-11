function signin() {
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;
    document.location = 'http://' + login + ':' + password + '@localhost:8090/main.html';
}