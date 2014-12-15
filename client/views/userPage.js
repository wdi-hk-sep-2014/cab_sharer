Template.userPage.helpers({
  displayUser: function() {
    return Meteor.user().profile.name;
  }
});

// NEED TO MAKE DRY