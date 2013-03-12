Meteor.setInterval(function(){

  var now = new Date().getTime();
  now = now - 4000;
  // console.log(now);
  var expiredUsers = LoggedUsers.find( {stamp: {$lt: now } } ).fetch();
  console.log("in setInterval");
  for (var i = 0; i < expiredUsers.length; i++) {
    console.log("about to log expiredUsers");
    console.log('this guy is expired', i + ' - ' + expiredUsers[i].id);
    // console.log(expiredUsers[i]);
    console.log(now);
    console.log(expiredUsers[i].stamp < now);
    Rooms.update({}, {$pull: {'users': expiredUsers[i].id} } );
    LoggedUsers.remove({'id': expiredUsers[i].id});
  }
}, 4000);