function validateForm() {
    var x = document.forms["newAccForm"]["login"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
}
