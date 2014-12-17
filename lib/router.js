Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  anotherLayoutTemplate: 'noLayout',
  waitOn: function() {
    return Meteor.subscribe('Users', 'online');
  }
});

Router.route('/matched', function() {
  this.render('matchedUsers');
});

Router.route('/user', function(){
  this.render('userPage');   
});

Router.route('/destination', function(){
  this.render('destinationPage');
});

Router.route('/', function() {
  this.render('loggedIn');
  // this.layout('noLayout');
});

Router.route('/register', function() {
  this.render('register');
    this.layout('noLayout');
});

var requireLogin = function () {
  if (! Meteor.user()) {
    this.render('landingTemplate');
    this.layout('noLayout');
  } else {
    // this.render('loggedIn');
    // this.layout('layout');
    Session.set('chapp-username', Meteor.user().profile.firstName);
    Session.set('chapp-docid','123');
    this.next();
  }
};


Router.onBeforeAction(requireLogin, {except: 'register'});
Router.onBeforeAction('loading');

// animateContentOut = function() {
//     $('#content').removeClass("animated fadeIn");
//     return $('footer').addClass("hide");
// }

// // define this as a global onBeforeAction so it happens all the time
// Router.onBeforeAction(animateContentOut)

// fadeContentIn = function() {
//     $('#content').addClass("animated fadeIn");
//     return $('footer').removeClass("hide");
// }

// // define this as a global onAfterAction so it happens all the time
// Router.onAfterAction(animateContentOut);
