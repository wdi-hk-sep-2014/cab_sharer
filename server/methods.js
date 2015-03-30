Meteor.methods({

  addPositionToLoggedInUser: function(location, userid){
    OnlineUsers.update({ userId: userid}, {$set: location});
  },

  'geocode':function(location) {
    var geo = new GeoCoder({
      // geocoderProvider: "mapquest",
      httpAdapter: "https",
      // apiKey: 'Fmjtd%7Cluurn16b21%2C20%3Do5-9wts54'
      // apiKey: 'fakey'
      // apiKey: 'Fmjtd%7Cluu8210t2g%2Ca5%3Do5-94rx50'
    });
    var geocodeResult = geo.geocode(location);
    console.log(geocodeResult);
    return geocodeResult;
  },

  createMessage: function(query, message, messageText){
    var id = new RegExp(query);
    if (Conversations.findOne(id)){
      Conversations.update(id, {$push: messageText}, {upsert: true});
    } else {
      Conversations.upsert(id, {$set:message, $push: messageText});
    }
  }
});