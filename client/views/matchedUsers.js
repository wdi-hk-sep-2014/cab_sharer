Template.matchedUsers.helpers({

  displayLocation: function() {
    return Meteor.user().profile.destination;
  },
  
  matchingUsers: function() {
    var onlineUsersExceptMe = Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch();
    var usersWithSameDestination = [];
    for (index in onlineUsersExceptMe) {
      if (onlineUsersExceptMe[index].profile.destination === Meteor.user().profile.destination){
        usersWithSameDestination.push(onlineUsersExceptMe[index].profile.firstName + ' ' + onlineUsersExceptMe[index].profile.lastName);
      };
    }
    console.log(usersWithSameDestination);
    return usersWithSameDestination;
    // return onlineUsersExceptMe.find({'profile.destination': Meteor.user().profile.destination }).fetch();
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
      firstName: this.profile.firstName, 
      lastName: this.profile.lastName,
      _id: this._id
    };
    return user;
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