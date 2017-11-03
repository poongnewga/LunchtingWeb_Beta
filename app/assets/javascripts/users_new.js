  //facebook 등록완료 픽셀
  $( '#dk_submitButton' ).on("click",function() {
    fbq('track', 'CompleteRegistration');
		//회원가입 폼 작성 후 제출(Google Analytics)
		gtag('event', 'signIn', {
			'event_category': 'User',
			'event_label': 'submit'
		});
  });

 //id 확인 JS
	$('.ky_val_btn').on('click', function (){
		console.log('start')
    $.ajax({
      url: "/users/validate",
      method: "POST",
      data: {"nickname": $('input[name=nickname]').val(), "authenticity_token" : $("input[name=authenticity_token]").val()}
    });
    console.log('end')
    return false;
  });

  //약관 전체 동의
  $(function(){
    $("#allCheck").click(function(){
      if($("#allCheck").prop("checked")) {
        $("input[type=checkbox]").prop("checked",true);
      } else {
        $("input[type=checkbox]").prop("checked",false);
      }
    });
  });

	var verified = undefined;
	//제출 양식
  $('.ky_next').on('click', function() {
  	console.log('가입 심사 시작');

  	var nickname = $('.ky_input-id').val();
  	var check = verified;
  	var veri = null;
  	if(check == undefined) veri = false;
  	else veri = verified;
   	var password1 = $('input[name=password]').val();
  	var password2 = $('input[name=password_confirmation]').val();
  	var age = $('.ky_input-date').val();
  	var gender = $('.ky_input-button-3').val();
		var company = $('.dk_inputcompany').val();
  	var card = $('.ky_inputfile').val();
  	var agree = $(".ky_agreement_check:checked").length;

  	if(nickname == "") {
  		alert('닉네임을 입력하세요.');
  		return false;
  	}
  	else if(nickname.length > 10) {
  		alert('닉네임이 너무 깁니다.');
  		return false;
  	}
  	else if(!veri) {
  		  alert('닉네임 중복확인을 해주세요.');
  			return false;
  		}
  	else if(password1 == "") {
  		  alert('비밀번호를 입력하세요.');
  			return false;
  		}
		else if(password1.length < 6) {
				alert('6자 이상의 비밀번호를 입력하세요.');
				return false;
		}
  	else if(password2 == "") {
  			alert('비밀번호 확인을 입력하세요.');
  			return false;
  		}
  	else if(password1 != password2) {
  	 		alert('입력된 비밀번호들이 다릅니다.');
  	 		return false;
  	 	}
  	else if(age == "") {
  			alert('나이를 입력하세요.');
  			return false;
  		}
  	else if(gender == undefined) {
  			alert('성별을 입력하세요.');
  			return false;
  		}
  	else if(card == "") {
  	 		alert('명함 사진을 넣어주세요.');
  	 		return false;
  	 	}
  	else if(agree != 3) {
  			alert('필수 약관 동의를 체크해주세요.');
  			return false;
  		}
		else if(company == "") {
  			alert('회사명을 적어주세요.');
  			return false;
  		}
  	else {
  		alert('가입 신청이 완료 되었습니다. 수작업으로 명함을 보고 명함 속 메일로 인증링크를 보내드립니다.');
  		$('input[name=gender]').val($('input.ky_input-button-3').val())
  		// location.replace('/')
  	}
  });

	//남녀 선택 JS
	$(".ky_input-button-1").on('click', function(){
		console.log('Click')
		if(!$(this).hasClass("ky_input-button-3")) {
			$(this).addClass("ky_input-button-3");
			$(".ky_input-button-2").removeClass("ky_input-button-3");
		} else {
			$(this).removeClass("ky_input-button-3");
		}

		return false;
	});

	$(".ky_input-button-2").on('click', function(){
		console.log('Click')
		if(!$(this).hasClass("ky_input-button-3")) {
			$(this).addClass("ky_input-button-3");
			$(".ky_input-button-1").removeClass("ky_input-button-3");
		} else {
			$(this).removeClass("ky_input-button-3");
		}

		return false;
	});

'use strict';

;( function ( document, window, index )
{
	var inputs = document.querySelectorAll( '.ky_inputfile' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});

		// Firefox bug fix
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});
}( document, window, 0 ));
