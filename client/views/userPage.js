animateWarning = function(appendTarget) {

  var element = document.createElement("h1");
            element.id = "fill-details-prompt";
            element.innerHTML = "Please enter your details";
            $('.button-container').append(element);
            $('#form-not-filled-warning-anim').addClass("animated fadeInUp");
            $('#login-button').prop("disabled", true);
            setTimeout(function(){
              $('#form-not-filled-warning-anim').addClass("animated fadeOutDown");
            }, 1000);        
}

Template.userPage.helpers({
    displayUser: function() {
      if (Meteor.user().profile) {
        return Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName;
      } else { 
        animateWarning($('.button-container'));
        // Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.firstName": "Please Set a Name!"} });
      //       var element = document.createElement("h1");
      //       element.id = "fill-details-prompt";
      //       element.innerHTML = "Please enter your details";
      //       $('.button-container').append(element);
      //       $('#form-not-filled-warning-anim').addClass("animated fadeInUp");
      //       $('#login-button').prop("disabled", true);
      //       setTimeout(function(){
      //         $('#form-not-filled-warning-anim').addClass("animated fadeOutDown");
      //       }, 1000);        

      // }
    }
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
