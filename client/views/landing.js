if (Meteor.isClient) {



  var styles = [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}]

  var map = function(lat, lng) {
  var marker;
  var gpsIcon = '/images/gpsicon.png';

      GoogleMaps.init(
          {
              'sensor': true, //optional
              'key': 'AIzaSyDk9y8mpkP-vf76aIFil2Kve_3f49WxW_w', //optional
              'language': 'en' //optional
          }, 
          function(){
              var mapOptions = {
                  zoom: 16,
                  mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
              };
              var styledMap = new google.maps.StyledMapType(styles,
                {name: "Styled Map"});
              map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
              map.mapTypes.set('map_style', styledMap);
              map.setMapTypeId('map_style');
              map.setCenter(new google.maps.LatLng( lat, lng ));
                  marker = new google.maps.Marker({
                  position: new google.maps.LatLng(lat,lng),
                  map: map,
                  animation: google.maps.Animation.DROP,
                  icon: gpsIcon

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

}