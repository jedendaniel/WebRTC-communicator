var stompClient = null;

$(function () {
    $(document).ready(function() { loadHomeContent(); });
});

function loadHomeContent(){
    $("#content-div").load("homeContent.html");
}

function logout(){
    localStorage.removeItem("login");
    window.location.href = "http://localhost:8090/index.html";
}