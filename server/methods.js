Meteor.methods({

  'geocode':function(location) {
    var geo = new GeoCoder({
      // geocoderProvider: "mapquest",
      httpAdapter: "https",
      // apiKey: 'Fmjtd%7Cluurn16b21%2C20%3Do5-9wts54'
      // apiKey: 'fakey'
      // apiKey: 'Fmjtd%7Cluu8210t2g%2Ca5%3Do5-94rx50'
    });
    var geocodeResult = geo.geocode(location);
    return geocodeResult;
  },

  createMessage: function(query, message, messageText){
    var id = new RegExp(query);
    if (Conversations.findOne({_id:id})){
      Conversations.update(id, {$push: messageText}, {upsert: true});
    } else {
      Conversations.upsert(id, {$set:message, $push: messageText});
    }
  },
  createConversation: function(conversation){
    Conversations.insert(conversation);
  },
  createConversationReference: function(conversationRef){
    ConversationReferences.insert(conversationRef)
  }
});