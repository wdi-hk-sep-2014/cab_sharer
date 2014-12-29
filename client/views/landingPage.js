if (Meteor.isClient) {

  Template.landingTemplate.events({
    'click #facebook-login-button': function () {
      event.preventDefault();
      console.log('loginWithFacebook');
      Meteor.loginWithFacebook({
          requestPermissions: ['email']
      }, function (err) {
        if(err) {
            console.log('loginWithFacebook error');
        } else {
            console.log('login success');
            if (Meteor.user().profile.about === undefined && Meteor.user().profile.destination === undefined) {
              Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.destination": "Central", "profile.about": "Please say a few words about yourself!", "profile.distancePrefs": 0.5, "profile.location.lat": 22.281719, "profile.location.lng": 114.15696500000001, "profile.location.updatedAt": Date.now()}}); //i need to get users current location on account creation to prevent pins not being drawn
              console.log("Update Success");
            }
            Router.go('/');
        }
      });
    }
  });
}