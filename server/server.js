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




// function distance(lat1, lon1, lat2, lon2, unit) {
//     var radlat1 = Math.PI * lat1/180
//     var radlat2 = Math.PI * lat2/180
//     var radlon1 = Math.PI * lon1/180
//     var radlon2 = Math.PI * lon2/180
//     var theta = lon1-lon2
//     var radtheta = Math.PI * theta/180
//     var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//     dist = Math.acos(dist)
//     dist = dist * 180/Math.PI
//     dist = dist * 60 * 1.1515
//     if (unit=="K") { dist = dist * 1.609344 }
//     if (unit=="N") { dist = dist * 0.8684 }
//     return dist
// }

// console.log("the two points are: " + distance(22.261724, 114.128610, 22.257186, 114.132892, "K").toFixed(2) + "KM apart.");
