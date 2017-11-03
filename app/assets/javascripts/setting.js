var acc = document.getElementsByClassName("ks_accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        var ks_panel = this.nextElementSibling;
        if (ks_panel.style.display === "block") {
            ks_panel.style.display = "none";
        } else {
            ks_panel.style.display = "block";
        }
    }
}
