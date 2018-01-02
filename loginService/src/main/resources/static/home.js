$(function () {
    $(document).ready(function() { loadHomeContent(); });
});

function loadHomeContent(){
    $("#content-div").load("home.html");
}

function logout(){
    localStorage.removeItem("login");
    window.location.href = "http://localhost:8090/index.html";
}