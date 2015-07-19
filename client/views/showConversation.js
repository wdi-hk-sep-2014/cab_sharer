//NEED TO ACCOUNT FOR WHEN OTHER USER IS OFFLINE - CHANGE USER RELATED PUBLICATIONS SOMEHOW

Template.showConversation.helpers({
  otherParty: function(){
    if (Session.get('conversationId').activeUsers.receiver === Meteor.user().services.facebook.first_name){
      return Session.get('conversationId').activeUsers.sender      
    } else { return Session.get('conversationId').activeUsers.receiver
    }
  },
  sentMessages: function() {
    var htmlMessages = [];
    if (Conversations.findOne({_id: Session.get('conversationId')._id}).messageContent === undefined){
      return;
    } else {
      var allMessages = Conversations.findOne({_id: Session.get('conversationId')._id}).messageContent.sort({sentAt: -1});
      for (i=0; i<allMessages.length; i++){
        if (allMessages[i].writtenBy == Meteor.userId()){
          htmlMessages.push("<div class=\"row\"><div class=\"col-xs-10 no-right-padding\"><li class=\"conversation-list received\">" + Session.get('conversationId').messageContent[i].text + "</li></div><div class=\"col-xs-2 no-left-padding\"><img class=\"message-pictures\" src=\""+ Meteor.user().profile.picture+"\"/></div></div>");        
        } else {
          if (!Meteor.users.findOne({_id: allMessages[i].writtenBy})){
            htmlMessages.push("<div class=\"row\"><div class=\"col-xs-10 no-right-padding\"><li class=\"conversation-list sent\">" + Session.get('conversationId').messageContent[i].text + "</li></div><div class=\"col-xs-2 no-left-padding\"><img class=\"message-pictures\" src=\"http://david-f.jalbum.net/Pinboard/Folder%20with%20preview/slides/ostrich.jpg\"/></div></div>"); 
          } else {
            htmlMessages.push("<div class=\"row\"><div class=\"col-xs-10 no-right-padding\"><li class=\"conversation-list sent\">" + Session.get('conversationId').messageContent[i].text + "</li></div><div class=\"col-xs-2 no-left-padding\"><img class=\"message-pictures\" src=\""+ Meteor.users.findOne({_id: allMessages[i].writtenBy}).profile.picture+"\"/></div></div>"); 
          }
        }
      }      
    }
    return htmlMessages;
  },
});

Template.showConversation.events({
    'keyup #messaging-form': function(event, template){
    if (event.which === 13){
      event.preventDefault();
      var currentMessage = template.find('#messaging-form').value;
      var date = new Date();
      var isoDate = date.toISOString()
      if (currentMessage.length != 0) {
        Meteor.call('createMessage', Session.get('conversationId')._id, {activeUsers:{sender: Session.get('conversationId').activeUsers.sender, receiver: Session.get('conversationId').activeUsers.receiver}}, {messageContent: {text:currentMessage, writtenBy:Meteor.userId(), sentAt: isoDate}});
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
  Conversations.find().observe({
    'changed': function(){
    var convoList    = $('.scrollable');
    var height = convoList[0].scrollHeight;
    setTimeout(function(){
      convoList.scrollTop(height);
    }, 50);
    }
  })
}