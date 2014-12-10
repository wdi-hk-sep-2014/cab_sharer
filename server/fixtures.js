if ( Meteor.users.find().count() === 0 ) {
  Accounts.createUser({
    email: 'email@email.ema',
    password: '12345678'
  });
  Accounts.createUser({
    email: 'barry@scott.com',
    password: '12345678'
  });
  Accounts.createUser({
    email: 'tom@tit.com',
    password: '12345678'
  });
  Accounts.createUser({
    email: 'alvin@stardust.com',
    password: '12345678'
  });
  Accounts.createUser({
    email: 'babassad@sdsddssd.com',
    password: '12345678'
  });
};