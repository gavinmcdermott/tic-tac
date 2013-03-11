// Meteor.users.remove({});

// http://stackoverflow.com/questions/12333857/meteor-client-disconnected-event-on-server
Meteor.default_server.stream_server.register( Meteor.bindEnvironment( function(socket) {
    socket.on('close', function(){

      console.log(socket);
      // Fiber(function() {

      // }).run();

    }, function(error) {
      console.log(error);
    });
  }, function(err) {
    console.log(err);
} ) );