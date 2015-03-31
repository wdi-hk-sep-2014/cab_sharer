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

Template.showConversation.rendered = function() {
  var myMessageClass = "." + Meteor.userId();
  var setCss = function(){
    $(myMessageClass).addClass('sent');
  }();
  // Conversations.find().observe({
    // 'changed': function(){
    //   var lastMessageClass = "." + Session.get('conversationId').messageContent.slice(-1)[0].writtenBy
    //   console.log(lastMessageClass);
    //   if (lastMessageClass == Meteor.userId()){
    //     $(lastMessageClass).last().addClass('received')
    //     } else { $(lastMessageClass).last().addClass('sent')
    //   }
    // }
  // });
  Conversations.find().observe({
    'changed': function(){
    var convoList    = $('.scrollable');
    var height = convoList[0].scrollHeight;
    setTimeout(function(){
      convoList.scrollTop(height);
    }, 50);
    var lastMessageClass = "." + Session.get('conversationId').messageContent.slice(-1)[0].writtenBy
    console.log(lastMessageClass);
    setTimeout(function(){
      if (lastMessageClass == Meteor.userId()){
        $(lastMessageClass).last().addClass('received')
        } else { $(lastMessageClass).last().addClass('sent')
      }
    }, 50);
    }
  })
}