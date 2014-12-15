Meteor.publish("OnUsers", function() {
  return Meteor.users.find({ "status.online": true }, {fields: { "profile.location": true, "profile.name": true , "profile.destination": true}}); //sending online users and their locations to the client
});