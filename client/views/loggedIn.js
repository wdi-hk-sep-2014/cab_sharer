Template.loggedIn.rendered = function() {


  if (Meteor.isClient) {

    if (Meteor.userId()) {

      
      // snazzymap style
      var styles = [{
        "featureType": "landscape",
        "stylers": [{
          "saturation": -100
        }, {
          "lightness": 65
        }, {
          "visibility": "on"
        }]
      }, {
        "featureType": "poi",
        "stylers": [{
          "saturation": -100
        }, {
          "lightness": 51
        }, {
          "visibility": "simplified"
        }]
      }, {
        "featureType": "road.highway",
        "stylers": [{
          "saturation": -100
        }, {
          "visibility": "simplified"
        }]
      }, {
        "featureType": "road.arterial",
        "stylers": [{
          "saturation": -100
        }, {
          "lightness": 30
        }, {
          "visibility": "on"
        }]
      }, {
        "featureType": "road.local",
        "stylers": [{
          "saturation": -100
        }, {
          "lightness": 40
        }, {
          "visibility": "on"
        }]
      }, {
        "featureType": "transit",
        "stylers": [{
          "saturation": -100
        }, {
          "visibility": "simplified"
        }]
      }, {
        "featureType": "administrative.province",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [{
          "visibility": "on"
        }, {
          "lightness": -25
        }, {
          "saturation": -100
        }]
      }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "hue": "#ffff00"
        }, {
          "lightness": -25
        }, {
          "saturation": -97
        }]
      }];

      // call map with long and lat
      var map = function(lat, lng) {
        console.log("latitude: " + lat + "/" + lng)
        var myMarker;

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

            var styledMap = new google.maps.StyledMapType(styles, {
              name: "Styled Map"
            });

            var gpsIcon = new google.maps.MarkerImage(
              '/images/bluedot_retina.png',
              null, // size
              null, // origin
              new google.maps.Point(8, 8),
              new google.maps.Size(17, 17)
            );

            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');
            //centre map on latlng in current user profile
            map.setCenter(new google.maps.LatLng(lat, lng));



            //initializes a variable to cache all visible markers on the page
            //used for deleting markers (hopefully)
            markers = {};

            //initialize an empty info window
            var infowindow = new google.maps.InfoWindow();

            //drop a single pin and attach info window
            //adds the userID to the pin itself

            var dropSinglePin = function(userId, user) {
              var marker = new google.maps.Marker({
                position: new google.maps.LatLng(
                  user.profile.location.lat, 
                  user.profile.location.lng
                ),
                map: map,
                animation: google.maps.Animation.DROP,
                icon: gpsIcon,
                visible: true,
                title: user.services.facebook.first_name,
                userId: userId
              });

              //pushes the marker into the markers object
              markers[userId] = marker;

              // populate other users markers with infowindows containing their names
              // info window is generated on the fly on each click
              google.maps.event.addListener(marker, 'click', function(){
                var markerUser = Meteor.users.findOne({_id: this.userId});
                var pictureUrl = markerUser.profile.picture.split('');
                  debugger;
                var smallPictureUrl;
                for (i = 0; i == pictureUrl.length -5; i++) {
                  smallPictureUrl.push(pictureUrl[i]);
                  console.log(smallPictureUrl);
                };
                infowindow.setContent('\
                  <div class="map-info-window">\
                  <h1>' + markerUser.services.facebook.first_name + '</h1>\
                  <p>Destination: ' + markerUser.profile.destination + '</p>\
                  <p>Last update: ' + markerUser.profile.about + '</p>\
                  <img src=' + markerUser.profile.picture + '/>\
                  </div>');
                infowindow.open(map,marker);
              });

            };


            // not working
            // removeSinglePin = function(markers, markerId) {
            //   marker = markers[markerId];
            //   marker.setMap(null);
            //   marker = null;

            //   delete markers[markerId];
            // };


            var onlineUsers = Meteor.users.find({}).fetch();
            //draw other users markers on the map
            for ( index in onlineUsers ) {

              if ( onlineUsers[index]._id === Meteor.userId() ){
                //do some custom code for yourself
              };
              dropSinglePin(onlineUsers[index]._id, onlineUsers[index]);
               
            };

            // checks for changes in count of users currently online
            Meteor.users.find().observeChanges({
              'added': function(userId, addedUser) {

                dropSinglePin(userId, addedUser);
              },
              // 'removed': function(userId){
              //   removeSinglePin(markers, userId);
              // }
            });

          }
        );
      };

      //executes if geolocation not found
      var error = function(position) {
        console.log("error");
        var lat = 22.284584,
            lng = 114.158212;
        map(lat, lng);
        alert("position not found, setting default"); // create an alert or something better here to tell the user that the position was not able to be found
      };

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
        Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.location": locationHash} });
      };
        // draw map after getting users position data
      var getPositionByBrowser = function() {
        navigator.geolocation.getCurrentPosition(afterPositionInfo, error); //afterPositionInfo for callback function, error if geolocation unsuccessful
        return false;
      };
        //draw map without getting geolocation data
      var mapWithExistingPosition = function() {
        var lat = Meteor.user().profile.location.lat,
            lng = Meteor.user().profile.location.lng;
        map(lat, lng);
      }

      // check to see if location data is x minutes old, update if it is
      var time = Date.now();
      if (Meteor.user().profile.location === undefined) {
        console.log('un');
        Meteor.users.update({
          _id: Meteor.userId()
        }, {
          $set: {
            "profile.location": {
              lat: 22.284584,
              lng: 114.158212,
              updatedAt: time
            }
          }
        });
        getPositionByBrowser();
      } else if (time >= Meteor.user().profile.location.updatedAt + 1000 * 60 * 5) {
        getPositionByBrowser();
      } else {
        mapWithExistingPosition();
      }

    };

  };

};

