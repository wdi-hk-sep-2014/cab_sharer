Template.register.events({
'submit form': function(event, template){
    event.preventDefault();
    var emailVar = template.find('#register-email').value;
    var passwordVar = template.find('#register-password').value;
    var confirmPass = template.find('#confirm-password').value;
    if (passwordVar === confirmPass) {
      Accounts.createUser({
          email: emailVar,
          password: passwordVar
      });      
    } else {
      alert("you did not enter the correct password!");
    }
}
});