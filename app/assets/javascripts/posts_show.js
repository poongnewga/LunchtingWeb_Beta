//좋아요 AJAX
$('.dk_likecommentbox').on('click','img',function(){
  var imgClass = $(this).attr('class');
  var here = $(this)
  var val = $(this).next("input").val();
  $.ajax({
    url: "/posts/"+ val +"/like",
    method: "POST",
    data: {"id": val, "authenticity_token" : $("input[name=authenticity_token]").val()}
  }).done(function(){
        console.log(val);
        $(here).toggleClass("dk_likehidden");
        $(here).siblings().toggleClass("dk_likehidden");
        var idnum = "#dk_numberup"
        var num = parseInt($(idnum).html())
        if (imgClass == "dk_likeon") {
          $(idnum).html(num-1)
        } else {
          $(idnum).html(num+1)
        };
      });
});

//모달 스크립트
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
