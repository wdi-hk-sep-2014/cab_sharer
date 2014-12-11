if ( Meteor.users.find().count() === 0 ) {
  Accounts.createUser({
    email: 'email@email.ema',
    password: '12345678',
    profile: {location: {}, name: "mr email"}
  });
  Accounts.createUser({
    email: 'barry@scott.com',
    password: '12345678',
    profile: {location: {}, name: "barry scott"}
  });
  Accounts.createUser({
    email: 'tom@tit.com',
    password: '12345678',
    profile: {location: {lat: 22.466429, lng: 114.004909}, name: "tom tit"}
  });
  Accounts.createUser({
    email: 'alvin@stardust.com',
    password: '12345678',
    profile: {location: {lat: 22.371352, lng: 114.074305}, name: "alvin stardust"}
  });
  Accounts.createUser({
    email: 'babassad@sdsddssd.com',
    password: '12345678',
    profile: {location: {}, name: "babaaasaad"}
  });
};