function initMap() {
  var uluru = {lat: parseFloat(document.getElementById('lat_d').value), lng: parseFloat(document.getElementById('lon_d').value)};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}
