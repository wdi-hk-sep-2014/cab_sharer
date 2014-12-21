Template.register.events({
  'submit form': function(event, template){
    event.preventDefault();
    var emailVar = template.find('#register-email').value;
    var passwordVar = template.find('#register-password').value;
    var confirmPass = template.find('#confirm-password').value;
    var firstName = template.find('#first-name').value;
    var lastName = template.find('#last-name').value;
    if (passwordVar === confirmPass && firstName.length > 1 && lastName.length > 1 ) {
      Accounts.createUser({
              email: emailVar,
              password: passwordVar,
              profile: { 
                firstName: firstName,
                lastName: lastName,
                location: {lat: 22.284584, lng: 114.158212, updatedAt: Date.now() - 1000 * 60 * 6},
                destination: 'Central',
                about: 'This is a placeholder bio. Make your own!',
                pictureUrl: '/images/userdefault.png'
              }
          }, function(){
            Router.go('/');
          })
    } else {
        animateWarning($('.animate-target'));
    }
  }
});