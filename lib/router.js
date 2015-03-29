Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  anotherLayoutTemplate: 'noLayout',
  waitOn: function() {
    return Meteor.subscribe('Users', 'online');
  }
});

Router.route('/matched', function() {
  this.render('matchedUsers', fetchUsers(), setMatchClicked());
});


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

Router.route('/messaging', function(){
  this.render('messaging');
})

Router.route('/messaging/:conversationId', function () {
  var conversation = Conversations.findOne({conversationId: this.params.conversationId});
  this.render('ShowConversation', {data: conversation});
  console.log(conversation)
});

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