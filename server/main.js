Meteor.startup(function () {
  Meteor.methods({
    availableRooms: function() {
      return Rooms.find({ current_count: { $gt: -1, $lt: 4 } }).fetch();
    },

    availableRoomCount: function() {
      return Rooms.find({ current_count: { $gt: -1, $lt: 4 } }).fetch().length;
    },

    makeRoom: function(size, roomName) {
      var room = Rooms.insert({
        'name': roomName,
        'players': [],
        'current_count': 0,
        'size': size
      });
      return room;
    }

  });

});
