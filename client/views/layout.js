if (Meteor.isClient) {
  Meteor.subscribe('sentMessages');
  Meteor.subscribe('recievedMessages');
}

Template.layout.events({

  'click #user-icon': function(event, template){
    event.preventDefault();
    Router.go('user');
  },

  'click #trips-icon': function(){
    event.preventDefault();
    Router.go('destination');
  },
  'click #map-icon': function(){
    event.preventDefault();
    Router.go('/');
  }
});