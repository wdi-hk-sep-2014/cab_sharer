Template.loggedIn.rendered = function() {


  if (Meteor.isClient) {

    if (Meteor.userId()) {

      var currentUserDistancePreferences = Meteor.user().profile.distancePrefs;
      // if (Meteor.user().profile.location.lat != undefined) {        
      //   var currentUserPosition = 
      //   {
      //       lat: Meteor.user().profile.location.lat,
      //       lng: Meteor.user().profile.location.lng
      //   };
      // };

      
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
              zoom: 14,
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
            //centre map on the latlng in current user profile
            map.setCenter(new google.maps.LatLng(lat, lng));



            //initializes a variable to cache all visible markers on the page
            //used for deleting markers
            markers = {};

            //initialize an empty info window
            var infowindow = new google.maps.InfoWindow();

            //drop a single pin and attach info window
            //adds the userID to the pin itself
            var getDistanceBetweenTwoPoints = function(lat1, lon1, lat2, lon2, unit) {
              var radlat1 = Math.PI * lat1/180
              var radlat2 = Math.PI * lat2/180
              var radlon1 = Math.PI * lon1/180
              var radlon2 = Math.PI * lon2/180
              var theta = lon1-lon2
              var radtheta = Math.PI * theta/180
              var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
              dist = Math.acos(dist)
              dist = dist * 180/Math.PI
              dist = dist * 60 * 1.1515
              if (unit=="K") { dist = dist * 1.609344 }
              if (unit=="N") { dist = dist * 0.8684 }
              return dist          
            };
            var dropSinglePin = function(userId, user) {
              if (getDistanceBetweenTwoPoints(Meteor.user().profile.location.lat, Meteor.user().profile.location.lng, user.profile.location.lat, user.profile.location.lng, "K") <= currentUserDistancePreferences) {
                console.log(userId + "'s marker less than " + currentUserDistancePreferences + " from " + Meteor.userId());
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
                  var smallPictureUrl = markerUser.profile.picture.split('').slice(0,-5).join('');
                    infowindow.setContent('\
                    <div class="map-info-window">\
                    <h1>' + markerUser.services.facebook.first_name + '</h1>\
                    <p>Destination: ' + markerUser.profile.destination + '</p>\
                    <p>Last update: ' + markerUser.profile.about + '</p>\
                    <img src=' + smallPictureUrl + 'small>\
                    </div>');
                  infowindow.open(map,marker);
                });
              }
            };

            removeSinglePin = function(markers, markerId) {
              if (markerId != Meteor.userId()) {
                marker = markers[markerId];
                marker.setMap(null);
                marker = null;

                delete markers[markerId]; 
              }
            };


            // var onlineUsers = Meteor.users.find({}).fetch();

            // //draw other users markers on the map
            // // for ( index in onlineUsers ) {
            // //     debugger;     
            // //     dropSinglePin(onlineUsers[index]._id, onlineUsers[index]);
            // //   }
            //   // if ( onlineUsers[index]._id === Meteor.userId() ){
            //     //do some custom code
            // };

            // checks for changes in count of users currently online
            if (Meteor.userId()) {
              // Meteor.users.find({ "status.online": true }).observe({ <---- why does 'added' not fire with this bit of code??
              Meteor.users.find().observeChanges({
                'added': function(userId, addedUser) {
                  console.log("observeChanges ('added') fired");
                  console.log("userId :" + userId);
                  console.log("addedUser :" + addedUser);
                  if (addedUser.services === undefined || addedUser.profile.location === undefined) {
                    // debugger;
                    // Meteor.users.upsert({_id: Meteor.userId()}, {$set: {"profile.location": {lat: "xx", lng: "xx", updatedAt: "xx"}} });
                    console.log ("services or location was not defined for" + addedUser + " of the id: " + userId)
                  } else {
                    dropSinglePin(userId, addedUser);                                   
                  };
                },
                // 'changed': function(userId, changedFields) {
                //   console.log("observeChanges ('changed') fired");
                //   var user = Meteor.user.findOne(userId);
                //   if (user.services === undefined || user.profile.location === undefined){
                //     console.log("users changed, but no services or location");
                //   } else {
                //     dropSinglePin(userId, addedUser);
                //   };
                // },
                'removed': function(userId){
                  console.log("observeChanges ('removed') fired");
                  if (userId in markers) {
                    removeSinglePin(markers, userId);
                  }
                }
              });              
            }

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
      // if (Meteor.user().profile.location === undefined) {
      //   console.log('Meteor.user(),profile.location === undefined');
      //   Meteor.users.update({
      //     _id: Meteor.userId()
      //   }, {
      //     $set: {
      //       "profile.location": {
      //         lat: 22.284584,
      //         lng: 114.158212,
      //         updatedAt: time
      //       }
      //     }
      //   });
      //   getPositionByBrowser();
      // } else if (time >= Meteor.user().profile.location.updatedAt + 1000 * 1 * 60 * 5) {
        getPositionByBrowser();
      // } else {
      //   mapWithExistingPosition();
      // }

    };

  };

};

