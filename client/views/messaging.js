Template.messaging.helpers({

  currentUser: function(){
    return Meteor.user().profile.name;
  },
  sentMessages: function(){
    return Conversations.find({sentUserId: Meteor.userId()}).fetch();
  },
  receivedMessages: function(){
    return Conversations.find({targetUserId: Meteor.user()._id}, {sentUserId: Meteor.userId()}).fetch(); 
  },
  activeConversations: function() {
    var currentConversations = Conversations.find({userIds: {"$in" : [Meteor.userId()]}}).fetch();
    var conversationArray = [];
    for (i = 0; i < currentConversations.length; i++){
      if (currentConversations[i].userIds[1] != Meteor.userId()) {
        conversationArray.push(Meteor.users.findOne(currentConversations[i].userIds[1]).services.facebook.first_name);
      } else {
        conversationArray.push(Meteor.users.findOne(currentConversations[i].userIds[0]).services.facebook.first_name);
      };
    };
    console.log(conversationArray)
    return conversationArray;
  }
});

Template.conversations.helpers({
  conversationContent: function(){
    var currentConversations = Conversations.find({userIds: {"$in" : [Meteor.userId()]}}).fetch();
    var lastActiveMessages = [];
    for (i = 0; i < currentConversations.length; i++){
      lastActiveMessages.push(currentConversations[i].messageContent.slice(-1)[0].text);
    };
    console.log(lastActiveMessages);
    return lastActiveMessages;    
  },
  linkById: function(){
    var currentConversations = Conversations.find({userIds: {"$in" : [Meteor.userId()]}}).fetch();
    var messageLinks = [];
    for (i = 0; i < currentConversations.length; i++){
      messageLinks.push(currentConversations[i]._id)
    };
    console.log(messageLinks);
    return messageLinks;
  }
})