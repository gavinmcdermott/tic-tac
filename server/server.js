Meteor.setInterval(function(){

  var time = new Date().getTime() - 10000;
  var expiredUsers = LoggedUsers.find( {stamp: {$lt: time } } ).fetch();
  for (var i = 0; i < expiredUsers.length; i++) {
    Rooms.update({}, {$pull: {'users': expiredUsers[i].id} } );
    LoggedUsers.remove({'id': expiredUsers[i].id});
  }
}, 10000);