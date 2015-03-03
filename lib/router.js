Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  anotherLayoutTemplate: 'noLayout',
  waitOn: function() {
    return Meteor.subscribe('Users', 'online');
    // return Meteor.subscribe('Messages');
  }
});

Router.route('/matched', function() {
  this.render('matchedUsers', fetchUsers(), setMatchClicked());
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

//temp messaging route
Router.route('/messaging', function(){
  this.render('messaging');
})

var requireLogin = function () {
  if (! Meteor.user()) {
    this.render('landingTemplate');
    this.layout('noLayout');
  } else {
    this.next();
  }
};


Router.onBeforeAction(requireLogin, {except: 'register'});
Router.onBeforeAction('loading');