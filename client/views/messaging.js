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
  activeConversations: function(){
    var conversationUsers = Conversations.find({$or: [{targetUserId: Meteor.user()._id},{sentUserId: Meteor.userId()}]}).fetch();
    var userResults = [];
    for (i = 0; i < conversationUsers.length; i++){
      if (conversationUsers[i].activeUsers.sender != Meteor.user().services.facebook.first_name) {
        userResults.push(conversationUsers[i].activeUsers.sender);
      } else { 
        userResults.push(conversationUsers[i].activeUsers.receiver);
      };
      console.log(userResults);
    return userResults;
    };
  }
});
 
// Template.messaging.events({
//   'change': function(event, template){
//     var messageContent = template.find('#message-contents').value;
//     console.log(messageContent);
//     Meteor.call('createMessage', {sentUserId: Meteor.user()._id, messageContent: messageContent, targetUserId: Session.get('userIdForMessage')});
//   }
// })