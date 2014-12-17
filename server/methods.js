Meteor.methods({

  addPositionToLoggedInUser: function(location, userid){
    OnlineUsers.update({ userId: userid}, {$set: location});
  },

  'geocode':function(location) {
    var geo = new GeoCoder({
      geocoderProvider: "mapquest",
      httpAdapter: "https",
      apiKey: 'Fmjtd%7Cluurn16b21%2C20%3Do5-9wts54'
    });
    var geocodeResult = geo.geocode(location);
    console.log(geocodeResult);
    return geocodeResult;
  }
});