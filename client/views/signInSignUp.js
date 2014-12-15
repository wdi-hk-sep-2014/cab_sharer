if (Meteor.isClient) {
  Template.register.events({
    'submit form': function(event, template){
        event.preventDefault();
        var emailVar = template.find('#register-email').value;
        var passwordVar = template.find('#register-password').value;
        Accounts.createUser({
          email: emailVar,
          password: passwordVar
        });
    }
  });

  Template.login.events({
    'submit form': function(event, template){
        event.preventDefault();
        var emailVar = template.find('#login-email').value;
        var passwordVar = template.find('#login-password').value;
        if (emailVar.length === 0 || passwordVar.length === 0){

            var element = document.createElement("h1");
            element.id = "form-not-filled-warning-anim";
            element.innerHTML = "Please enter a user name and password...";
            $('#login-form').append(element);
            $('#form-not-filled-warning-anim').addClass("animated fadeInUp");
            $('#login-button').prop("disabled", true);
            setTimeout(function(){
              $('#form-not-filled-warning-anim').addClass("animated fadeOutDown");
            }, 1000);
            setTimeout(function(){
              $('#form-not-filled-warning-anim').remove();
              $('#login-button').prop("disabled", false);
            }, 2000);
        } else {
          console.log('login2');
          Meteor.loginWithPassword(emailVar, passwordVar);
        }
    }
  });
}