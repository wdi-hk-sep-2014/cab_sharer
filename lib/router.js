Router.configure({
  loadingTemplate: 'loading'
})

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