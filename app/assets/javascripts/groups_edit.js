var lunchtimebeg = parseFloat(document.getElementById('lunchtime_start').value);
var lunchtimeend = parseFloat(document.getElementById('lunchtime_finish').value);

$(document).ready(function(){
  $('input.timepicker1').timepicker({
    timeFormat: 'HH:mm p',
    interval: 15,
    minTime: '10:30 am',
    maxTime: '3:00pm',
    defaultTime: lunchtimebeg,
    startTime: '10:30 pm',
    dynamic: false,
    dropdown: true,
    scrollbar: true
  });

  $('input.timepicker2').timepicker({
    timeFormat: 'HH:mm p',
    interval: 15,
    minTime: '10:30 am',
    maxTime: '3:00pm',
    defaultTime: lunchtimeend,
    startTime: '10:30 pm',
    dynamic: false,
    dropdown: true,
    scrollbar: true
  });
});

// This sample uses the Place Autocomplete widget requesting only a place
// ID to allow the user to search for and locate a place. The sample
// then reverse geocodes the place ID and displays an info window
// containing the place ID and other information about the place that the
// user has selected.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">


var mapCenter = {lat: parseFloat(document.getElementById('location_lat').value), lng: parseFloat(document.getElementById('location_lng').value)};
var markerlat = parseFloat(document.getElementById('location_lat').value);
var markerlng = parseFloat(document.getElementById('location_lng').value);


function initMap() {
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

    geocoder.geocode({'location': mapCenter}, function(results, status) {
      if (status === 'OK') {
        var address = results[1].formatted_address.split(" ");
        address.shift();
        address.shift();
        infowindow.setContent(address.join(" "));
        infowindow.open(map, marker);


      }
    });

    google.maps.event.addListener(marker, 'dragend', function(ev){
      document.getElementById('location_lat').value = marker.getPosition().lat();
      document.getElementById('location_lng').value = marker.getPosition().lng();

      newCenter =  {lat: marker.getPosition().lat(), lng: marker.getPosition().lng()};

      map.setCenter(newCenter);
      geocoder.geocode({'location': newCenter}, function(results, status) {
        if (status === 'OK') {
          var address = results[1].formatted_address.split(" ");
          address.shift();
          address.shift();
          infowindow.close();
          infowindow.open(map, marker);


          infowindow.setContent(address.join(" "));
        } else {
          window.alert('No results found');
        }


      });


    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
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
        // Set the position of the marker using the place ID and location.
        marker.setPlace({
          placeId: place.place_id,
          location: results[0].geometry.location
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

  if($("#people").val() == "1"){

    $(".auth_1, .auth_2, .auth_3").hide();


  }
  if($("#people").val() == "2"){
    $(".auth_3, auth_2").hide();
    $(".auth_1").show();

  }
  if($("#people").val() == "3"){
    $(".auth_3").hide();
    $(".auth_2").show();

  }
  if($("#people").val() == "4"){
    $(".auth_3").show();
  }


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

  $('#yr_edit_btn1').on('click', function (){
    $(this).addClass('yr_hide');
    $('#yr_auth_btn1').removeClass('yr_auth_btn1_hide');
    document.getElementById('yr_result1_edit').innerHTML = "";
    document.getElementById('add_nick1').readOnly = false;
  });

  $('#yr_edit_btn2').on('click', function (){
    $(this).addClass('yr_hide');
    $('#yr_auth_btn2').removeClass('yr_auth_btn2_hide');
    document.getElementById('yr_result2_edit').innerHTML = "";
    document.getElementById('add_nick2').readOnly = false;
  });

  $('#yr_edit_btn3').on('click', function (){
    $(this).addClass('yr_hide');
    $('#yr_auth_btn3').removeClass('yr_auth_btn3_hide');
    document.getElementById('yr_result3_edit').innerHTML = "";
    document.getElementById('add_nick3').readOnly = false;
  });

  $('#yr_auth_btn1').on('click', function (){
    $.ajax({
      url: "/groups/validate",
      method: "POST",
      data: {"user": $('#add_nick1').val(), "authenticity_token" : $("input[name=authenticity_token]").val()}
    }).done(function(a){
      document.getElementById('yr_result1_edit').innerHTML = result;
      $('#yr_result1_edit').show();
      if(result == "인증되었습니다."){
        document.getElementById('add_nick1').readOnly = true;
      }
    });
    return false;
  });

  $('#yr_newauth1').on('click', function (){
    $.ajax({
      url: "/groups/validate",
      method: "POST",
      data: {"user": $('#add_nick1').val(), "authenticity_token" : $("input[name=authenticity_token]").val()}
    }).done(function(a){
      document.getElementById('yr_result1_edit').innerHTML = result;
      $('#yr_result1_edit').show();
      if(result == "인증되었습니다."){
        document.getElementById('add_nick1').readOnly = true;
      }
    });
    return false;
  });

  $('#yr_auth_btn2').on('click', function (){
    $.ajax({
      url: "/groups/validate",
      method: "POST",
      data: {"user": $('#add_nick2').val(), "authenticity_token" : $("input[name=authenticity_token]").val()}
    }).done(function(a){
      document.getElementById('yr_result2_edit').innerHTML = result;
      $('#yr_result2_edit').show();
      if(result == "인증되었습니다."){
        document.getElementById('add_nick2').readOnly = true;
      }
    });
    return false;
  });
  $('#yr_newauth2').on('click', function (){
    $.ajax({
      url: "/groups/validate",
      method: "POST",
      data: {"user": $('#add_nick2').val(), "authenticity_token" : $("input[name=authenticity_token]").val()}
    }).done(function(a){
      document.getElementById('yr_result2_edit').innerHTML = result;
      $('#yr_result2_edit').show();
      if(result == "인증되었습니다."){
        document.getElementById('add_nick2').readOnly = true;
      }
    });
    return false;
  });

  $('#yr_auth_btn3').on('click', function (){
    $.ajax({
      url: "/groups/validate",
      method: "POST",
      data: {"user": $('#add_nick3').val(), "authenticity_token" : $("input[name=authenticity_token]").val()}
    }).done(function(a){
      document.getElementById('yr_result3_edit').innerHTML = result;
      $('#yr_result3_edit').show();
      if(result == "인증되었습니다."){
        document.getElementById('add_nick3').readOnly = true;
      }
    });

    return false;
  });

  $('#yr_newauth3').on('click', function (){
    $.ajax({
      url: "/groups/validate",
      method: "POST",
      data: {"user": $('#add_nick3').val(), "authenticity_token" : $("input[name=authenticity_token]").val()}
    }).done(function(a){
      document.getElementById('yr_result3_edit').innerHTML = result;
      $('#yr_result3_edit').show();
      if(result == "인증되었습니다."){
        document.getElementById('add_nick3').readOnly = true;
      }
    });
    return false;
  });


  $('.yr_thisday').on("click",function(){

    $(this).parents("div.yr_daybutton").toggleClass('yr_active');

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

      if ($('#yr_result1_edit').html() == noiderror) {
        alert("가입된 유저의 닉네임을 인증해주세요.");
        return false;
      } else {

        if($('#yr_result1_edit').html() == myselferror){
          alert("본인 외의 유저를 인증해주세요.");
          return false;
        }

        if($('#yr_result1_edit').html() == ""){
          alert("수정된 닉네임을 인증해주세요.");
          return false;
        }

        if($('#yr_result1_edit').html() == gendererror){
          alert("같은 성별의 유저를 인증해주세요.");
          return false;
        }

        if($('#yr_result1_edit').html() == proved) {

        }

      }
    } else {

      if($("#people").val() == "3" ){

        if($('#yr_result1_edit').html() == "" || $('#yr_result2_edit').html() == ""){
          alert("닉네임을 모두 인증해주세요.");
          return false;
        } else {

          if ($('#yr_result1_edit').html() == noiderror || $('#yr_result2_edit').html() == noiderror) {
            alert("가입된 유저의 닉네임을 인증해주세요.");
            return false;
          }

          if($('#yr_result1_edit').html() == myselferror || $('#yr_result2_edit').html() == myselferror){
            alert("본인 외의 유저를 인증해주세요.");
            return false;
          }

          if($('#yr_result1_edit').html() == gendererror || $('#yr_result2_edit').html() == gendererror){
            alert("같은 성별의 유저를 인증해주세요.");
            return false;
          }

          if($('#yr_result1_edit').html() == proved && $('#yr_result2_edit').html() == proved) {

          }

        }
      }

      if($("#people").val() == "4" ){

        if($('#yr_result1_edit').html() == "" || $('#yr_result2_edit').html() == "" || $('#yr_result3_edit').html() == ""){
          alert("닉네임을 모두 인증해주세요.");
          return false;
        } else {

          if ($('#yr_result1_edit').html() == noiderror || $('#yr_result2_edit').html() == noiderror || $('#yr_result3_edit').html() == noiderror){
            alert("가입된 유저의 닉네임을 인증해주세요.");
            return false;
          }

          if($('#yr_result1_edit').html() == myselferror || $('#yr_result2_edit').html() == myselferror || $('#yr_result3_edit').html() == myselferror){
            alert("본인 외의 유저를 인증해주세요.");
            return false;
          }

          if($('#yr_result1_edit').html() == gendererror || $('#yr_result2_edit').html() == gendererror || $('#yr_result3_edit').html() == gendererror)  {
            alert("같은 성별의 유저를 인증해주세요.");
            return false;
          }

          if($('#yr_result1_edit').html() == proved && $('#yr_result2_edit').html() == proved && $('#yr_result3_edit').html() == proved) {

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
