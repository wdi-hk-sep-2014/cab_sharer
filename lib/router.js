Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  anotherLayoutTemplate: 'noLayout',
  waitOn: function() {
    return Meteor.subscribe('Users', 'online');
  }
});

Router.route('/matched', function() {
  // this.render('matchedUsers', fetchUsers(), setMatchClicked());
  this.render('matchedUsers', fetchUsers());
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

// Router.route('/messaging/:conversationId', function () {
//   var conversation = Conversations.findOne({conversationId: this.params.conversationId});
//   Session.set('conversationId', conversation);
//   this.render('ShowConversation', {data: conversation});
//     this.layout('noLayout');
// });

Router.route('/messaging/:conversationId', {
  loadingTemplate: 'loading',
  waitOn: function(){
    // waitOn makes sure that this publication is ready before rendering your template
    return Meteor.subscribe("receivedMessages");
  },
  waitOn: function(){
    return Meteor.subscribe("sentMessages");
  },
  action: function(){
    var conversation = Conversations.findOne({conversationId: this.params.conversationId});
    Session.set('conversationId', conversation);
    this.render('ShowConversation', {data: conversation});
    this.layout('noLayout');
  }  
});

var requireLogin = function () {
  if (! Meteor.user()) {
    this.render('landingTemplate');
  } else {
    this.next();
  }
};


Router.onBeforeAction(requireLogin, {except: 'register'});
Router.onBeforeAction('loading');