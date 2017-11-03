//AJAX로 수정중
	$('.dk_submitbutton').on('click', function (){
		console.log('start');
		console.log($('input[name=age]').val());

	if ($('input[name=current_password]').val() == "") {
	  alert('정보를 수정하시려면 비밀 번호를 써주세요.')
      return false;
	}

	var age = $('input[name=age]').val();

	if ( !(age > 19 && age< 100) ) {
	  alert('현재 나이를 숫자 두자리로 입력해주세요.')
      return false;
	}
    $.ajax({
      url: "/users/editvalidate",
      method: "POST",
      data: {"id": $('input[name=id]').val(),
      		 "age": $('input[name=age]').val(),
      		 "current_password": $('input[name=current_password]').val(),
      		 "password": $('input[name=password]').val(),
      		 "password_confirmation": $('input[name=password_confirmation]').val(),
      		 "authenticity_token" : $("input[name=authenticity_token]").val()}
    });
  });
