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
  },

  modalUser: function() {
    var userId = Session.get('user-id-for-modal');
    var user = Meteor.users.findOne({_id: userId});
    return user;
  }
});

Template.matchingUser.helpers({

  name: function() {
    var user = {
      name: this.services.facebook.first_name,
      _id: this._id
    };
    return user.name;
  }

});

Template.matchingUser.events({

  'click .matched-user': function(){
    console.log("clicked");
    var userId = this._id;
    Session.set('user-id-for-modal', userId);
    $('#user-modal').modal();
  },

});