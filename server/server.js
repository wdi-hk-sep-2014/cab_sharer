// var getGeocode = function(address){
//   var geo = new GeoCoder({
//     geocoderProvider: "mapquest",
//     httpAdapter: "https",
//     apiKey: 'Fmjtd%7Cluurn16b21%2C20%3Do5-9wts54'
//     });
//   var geocodeResult = geo.geocode(address);
//   console.log(geocodeResult);
//   return geocodeResult;
// };

// getGeocode("Cyberport, Hong Kong");




ServiceConfiguration.configurations.remove({
    service: "facebook"
});

// PRODUCTION
ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: "854947564544953",
    secret: "68fa355766aa072af2fa6ee5c014a001"
});

// // DEV/TEST
// ServiceConfiguration.configurations.insert({
//     service: "facebook",
//     appId: "901570066549369",
//     secret: "762e72c3d411ad4b7acfb927eddc6a31"
// });

Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?width=9999";
        user.profile = options.profile;
    }
    return user;
});