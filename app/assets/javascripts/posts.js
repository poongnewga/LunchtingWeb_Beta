$( ".dk_next" ).click(function() {
  $('.next_page')[0].click();
});


$('.dk_bottom').on('click','img',function(){
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
        var idnum = "#dk_numberup"+ val
        var num = parseInt($(idnum).html())
        if (imgClass == "dk_likeon") {
          $(idnum).html(num-1)
        } else {
          $(idnum).html(num+1)
        };
      });
});
