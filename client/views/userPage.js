Template.userPage.helpers({
    displayUser: function() {
      if (Meteor.user().profile) {
        return Meteor.user().profile.name;
      } else {
        Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.name": "Please Set a Name!"} });

      }
    }
});

// NEED TO MAKE DRY