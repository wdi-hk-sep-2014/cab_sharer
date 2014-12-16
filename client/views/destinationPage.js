
Template.destinationPage.helpers({
  displayUser: function() {
    return Meteor.user().profile.name;
  }
});

Template.hkIslandDestinations.events({
  'change': function(event, template){
    var pickedDestination = template.find('#hki-destinations').value;
    var destinationMap;
    function initialize() {
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
      var mapOptions = {
        zoom: 16,
        streetViewControl: false,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style'],
        center: new google.maps.LatLng(22.284584, 114.158212)
      };
      var styledMap = new google.maps.StyledMapType(styles, {
        name: "Styled Map"
      });
      destinationMap = new google.maps.Map(document.getElementById('destination-map'), mapOptions);
      destinationMap.mapTypes.set('map_style', styledMap);
      destinationMap.setMapTypeId('map_style');      
    };
    Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.destination": pickedDestination}});
    initialize();
  }
});
