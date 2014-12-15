

// var findOnlineUsers = function(){
//   var onlineUsersArray = Meteor.users.find({ "status.online": true }, {fields: {_id:1}}).fetch();
//   return onlineUsersArray;
// };

// var onlineUsersCursor = Meteor.users.find({ "status.online": true });

// onlineUsersCursor.observe({
//   added: function() {
//     var onlineUsersArray = findOnlineUsers();
//     OnlineUsers.remove({});
//     for (index in onlineUsersArray){
//       OnlineUsers.insert({ userId: onlineUsersArray[index]._id});
//     };


//   },
//   removed: function() {
//     var onlineUsersArray = findOnlineUsers();
//     OnlineUsers.remove({});
//     for (index in onlineUsersArray){
//       OnlineUsers.insert(onlineUsersArray[index]);
//     };
//   }
// }); 


// for (var i = 0; i < onlineUsersArray.length; i++){

// };
// 
