// var matchedClicked = true;
// setMatchClicked = function(){
//   matchedClicked = true;
// };


fetchUsers = function(){
  var onlineUsersExceptMe = Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch();
  var onlineUsers = Meteor.users.find().fetch();
  usersWithSameDestination = [];
  for (index in onlineUsersExceptMe) {
    if (onlineUsersExceptMe[index].profile.destination === Meteor.user().profile.destination){
      usersWithSameDestination.push(onlineUsersExceptMe[index]);
    };
  }
  return usersWithSameDestination;
};

Template.matchedUsers.helpers({

  displayLocation: function() {
    return Meteor.user().profile.destination;
  },
  
  matchingUsers: function() {
    return usersWithSameDestination;
  }
});

Template.matchingUser.helpers({

  name: function() {
    var user = {
      name: this.services.facebook.first_name,
      _id: this._id
    };
    return user.name;
  },
  profile: function() {
    var user = {
    picture: this.profile.picture,
    _id: this._id
    };
    return user.picture;
  },
  targetId: function() {
    var user = {
      _id: this._id
    };
    return user._id
  }
});

Template.matchingUser.events({

  'click #message-button': function(){
    // if (matchedClicked) {
    //   $('#matched-users-header').addClass('animated flipOutY');
    //   setTimeout(function(){
    //     $('#matched-users-header').text('Send a Message');
    //     $('#matched-users-header').removeClass('animated flipOutY');
    //     $('#matched-users-header').addClass('animated flipInY');
    //   }, 1000);
    //   $('#messaging').css("display", "inline");
    //   $('#options-distance').val(Meteor.user().profile.distancePrefs);
    //   $('#messaging').addClass('animated fadeInRight');
    //   $('#settings-button').prop("disabled", true);
    //   setTimeout(function(){
    //     $('#messaging').removeClass('animated fadeInRight');
    //     $('#settings-button').prop("disabled", false);
    //   }, 1000);
    // } else {
    //   $('#matched-users-header').addClass('animated flipOutY');
    //   setTimeout(function(){
    //     $('#matched-users-header').text('Matching Users');
    //     $('#matched-users-header').removeClass('animated flipOutY');
    //     $('#matched-users-header').addClass('animated flipInY');
    //   }, 1000);      
    //   $('#messaging').addClass('animated fadeOutRight');
    //   $('#settings-button').prop("disabled", true);
    //   setTimeout(function(){
    //     $('#messaging').removeClass('animated fadeOutRight');
    //     $('#messaging').css("display", "none");
    //     $('#settings-button').prop("disabled", false);
    //   }, 1000)
    // }
    // matchedClicked = !matchedClicked;




    // This is buggered! The RegEx is always finding something because it matches ANY conversation which has this user - need better way to give conversations Id's.

    // Session.set('userIdForMessage', $('#message-button').first().val());
    // var targetUserName = Meteor.users.findOne({_id:Session.get('userIdForMessage')}).services.facebook.first_name;
    // var concatIds = Session.get('userIdForMessage').toString() + Meteor.userId();
    // var conversationRegEx = new RegExp(concatIds)
    // if (!Conversations.findOne({_id:conversationRegEx})){
    //   console.log("inside if statement");
    //   Meteor.call('createConversation', concatIds, {conversationId: concatIds, sentUserId: Meteor.user()._id, targetUserId: Session.get('userIdForMessage'), activeUsers:{sender: Meteor.user().services.facebook.first_name, receiver: targetUserName}});
    //   Router.go('/messaging/'+concatIds);      
    // }
    // debugger;
    // var existingConversationId = Conversations.findOne({_id:conversationRegEx});
    // Router.go('/messaging/'+existingConversationId.conversationId);
    var idCallback = function(){
      setTimeout(function(){
        var activeConversation = Conversations.find({$and: [{userIds: Meteor.userId()},{userIds: Session.get('userIdForMessage')}]}).fetch()[0]
        var conversationId = activeConversation._id;
        var partyOne = Meteor.users.findOne({_id: activeConversation.userIds[1]}).services.facebook.first_name;
        var partyTwo = Meteor.users.findOne({_id: activeConversation.userIds[0]}).services.facebook.first_name;
        Meteor.call('createConversationReference', {conversationReference: conversationId, partyOne: partyOne, partyTwo: partyTwo})
        Router.go('/messaging/'+conversationId);
      },500);
    }


    Session.set('userIdForMessage', $('#message-button').first().val());
    var targetUserName = Meteor.users.findOne({_id:Session.get('userIdForMessage')}).services.facebook.first_name;
    if (Conversations.find({$and: [{userIds: Meteor.userId()},{userIds: Session.get('userIdForMessage')}]}).fetch()[0] == undefined){
      Meteor.call('createConversation', {userIds: [Meteor.user()._id, Session.get('userIdForMessage')], activeUsers:{sender: Meteor.user().services.facebook.first_name, receiver: targetUserName}});
      idCallback();      
    } else {
      Router.go('/messaging/'+Conversations.find({$and: [{userIds: Meteor.userId()},{userIds: Session.get('userIdForMessage')}]}).fetch()[0]._id);
    }
  }


});

// setMatchClicked();