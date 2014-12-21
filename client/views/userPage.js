Template.userPage.helpers({
    displayUser: function() {
      return Meteor.user().profile.name;
      }
});

Template.userPage.events({
  'click #logout': function(event){
    Meteor.logout(function(){
      Router.go('/');
    });
  },
  'submit form': function(event, template){
    event.preventDefault();
    var formContents = template.find('#bio').value;
    Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.about": formContents}});
  }
});

// NEED TO MAKE DRY
