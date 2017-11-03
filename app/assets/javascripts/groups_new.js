if(JSON.parse(document.getElementById('userlunchtime').innerHTML)) {
  var lunchtimebeg = parseFloat(document.getElementById('lunchtime_start').value);
  var lunchtimeend = parseFloat(document.getElementById('lunchtime_finish').value);
} else {
  var lunchtimebeg = "12:00 pm"
  var lunchtimeend = "1:00 pm"
}

$(document).ready(function(){
  $('input.timepicker1').timepicker({
    timeFormat: 'HH:mm p',
    interval: 30,
    minTime: '10:30 am',
    maxTime: '1:00pm',
    defaultTime: lunchtimebeg,
    startTime: '10:30 pm',
    dynamic: false,
    dropdown: true,
    scrollbar: true
  });

  $('input.timepicker2').timepicker({
    timeFormat: 'HH:mm p',
    interval: 30,
    minTime: '11:00 am',
    maxTime: '3:00pm',
    defaultTime: lunchtimeend,
    startTime: '10:30 pm',
    dynamic: false,
    dropdown: true,
    scrollbar: true
  });
});


if (JSON.parse(document.getElementById('userlocation').innerHTML)) {
  var mapCenter = {lat: parseFloat(document.getElementById('location_lat').value), lng: parseFloat(document.getElementById('location_lng').value)};
  var markerlat = parseFloat(document.getElementById('location_lat').value);
  var markerlng = parseFloat(document.getElementById('location_lng').value);

} else {
  var mapCenter = {lat: 37.497942, lng: 127.027621};
  var markerlat = 37.497942;
  var markerlng =  127.027621;

}

function initMap(geocoder,map,infowindow) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: mapCenter,
    zoom: 15
  });

  var input = document.getElementById('pac-input');

  var autocomplete = new google.maps.places.Autocomplete(
    input, {placeIdOnly: true});
    autocomplete.bindTo('bounds', map);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var infowindow = new google.maps.InfoWindow();
    var geocoder = new google.maps.Geocoder;
    var initial = new google.maps.LatLng(markerlat, markerlng);
    var marker = new google.maps.Marker({
      map: map,
      draggable: true,
      position: initial

    });


    marker.addListener('click', function() {
      // document.getElementById('place-name').textContent = initial.name;
      // // document.getElementById('place-id').textContent = place.place_id;
      // document.getElementById('place-address').textContent =
      // initial.formatted_address;
      // infowindow.setContent(document.getElementById('infowindow-content'));
      infowindow.open(map, marker);
    });

    geocoder.geocode({'location': mapCenter}, function(results, status) {
      if (status === 'OK') {
        var address = results[1].formatted_address.split(" ");

        address.shift();
        address.shift();

        infowindow.setContent(address.join(" "));
        infowindow.open(map, marker);
      }
    });

    // if (status === 'OK') {
    //       var address = results[1].formatted_address.split(" ");
    //       address.shift();
    //       console.log(address.join(" "));
    //       infowindow.setContent(address.join(" "));
    //       infowindow.open(map, marker);
    //   }

    google.maps.event.addListener(marker, 'dragend', function(ev){
      document.getElementById('location_lat').value = marker.getPosition().lat();
      document.getElementById('location_lng').value = marker.getPosition().lng();

      newCenter =  {lat: marker.getPosition().lat(), lng: marker.getPosition().lng()};

      map.setCenter(newCenter);
      geocoder.geocode({'location': newCenter}, function(results, status) {
        if (status === 'OK') {
          var address = results[1].formatted_address;
          var newaddress = address.split(" ");
          newaddress.shift();
          newaddress.shift();

          infowindow.close();
          infowindow.open(map, marker);
          infowindow.setContent(newaddress.join(" "));

        } else {
          window.alert('No results found');
        }
      });
    });

    autocomplete.addListener('place_changed', function() {
      infowindow.close();

      var place = autocomplete.getPlace();

      if (!place.place_id) {
        return;
      }
      geocoder.geocode({'placeId': place.place_id}, function(results, status) {

        if (status !== 'OK') {
          window.alert('Geocoder failed due to: ' + status);
          return;
        }

        map.setZoom(15);
        map.setCenter(results[0].geometry.location);
        // // Set the position of the marker using the place ID and location.
        marker.setPlace({
          placeId: place.place_id,
          location: results[0].geometry.location,
        });

        marker.setVisible(true);
        document.getElementById('place-name').textContent = place.name;
        // document.getElementById('place-id').textContent = place.place_id;
        document.getElementById('place-address').textContent =
        results[0].formatted_address;

        infowindow.setContent(document.getElementById('infowindow-content'));
        infowindow.open(map, marker);

        document.getElementById('location_lat').value = results[0].geometry.location.lat();
        document.getElementById('location_lng').value = results[0].geometry.location.lng();


      });


    });
  }

  //facebook 잠재고객 추적 이벤트 삽입
  $( '#dk_submitButton' ).on("click",function() {
    fbq('track', 'Lead');
  });
  // $(document).ready(function(){
  $("#people").change(function(){
    if($("#people").val() == "1"){
      $(".auth_1, .auth_2, .auth_3").hide();
      return false;
    }
    if($("#people").val() == "2"){
      $(".auth_3, auth_2").hide();
      $(".auth_1").show();
      return false;

    }
    if($("#people").val() == "3"){
      $(".auth_3").hide();
      $(".auth_2").show();
      return false;
    }
    if($("#people").val() == "4"){
      $(".auth_3").show();
      return false;
    }
  });
  // });



  $('.yr_thisday').on("click",function(){

    $(this).parents("div.yr_daybutton").toggleClass('yr_active');


  });



  $('.yr_btn1').on('click', function (){
    $.ajax({
      url: "/groups/validate",
      method: "POST",
      data: {"user": $('#add_nick1').val(), "authenticity_token" : $("input[name=authenticity_token]").val()}
    }).done(function(a){
      document.getElementById('yr_result1').innerHTML = result;
    });

    return false;
  });

  $('.yr_btn2').on('click', function (){
    $.ajax({
      url: "/groups/validate",
      method: "POST",
      data: {"user": $('#add_nick2').val(), "authenticity_token" : $("input[name=authenticity_token]").val()}
    }).done(function(a){
      document.getElementById('yr_result2').innerHTML = result;
    });

    return false;
  });

  $('.yr_btn3').on('click', function (){
    $.ajax({
      url: "/groups/validate",
      method: "POST",
      data: {"user": $('#add_nick3').val(), "authenticity_token" : $("input[name=authenticity_token]").val()}
    }).done(function(a){
      document.getElementById('yr_result3').innerHTML = result;
    });

    return false;
  });

  $('form').submit(function (event){

    // 점심시간 인증
    var startTime = document.getElementById('lunchtime_start').value;
    var finishTime = document.getElementById('lunchtime_finish').value;

    var sT = moment(startTime, 'HH:mm A');
    var fT = moment(finishTime, 'HH:mm A');

    if (sT.isAfter(fT)) {
      var error = "시작 시간이 종료 시간보다 늦습니다.";
      alert(error);
      window.scrollTo(0,0);
      return false;
    } else {
      var diffMin = fT.diff(sT, 'minutes');

      if (diffMin < 60) {
        var error = "점심시간은 최소한 한시간 이상으로 설정해 주세요.";
        alert(error);
        window.scrollTo(0,0);
        return false;
      }
    }

    // 닉네임 인증
    var noiderror = "해당 닉네임을 가진 유저가 없습니다.";
    var gendererror = "같은 성별의 유저를 선택해주세요.";
    var proved = "인증되었습니다.";
    var myselferror = "본인 외의 유저를 선택해주세요.";


    if($("#people").val() == "2" ){

      if ($('#yr_result1').html() == noiderror) {
        alert("가입된 유저의 닉네임을 인증해주세요.");
        return false;
      } else {

        if($('#yr_result1').html() == myselferror){
          alert("본인 외의 유저를 인증해주세요.");
          return false;
        }

        if($('#yr_result1').html() == ""){
          alert("닉네임을 인증해주세요.");
          return false;
        }

        if($('#yr_result1').html() == gendererror){
          alert("같은 성별의 유저를 인증해주세요.");
          return false;
        }

        if($('#yr_result1').html() == proved) {

        }

      }
    } else {

      if($("#people").val() == "3" ){

        if($('#yr_result1').html() == "" || $('#yr_result2').html() == ""){
          alert("닉네임을 모두 인증해주세요.");
          return false;
        } else {

          if ($('#yr_result1').html() == noiderror || $('#yr_result2').html() == noiderror) {
            alert("가입된 유저의 닉네임을 인증해주세요.");
            return false;
          }

          if($('#yr_result1').html() == myselferror || $('#yr_result2').html() == myselferror){
            alert("본인 외의 유저를 인증해주세요.");
            return false;
          }

          if($('#yr_result1').html() == gendererror || $('#yr_result2').html() == gendererror){
            alert("같은 성별의 유저를 인증해주세요.");
            return false;
          }

          if($('#yr_result1').html() == proved && $('#yr_result2').html() == proved) {

          }

        }
      }

      if($("#people").val() == "4" ){

        if($('#yr_result1').html() == "" || $('#yr_result2').html() == "" || $('#yr_result3').html() == ""){
          alert("닉네임을 모두 인증해주세요.");
          return false;
        } else {

          if ($('#yr_result1').html() == noiderror || $('#yr_result2').html() == noiderror || $('#yr_result3').html() == noiderror){
            alert("가입된 유저의 닉네임을 인증해주세요.");
            return false;
          }

          if($('#yr_result1').html() == myselferror || $('#yr_result2').html() == myselferror || $('#yr_result3').html() == myselferror){
            alert("본인 외의 유저를 인증해주세요.");
            return false;
          }

          if($('#yr_result1').html() == gendererror || $('#yr_result2').html() == gendererror || $('#yr_result3').html() == gendererror)  {
            alert("같은 성별의 유저를 인증해주세요.");
            return false;
          }

          if($('#yr_result1').html() == proved && $('#yr_result2').html() == proved && $('#yr_result3').html() == proved) {

          }

        }
      }


      if($("#people").val() == "1" ){

      }
    }


    // 날짜 인증
    if (!$("#mon").parents("div.yr_daybutton").hasClass('yr_active') && !$("#tue").parents("div.yr_daybutton").hasClass('yr_active') && !$("#wed").parents("div.yr_daybutton").hasClass('yr_active') && !$("#thu").parents("div.yr_daybutton").hasClass('yr_active') && !$("#fri").parents("div.yr_daybutton").hasClass('yr_active')) {
      alert("최소한 하루를 가능한 요일로 선택해주세요.");
      return false;
    }


    // return false;

  });
