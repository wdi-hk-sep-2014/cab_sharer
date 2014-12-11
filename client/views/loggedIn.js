// $(document).ready(console.log("this is jquery working"));
Template.loggedIn.rendered = function(){

  if (Meteor.isClient) {
    if (Meteor.userId(this)) {

      var styles = [{
        "featureType": "water",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#acbcc9"
        }]
      }, {
        "featureType": "landscape",
        "stylers": [{
          "color": "#f2e5d4"
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
          "color": "#c5c6c6"
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e4d7c6"
        }]
      }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
          "color": "#fbfaf7"
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
          "color": "#c5dac6"
        }]
      }, {
        "featureType": "administrative",
        "stylers": [{
          "visibility": "on"
        }, {
          "lightness": 33
        }]
      }, {
        "featureType": "road"
      }, {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [{
          "visibility": "on"
        }, {
          "lightness": 20
        }]
      }, {}, {
        "featureType": "road",
        "stylers": [{
          "lightness": 20
        }]
      }]

      var map = function(lat, lng) {
        var myMarker;
        var onlineUserArray = Meteor.users.find().fetch(); // gather online user object information
        var i = 1;
        var otherUserMarkers = [];
        while (i < onlineUserArray.length) { // put other online users locations into an array
          var otherUserlat = onlineUserArray[i].profile.location.lat,
              otherUserlng = onlineUserArray[i].profile.location.lng;
              otherUserMarkers.push([otherUserlat, otherUserlng]);
              i++;
        };
        // console.log(otherUserMarkers);


        GoogleMaps.init({
            'sensor': true, //optional
            'key': 'AIzaSyDk9y8mpkP-vf76aIFil2Kve_3f49WxW_w', //optional
            'language': 'en' //optional
          },
          function() {
            var mapOptions = {
              zoom: 16,
              streetViewControl: false,
              mapTypeControl: false,
              panControl: false,
              zoomControl: false,
              mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            };
            var locations = [];
            var i = 1;
            while (i < onlineUserArray.length) {
              locations.push(onlineUserArray[i].profile.name);
              i++;
            }
            console.log(locations);
            var infowindow = new google.maps.InfoWindow();

            var styledMap = new google.maps.StyledMapType(styles, {
              name: "Styled Map"
            });
            var gpsIcon = new google.maps.MarkerImage(
              '/images/bluedot_retina.png',
              null, // size
              null, // origin
              new google.maps.Point( 8, 8 ),
              new google.maps.Size( 17, 17 )
            );            
            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');
            map.setCenter(new google.maps.LatLng(lat, lng));
            myMarker = new google.maps.Marker({
              position: new google.maps.LatLng(lat, lng),
              map: map,
              animation: google.maps.Animation.DROP,
              icon: gpsIcon,
              title: 'My location',
              visible: true

            })
            for (index in otherUserMarkers) {
              otherUserMarker = new google.maps.Marker({
                position: new google.maps.LatLng(otherUserMarkers[index][0], otherUserMarkers[index][1]),
                map: map,
                animation: google.maps.Animation.DROP,
                icon: gpsIcon,
                visible: true
              });
              google.maps.event.addListener(otherUserMarker, 'click', (function(otherUserMarker, i) {
                return function() {
                  infowindow.setContent(locations[index]);
                  infowindow.open(map, otherUserMarker);
                }
              })(otherUserMarker, i));
            };
          }
        );
      }

      var error = function(position) {
        var lat = 22.284584,
            lng = 114.158212;
        map(lat, lng); // create an alert or something better here to tell the user that the position was not able to be found
      }


      var afterPositionInfo = function(position) {
        var lat = position.coords.latitude,
            lng = position.coords.longitude;
        map(lat, lng);
        var locationHash = {
          lat: lat,
          lng: lng
        };
        Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.location" : locationHash}});
        
      }

      var getPositionByBrowser = function() {
        navigator.geolocation.getCurrentPosition(afterPositionInfo, error); //afterPositionInfo for callback function, error if geolocation unsuccessful
        return false;
      }

      getPositionByBrowser();


    }
  };

};

