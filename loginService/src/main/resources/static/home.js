function loadHomeContent(){
    $("#content-div").append("Test text.");
}

$(function () {
    $(document).ready(function() { loadHomeContent(); });
});