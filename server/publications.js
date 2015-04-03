Meteor.publish("Users", function(status) {
  if (status === "online"){
    return Meteor.users.find({ "status.online": true }, {fields: { "_id": true, "profile.about": true, "profile.location": true, "profile.destination": true, "services.facebook.first_name" : true, "profile.picture" : true, "profile.distancePrefs" : true}}); //sending online users and their locations to the client
  } else {
    return Meteor.users.find({});
  }
});


Meteor.publish("sentMessages", function(){
  return Conversations.find({sentUserId: this.userId});
});

Meteor.publish("receivedMessages", function(){
  return Conversations.find({targetUserId: this.userId});
});

Meteor.publish("usersConversations", function(){
  return Conversations.find({userIds: {"$in" : [this.userId]}});
});