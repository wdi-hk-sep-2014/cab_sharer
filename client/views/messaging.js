Template.messaging.helpers({
  currentUser: function(){
    return Meteor.user().profile.name;
  },
  sentMessages: function(){
    return Messages.find().fetch();
  }
})
 
Template.messaging.events({
  'change': function(event, template){
    var messageContent = template.find('#message-contents').value;
    console.log(messageContent);
    Meteor.call('createMessage', {sentUserId: Meteor.user()._id, messageContent: messageContent});
  }
})