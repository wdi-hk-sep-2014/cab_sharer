if (Meteor.isClient) {

  Template.landingTemplate.events({
    'click #facebook-login-button': function () {
      event.preventDefault();
      console.log('log loginWithFacebook');
      Meteor.loginWithFacebook({
          requestPermissions: ['email']
      }, function (err) {
        if(err) {
            console.log('loginWithFacebook error');
        } else {
            console.log('login success');
            if (Meteor.user().profile.about === undefined && Meteor.user().profile.destination === undefined) {
              Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.destination": "Central", "profile.about": "Please say a few words about yourself!"}});
              console.log("Update Success");
            }
            Router.go('/');
        }
      });
    }
  });
}