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
    var conversationIdArray = [];
    for (i = 0; i < currentConversations.length; i++){
      conversationIdArray.push(currentConversations[i]._id)
    }
    var conversationArray = [];
    for (i = 0; i < conversationIdArray.length; i++){
      if (ConversationReferences.findOne({conversationReference: conversationIdArray[i]}).partyTwo == Meteor.userId()){
        conversationArray.push(ConversationReferences.findOne({conversationReference: conversationIdArray[i]}).partyOne);        
      } else {
        conversationArray.push(ConversationReferences.findOne({conversationReference: conversationIdArray[i]}).partyTwo);
      }
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