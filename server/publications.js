Meteor.publish("Users", function(status) {
  if (status === "online"){
    return Meteor.users.find({ "status.online": true }, {fields: { "_id": true, "profile.about": true, "profile.location": true, "profile.destination": true, "services.facebook.first_name" : true}}); //sending online users and their locations to the client
  } else {
    return Meteor.users.find({});
  }
});