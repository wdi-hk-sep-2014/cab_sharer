Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('Users', 'online');
  }
});

Router.route('/matched', function() {
  this.render('matchedUsers');
});

Router.route('/', function() {
  this.render('signInSignUp');
});

var requireLogin = function () {
  if (! Meteor.user()) {
    this.render('signInSignUp');
  } else {
    this.render('loggedIn');
  }
};


Router.onBeforeAction(requireLogin, {except: 'matched'});
Router.onBeforeAction('loading');

