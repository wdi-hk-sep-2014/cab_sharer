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
  var list = Conversations.find({userIds: {"$in" : [this.userId]}}).fetch();
  var referencesToSearchFor = [];
  for (i = 0; i < list.length; i++){
    referencesToSearchFor.push(list[i]._id)
  };
  var returnedArray = [Conversations.find({userIds: {"$in" : [this.userId]}})];
  for (i = 0; i<referencesToSearchFor.length; i++){
    returnedArray.push(ConversationReferences.find({conversationReference: referencesToSearchFor[i]}));
  }
  return returnedArray;
});

