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
    var currentConversations = ConversationReferences.find({$or: [{idOne: Meteor.userId()}, {idTwo: Meteor.userId()}]}).fetch();
    var activeConversations = [];
    for (i = 0; i < currentConversations.length; i++){
      if(currentConversations[i].idOne === Meteor.userId()){
        activeConversations.push(currentConversations[i].partyTwo)
      } else {
        activeConversations.push(currentConversations[i].partyOne)
      };
    };
    return activeConversations;
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
});