Template.loggedIn.rendered = function(){

  if (Meteor.isClient) {
    if (Meteor.userId(this)) {

      // snazzymap style
      var styles = [{
        "featureType": "water",
        "stylers": [{
          "saturation": 43
        }, {
          "lightness": -11
        }, {
          "hue": "#0088ff"
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{
          "hue": "#ff0000"
        }, {
          "saturation": -100
        }, {
          "lightness": 99
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#808080"
        }, {
          "lightness": 54
        }]
      }, {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ece2d9"
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ccdca1"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#767676"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#ffffff"
        }]
      }, {
        "featureType": "poi",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#b8cb93"
        }]
      }, {
        "featureType": "poi.park",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "poi.sports_complex",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "poi.medical",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "poi.business",
        "stylers": [{
          "visibility": "simplified"
        }]
      }]


      // call map with long and lat
      var map = function(lat, lng) {
        var myMarker;
        var onlineUsersExceptMe = Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch();
        var otherUserMarkers = [];
        // put other users locations into array
        for (user in onlineUsersExceptMe) {
          var otherUserLat = onlineUsersExceptMe[user].profile.location.lat,
              otherUserLng = onlineUsersExceptMe[user].profile.location.lng;
              otherUserMarkers.push([otherUserLat, otherUserLng]);
        };



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

            //put other users names into array
            var otherUserInformation = [];
            var i = 0;
            while (i < onlineUsersExceptMe.length) {
              otherUserInformation.push(onlineUsersExceptMe[i].profile.name);
              i++;

            }

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
            //centre map on latlng in current user profile
            map.setCenter(new google.maps.LatLng(lat, lng));
            //drop my marker onto the map
            myMarker = new google.maps.Marker({
              position: new google.maps.LatLng(lat, lng),
              map: map,
              animation: google.maps.Animation.DROP,
              icon: gpsIcon,
              title: 'My location',
              visible: true

            });
            //drop pin if new user logs in
            var dropSinglePin = function(user){
              
              // adds a single marker for a new user
              var additionalUserMarker = new google.maps.Marker({
                position: new google.maps.LatLng(user.profile.location.lat, user.profile.location.lng),
                map: map,
                animation: google.maps.Animation.DROP,                
                icon: gpsIcon,
                visible: true
              });

              // attaches click listener and event handler to the marker
              google.maps.event.addListener(additionalUserMarker, 'click', function() {
                infowindow.setContent(user.profile.name);
                infowindow.open(map, additionalUserMarker);
              });

            };
            //checks for changes in count of users currently online
            Meteor.users.find().observeChanges({
              'added': function(id, addedUser){
                dropSinglePin(addedUser);
              }
            });            



            //draw other users markers on the map
            for (index in otherUserMarkers) {
              otherUserMarker = new google.maps.Marker({
                position: new google.maps.LatLng(otherUserMarkers[index][0], otherUserMarkers[index][1]),
                map: map,
                animation: google.maps.Animation.DROP,                
                icon: gpsIcon,
                visible: true
              });
            //populate other users markers with infowindows containing their names
              google.maps.event.addListener(otherUserMarker, 'click', (function(otherUserMarker, i) {
                return function() {
                  infowindow.setContent(otherUserInformation[i]);
                  infowindow.open(map, otherUserMarker);
                }
              })(otherUserMarker, index));
            };
          }
        );
      }

      
      //executes if geolocation not found
      var error = function(position) {
        var lat = 22.284584,
            lng = 114.158212;
        map(lat, lng);
        alert("position not found, setting default"); // create an alert or something better here to tell the user that the position was not able to be found
      }

      //render map, add location data & time updated to users profile 
      var afterPositionInfo = function(position) {
        var lat = position.coords.latitude,
            lng = position.coords.longitude;
        map(lat, lng);
        var locationHash = {
          lat: lat,
          lng: lng,
          updatedAt: time
        };
        Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.location" : locationHash}});
        
      }
      // draw map after getting users position data
      var getPositionByBrowser = function() {
        navigator.geolocation.getCurrentPosition(afterPositionInfo, error); //afterPositionInfo for callback function, error if geolocation unsuccessful
        
        return false;
      }
      //draw map without getting geolocation data
      var mapWithExistingPosition = function() {
        var lat = Meteor.user().profile.location.lat,
            lng = Meteor.user().profile.location.lng
        map(lat, lng);
      }

      // check to see if location data is x minutes old, update if it is
      var time = Date.now();
      if (Meteor.user().profile.location === undefined) {
        Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.location" : {lat: 22.284584, lng: 114.158212, updatedAt: time}}});
        getPositionByBrowser();      
      } else if (time >= Meteor.user().profile.location.updatedAt + 1000 * 60 * 60) {
        getPositionByBrowser();
      } else {
        mapWithExistingPosition();
      }

    }
  };

};

