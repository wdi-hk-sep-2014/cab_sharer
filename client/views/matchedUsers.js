Template.matchedUsers.helpers({
  displayLocation: function() {
    return Meteor.user().profile.destination;
  },
  matchingUsers: function() {
    var onlineUsersExceptMe = Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch();
    var usersWithSameDestination = [];
    for (index in onlineUsersExceptMe) {
      if (onlineUsersExceptMe[index].profile.destination === Meteor.user().profile.destination){
        usersWithSameDestination.push(onlineUsersExceptMe[index].profile.name);
      };
    }
    console.log(usersWithSameDestination);
    return usersWithSameDestination;
    // return onlineUsersExceptMe.find({'profile.destination': Meteor.user().profile.destination }).fetch();
  }
});

Template.matchingUser.helpers({
  name: function() {
    return this.toString();
  }
});