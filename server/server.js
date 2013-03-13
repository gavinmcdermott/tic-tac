Meteor.setInterval(function(){

  var time = new Date().getTime() - 1000;
  var expiredUsers = LoggedUsers.find( {stamp: {$lt: time } } ).fetch();
  console.log('outer');
  for (var i = 0; i < expiredUsers.length; i++) {
    console.log('test');
    Rooms.update({}, {$pull: {'users': expiredUsers[i].id} } );
    console.log('id: ',expiredUsers[i].id);
    LoggedUsers.remove({'id': expiredUsers[i].id});
  }
}, 1000);