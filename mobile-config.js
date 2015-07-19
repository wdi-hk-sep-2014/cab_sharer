App.info({
  name: 'CabSharer',
  description: 'A cab sharing app built with Meteor and Cordova',
  version: '0.0.24'
});

App.icons({
  'android_ldpi': 'resources/icons/icon.png',
  'android_mdpi': 'resources/icons/icon.png',
  'android_hdpi': 'resources/icons/icon.png',
  'android_xhdpi': 'resources/icons/icon.png'
});

App.accessRule("https://engine.kadira.io/simplentp/sync", { external: true});
App.accessRule("http://fonts.googleapis.com/*", { external: false });
App.accessRule("http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobubble/src/infobubble.js", {external: false});
App.accessRule("http://graph.facebook.com/*", {external: false});
App.accessRule("http://*.googleapis.com/*", {external: false});
App.accessRule("http://*.gstatic.com/*", {external: false});