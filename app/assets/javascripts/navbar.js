function navFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "dk_mb_navbar") {
        x.className += " responsive";
    } else {
        x.className = "dk_mb_navbar";
    }
}
