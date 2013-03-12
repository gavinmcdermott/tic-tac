// Meteor.users.remove({});
Meteor.setInterval(function(){

  var now = new Date().getTime();
  now = now - 4000;
  console.log(now);
  var expiredUsers = LoggedUsers.find({}, {stamp: {$lt: now } } ).fetch();
  for (var i = 0; i < expiredUsers.length; i++) {
    // console.log(expiredUsers[i]);
    // Room.find({users: {}})
    Rooms.update({}, {$pull: {'users': expiredUsers[i]._id} } );
  }
}, 4000);

// http://stackoverflow.com/questions/12333857/meteor-client-disconnected-event-on-server
Meteor.default_server.stream_server.register( Meteor.bindEnvironment( function(socket) {
    socket.on('close', function(){

      // console.log(socket);
      // Fiber(function() {

      // }).run();

    }, function(error) {
      console.log(error);
    });
  }, function(err) {
    console.log(err);
} ) );