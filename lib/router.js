subscriptions = {};


Router.configure({
  loadingTemplate: 'loading',
  waitOn: function() {
    subscriptions.OnUsers = Meteor.subscribe('OnUsers');
    return subscriptions.onUsers;
  }
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


Router.onBeforeAction(requireLogin);