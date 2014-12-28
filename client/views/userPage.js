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
        console.log(formContents.length);
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
  'click .header': function(event){
    $('#settings').css("display", "inline");
    $('#settings').addClass('animated fadeInRight');
  }
});

