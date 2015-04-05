Template.messaging.helpers({
  currentConversations: function(){
    //need to return: user name of other party, id of conversation for link, last message exchanged between the two.
    allInfoRequired = {} ;

    entireConversationInfo = Conversations.find().fetch();



    allInfoRequired.conversationInformation = [];
    for (i = 0; i<entireConversationInfo.length ; i++){
      if(entireConversationInfo[i].activeUsers.sender == Meteor.user().services.facebook.first_name){
        allInfoRequired.conversationInformation.push({"_id" : entireConversationInfo[i]._id, "otherParty": entireConversationInfo[i].activeUsers.receiver, "lastMessage": ""});        
      } else {
        allInfoRequired.conversationInformation.push({"_id" : entireConversationInfo[i]._id, "otherParty": entireConversationInfo[i].activeUsers.sender, "lastMessage": ""});        
      }      
    }
    for (i = 0; i<entireConversationInfo.length ; i++){
      if(entireConversationInfo[i].messageContent != undefined){
        allInfoRequired.conversationInformation[i].lastMessage = entireConversationInfo[i].messageContent.slice(-1)[0].text
        console.log(allInfoRequired);
      }
    }
    return allInfoRequired;
  }
})

