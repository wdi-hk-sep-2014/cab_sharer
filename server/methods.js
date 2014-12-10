Meteor.methods({

  addPositionToLoggedInUser: function(location, userid){
    OnlineUsers.update({ userId: userid}, {$set: location});
  }


});