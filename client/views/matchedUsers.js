var matchedClicked = true;
setMatchClicked = function(){
  console.log(matchedClicked);
  console.log("setClicked fired");
  matchedClicked = true;
};


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

Template.matchedUsers.events({
    'keyup #message-field': function(event, template){
    if (event.which === 13){
      event.preventDefault();
      var currentMessage = template.find('#message-field').value;
      if (currentMessage.length != 0) {
        var targetUserName = Meteor.users.findOne({_id:Session.get('userIdForMessage')}).services.facebook.first_name
        console.log(targetUserName);
        Meteor.call('createMessage', {sentUserId: Meteor.user()._id, messageContent: currentMessage, targetUserId: Session.get('userIdForMessage'), sentTo:targetUserName})
        $('#message-field').val('');
      }
      console.log(currentMessage);
      console.log("submitted");
    }
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
    console.log(matchedClicked);
    if (matchedClicked) {
      $('#matched-users-header').addClass('animated flipOutY');
      setTimeout(function(){
        $('#matched-users-header').text('Send a Message');
        $('#matched-users-header').removeClass('animated flipOutY');
        $('#matched-users-header').addClass('animated flipInY');
      }, 1000);
      $('#messaging').css("display", "inline");
      $('#options-distance').val(Meteor.user().profile.distancePrefs);
      $('#messaging').addClass('animated fadeInRight');
      $('#settings-button').prop("disabled", true);
      setTimeout(function(){
        $('#messaging').removeClass('animated fadeInRight');
        $('#settings-button').prop("disabled", false);
      }, 1000);
    } else {
      console.log("in else");
      $('#matched-users-header').addClass('animated flipOutY');
      setTimeout(function(){
        $('#matched-users-header').text('Matching Users');
        $('#matched-users-header').removeClass('animated flipOutY');
        $('#matched-users-header').addClass('animated flipInY');
      }, 1000);      
      $('#messaging').addClass('animated fadeOutRight');
      $('#settings-button').prop("disabled", true);
      setTimeout(function(){
        $('#messaging').removeClass('animated fadeOutRight');
        $('#messaging').css("display", "none");
        $('#settings-button').prop("disabled", false);
      }, 1000)
    }
    matchedClicked = !matchedClicked;
    Session.set('userIdForMessage', $('#message-button').first().val());
  }


});

setMatchClicked();