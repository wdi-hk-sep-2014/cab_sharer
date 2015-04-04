Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  anotherLayoutTemplate: 'noLayout',
  waitOn: function() {
    return Meteor.subscribe('Users', 'online');
  }
});

Router.route('/matched', {
  loadingTemplate: 'loading',
  waitOn: function(){
    return Meteor.subscribe("usersConversations");
  },
  action: function(){
    this.render('matchedUsers', fetchUsers());    
  }
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

Router.route('/messaging', {
  loadingTemplate: 'loading',
  waitOn: function(){
    return Meteor.subscribe("receivedMessages");
  },
  waitOn: function(){
    return Meteor.subscribe("sentMessages");
  },
  waitOn: function(){
    return Meteor.subscribe("usersConversations");
  },
  action: function(){
    this.render('messaging');
  }
});


Router.route('/messaging/:_id', {
  loadingTemplate: 'loading',
  waitOn: function(){
    return Meteor.subscribe("receivedMessages");
  },
  waitOn: function(){
    return Meteor.subscribe("sentMessages");
  },
  waitOn: function(){
    return Meteor.subscribe("usersConversations");
  },
  action: function(){
    var conversation = Conversations.findOne({_id: this.params._id});
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