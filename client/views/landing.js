var map = function(lat, lng) {
var marker;

    GoogleMaps.init(
        {
            'sensor': true, //optional
            'key': 'AIzaSyDk9y8mpkP-vf76aIFil2Kve_3f49WxW_w', //optional
            'language': 'en' //optional
        }, 
        function(){
            var mapOptions = {
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions); 
            map.setCenter(new google.maps.LatLng( lat, lng ));
                marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat,lng),
                map: map

            })
        }
    );
}

var c = function(position){
  var lat = position.coords.latitude,
      lng = position.coords.longitude;
  map(lat, lng);
}

var getPositionByBrowser = function(){
  navigator.geolocation.getCurrentPosition(c); //c for callback function
  return false;
}

getPositionByBrowser();

