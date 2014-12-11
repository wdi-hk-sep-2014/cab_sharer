Router.configure({
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('OnUsers');
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