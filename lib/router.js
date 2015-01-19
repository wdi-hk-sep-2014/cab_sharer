Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  anotherLayoutTemplate: 'noLayout',
  waitOn: function() {
    return Meteor.subscribe('Users', 'online');
    debugger;
    return IRLibLoader.load('https://maps.googleapis.com/maps/api/js?key=AIzaSyDk9y8mpkP-vf76aIFil2Kve_3f49WxW_w', 'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobubble/src/infobubble.js');
  }
});

Router.route('/matched', function() {
  this.render('matchedUsers', fetchUsers());
});

// Router.route('/', function () {
//   this.route('loggedIn',{
//     waitOn: function(){
//         return IRLibLoader.load('https://maps.googleapis.com/maps/api/js?key=AIzaSyDk9y8mpkP-vf76aIFil2Kve_3f49WxW_w');
//         this.render('loggedIn');
//     },
//   });
// });

Router.route('/user', function(){
  this.render('userPage', setClicked());
});

Router.route('/destination', function(){
  this.render('destinationPage');
});

Router.route('/', function() {
  this.render('loggedIn');
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
