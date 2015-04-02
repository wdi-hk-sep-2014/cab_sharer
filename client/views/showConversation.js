Template.showConversation.helpers({
  otherParty: function(){
    if (Session.get('conversationId').activeUsers.receiver === Meteor.user().services.facebook.first_name){
      return Session.get('conversationId').activeUsers.sender      
    } else { return Session.get('conversationId').activeUsers.receiver
    }
  },
  profilePicture: function() {
    var userPictures = [];
    var allMessages = Conversations.findOne({id: Session.get('conversationId.conversationId')}).messageContent.sort({sentAt: -1});
    for (i=0; i<allMessages.length; i++){
      if (allMessages[i].writtenBy == Meteor.userId()){
        userPictures.push(Meteor.user().profile.picture);
      } else {
        userPictures.push(Meteor.users.findOne({_id: allMessages[i].writtenBy}).profile.picture);
      }
    }
    console.log(userPictures);
    return userPictures;
  },
  sentMessages: function() {
    var htmlMessages = [];
    var allMessages = Conversations.findOne({id: Session.get('conversationId.conversationId')}).messageContent.sort({sentAt: -1});
    for (i=0; i<allMessages.length; i++){
      if (allMessages[i].writtenBy == Meteor.userId()){
        htmlMessages.push("<li class=\"conversation-list received\">" + Session.get('conversationId').messageContent[i].text + "</li>");        
      } else {
        htmlMessages.push("<li class=\"conversation-list sent\">" + Session.get('conversationId').messageContent[i].text + "</li>"); 
      }
    }
    return htmlMessages;
  },
  conversationContent: function() {
    var htmlMessagesAndPictures = { messageHTML: [], profilePictureOne: "http://graph.facebook.com/", profilePictureTwo: "http://graph.facebook.com/"};
    var allMessages = Conversations.findOne({id: Session.get('conversationId.conversationId')}).messageContent.sort({sentAt: -1});
    for (i=0; i<allMessages.length; i++){
      if (allMessages[i].writtenBy == Meteor.userId()){
        htmlMessagesAndPictures.messageHTML.push("<li class=\"conversation-list received\">" + Session.get('conversationId').messageContent[i].text + "</li>"); 
        htmlMessagesAndPictures.profilePictureOne = Meteor.user().profile.picture;
      } else {
        htmlMessagesAndPictures.messageHTML.push("<li class=\"conversation-list sent\">" + Session.get('conversationId').messageContent[i].text + "</li>"); 
        htmlMessagesAndPictures.profilePictureTwo = Meteor.users.findOne({_id: allMessages[i].writtenBy}).profile.picture;
      };
    };
    return htmlMessagesAndPictures;
  }
});

Template.showConversation.events({
    'keyup #messaging-form': function(event, template){
    if (event.which === 13){
      event.preventDefault();
      var currentMessage = template.find('#messaging-form').value;
      var date = new Date();
      var isoDate = date.toISOString()
      if (currentMessage.length != 0) {
        Meteor.call('createMessage', Session.get('conversationId').conversationId, {conversationId: Session.get('conversationId').conversationId, sentUserId: Meteor.user()._id, targetUserId: Session.get('conversationId').targetUserId, activeUsers:{sender: Meteor.user().services.facebook.first_name, receiver: Session.get('conversationId').activeUsers.receiver}}, {messageContent: {text:currentMessage, writtenBy:Meteor.userId(), sentAt: isoDate}});
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