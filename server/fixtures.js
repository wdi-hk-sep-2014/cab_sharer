if ( Meteor.users.find().count() === 0 ) {
  Accounts.createUser({
    email: 'fakeuser1@abc.com',
    password: '12345678',
    profile: {location: {lat: 22.280796, lng: 114.131592, updatedAt: Date.now()}, name: "fakeuser1", destination: "wanchai"}
  });
  Accounts.createUser({
    email: 'fakeuser2@abc.com',
    password: '12345678',
    profile: {location: {lat: 22.269518, lng: 114.130562, updatedAt: Date.now()}, name: "fakeuser2", destination: "cyberport"}
  });
  Accounts.createUser({
    email: 'fakeuser3@abc.com',
    password: '12345678',
    profile: {location: {lat: 22.285839, lng: 114.145325, updatedAt: Date.now()}, name: "fakeuser3", destination: "cyberport"}
  });
  Accounts.createUser({
    email: 'fakeuser4@abc.com',
    password: '12345678',
    profile: {location: {lat: 22.281114, lng: 114.147771, updatedAt: Date.now()}, name: "fakeuser4", destination: "cyberport"}
  });
  Accounts.createUser({
    email: 'fakeuser5@abc.com',
    password: '12345678',
    profile: {location: {lat: 22.261575, lng: 114.129661, updatedAt: Date.now()}, name: "fakeuser5", destination: "central"}
  });
};