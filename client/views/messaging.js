Meteor.subscribe('receivedMessages');
Meteor.subscribe('sentMessages');

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
    var currentConversations = Conversations.find({conversationId: new RegExp(Meteor.userId())}).fetch();
    var conversationArray = [];
    for (i = 0; i < currentConversations.length; i++){
      if (currentConversations[i].sentUserId != Meteor.userId()) {
        conversationArray.push(currentConversations[i].activeUsers.sender);
      } else {
        conversationArray.push(currentConversations[i].activeUsers.receiver);
      };
    };
    console.log(conversationArray)
    return conversationArray;
  }
  // }
  // activeConversations: function() {
  //   var currentConversations = Conversations.find({conversationId: new RegExp(Meteor.userId())}).fetch();
  //   var conversationArray = [];
  //   for (i = 0; i < currentConversations.length; i++){
  //     conversationArray.push(currentConversations[i]);
  //   };
  //   console.log(conversationArray);
  //   return conversationArray;
  // }
});

Template.conversations.helpers({
  conversationContent: function(){
    var currentConversations = Conversations.find({conversationId: new RegExp(Meteor.userId())}).fetch();
    var lastActiveMessages = [];
    for (i = 0; i < currentConversations.length; i++){
      lastActiveMessages.push(currentConversations[i].messageContent.slice(-1)[0]);
    };
    console.log(lastActiveMessages);
    return lastActiveMessages;    
  }
})