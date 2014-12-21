if ( Meteor.users.find().count() === 0 ) {
  Accounts.createUser({
    email: 'stevo_parker@hotmail.com',
    password: '12345678',
    profile: {location: {lat: 22.280796, lng: 114.131592, updatedAt: Date.now()}, name: "Stephen Parker", destination: "Wanchai", about: "I need a CAB!", pictureUrl: '/images/userdefault.png'}
  });
  Accounts.createUser({
    email: 'victorlin@hotmail.com',
    password: '12345678',
    profile: {location: {lat: 22.269518, lng: 114.130562, updatedAt: Date.now()}, name: "Victor Lin", destination: "Cyberport", about: "I really enjoy eating beef.", pictureUrl: '/images/userdefault.png'}
  });
  Accounts.createUser({
    email: 'harryng@hotmail.com',
    password: '12345678',
    profile: {location: {lat: 22.285839, lng: 114.145325, updatedAt: Date.now()}, name: "Harry Ng", destination: "Cyberport", about: "I really need a ride dude!", pictureUrl: '/images/userdefault.png'}
  });
  Accounts.createUser({
    email: 'fermartin@hotmail.com',
    password: '12345678',
    profile: {location: {lat: 22.281114, lng: 114.147771, updatedAt: Date.now()}, name: "Fernando Martin", destination: "Cyberport", about: "I am definitely not a serial killer", pictureUrl: '/images/userdefault.png'}
  });
  Accounts.createUser({
    email: 'pbateman@hotmail.com',
    password: '12345678',
    profile: {location: {lat: 22.261575, lng: 114.129661, updatedAt: Date.now()}, name: "Patrick Bateman", destination: "Wanchai", about: "I work in mergers and acquisitions", pictureUrl: '/images/userdefault.png'}
  });
};