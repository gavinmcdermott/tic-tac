Meteor.startup(function () {
  Meteor.methods({
    // availableRooms: function() {
    //   Rooms.find({ current_count: { $gt: -1, $lt: ROOM_SIZE } }).fetch();
    // },

    availableRoomCount: function() {
      return Rooms.find({ current_count: { $gt: -1, $lt: ROOM_SIZE } }).fetch().length;
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
