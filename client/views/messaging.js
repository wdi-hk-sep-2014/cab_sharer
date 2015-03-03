Meteor.subscribe('receivedMessages');
Meteor.subscribe('sentMessages');

Template.messaging.helpers({
  currentUser: function(){
    return Meteor.user().profile.name;
  },
  sentMessages: function(){
    return Messages.find({sentUserId: Meteor.userId()}).fetch();
  },
  receivedMessages: function(){
    return Messages.find({targetUserId: Meteor.user()._id}).fetch();
  }
})
 
// Template.messaging.events({
//   'change': function(event, template){
//     var messageContent = template.find('#message-contents').value;
//     console.log(messageContent);
//     Meteor.call('createMessage', {sentUserId: Meteor.user()._id, messageContent: messageContent, targetUserId: Session.get('userIdForMessage')});
//   }
// })