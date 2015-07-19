var clicked = true;
setClicked = function(){
  console.log("setclicked Fired");
  clicked = true;
};


Template.userPage.helpers({
    displayUser: function() {
      return Meteor.user().services.facebook.first_name;
    },
    profilePicture: function() {
      return Meteor.user().profile.picture;
    }
});

Template.userPage.events({
  'click #logout': function(event){
    Meteor.logout(function(){
      Router.go('/');
    });
  },
  'keyup #bio': function(event, template){
    if (event.which === 13) {
      var formContents = template.find('#bio').value;
      if (formContents.length != 0) {
        Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.about": formContents}});
        $('#bio').val('');
        $('#status').addClass('animated flipOutY');
        setTimeout(function(){
          $('#status').text('Status is updated!');
          $('#status').removeClass('animated flipOutY');
          $('#status').addClass('animated flipInY');
        }, 1000);
      };
    };
  },
  'click #settings-button': function(event){
    if (clicked) {
      $('#user-h1').addClass('animated flipOutY');
      setTimeout(function(){
        $('#user-h1').text('Your Panel');
        $('#user-h1').removeClass('animated flipOutY');
        $('#user-h1').addClass('animated flipInY');
      }, 1000);
      $('#user-page-toggle-div').css("display", "none");
      $('#settings').css("display", "inline");
      $('#options-distance').val(Meteor.user().profile.distancePrefs);
      $('#settings').addClass('animated fadeInRight');
      $('#settings-button').prop("disabled", true);
      setTimeout(function(){
        $('#settings').removeClass('animated fadeInRight');
        $('#settings-button').prop("disabled", false);
      }, 1000);
    } else {
      $('#user-h1').addClass('animated flipOutY');
      setTimeout(function(){
        $('#user-h1').text('Hey, ' + Meteor.user().services.facebook.first_name + '!');
        $('#user-h1').removeClass('animated flipOutY');
        $('#user-h1').addClass('animated flipInY');
      }, 1000);      
      $('#settings').addClass('animated fadeOutRight');
      $('#settings-button').prop("disabled", true);
      setTimeout(function(){
        $('#settings').removeClass('animated fadeOutRight');
        $('#user-page-toggle-div').css("display", "block");
        $('#settings').css("display", "none");
        $('#settings-button').prop("disabled", false);
      }, 1000)
    }
    clicked = !clicked;
  },
  'change': function(event, template){
    var userDistancePrefs = template.find('#options-distance').value;
    Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.distancePrefs": userDistancePrefs}});
  }
});

setClicked();