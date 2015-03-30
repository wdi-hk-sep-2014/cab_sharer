Template.showConversation.helpers({
  otherParty: function(){
    if (Session.get('conversationId').activeUsers.receiver === Meteor.user().services.facebook.first_name){
      return Session.get('conversationId').activeUsers.sender      
    } else { return Session.get('conversationId').activeUsers.receiver
    }
  }
});

Template.showConversation.events({
    'keyup #messaging-form': function(event, template){
    if (event.which === 13){
      event.preventDefault();
      var currentMessage = template.find('#messaging-form').value;
      console.log(currentMessage);
      if (currentMessage.length != 0) {
        Meteor.call('createMessage', Session.get('conversationId').conversationId, {conversationId: Session.get('conversationId').conversationId, sentUserId: Meteor.user()._id, targetUserId: Session.get('conversationId').targetUserId, activeUsers:{sender: Meteor.user().services.facebook.first_name, receiver: Session.get('conversationId').activeUsers.receiver}}, {messageContent: {text:currentMessage, writtenBy:Meteor.userId()}});
        $('#messaging-form').val('');
      }
    }
  }
});



Template.showConversation.rendered = function(){
    var myMessageClass = "." + Meteor.userId()
    var otherPersonsMessageClass = "." + Session.get('conversationId').sentUserId;
    Session.set('amountOfSentMessages', $(myMessageClass).size());
    Session.set('amountOfReceivedMessages', $(otherPersonsMessageClass).size());
    Session.set('totalMessages', Session.get('amountOfReceivedMessages') + Session.get('amountOfSentMessages'));
    console.log(Session.get('totalMessages'));
    $(myMessageClass).addClass('sent');
    $(otherPersonsMessageClass).addClass('received');

};