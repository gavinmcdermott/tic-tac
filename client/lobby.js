Room = {};
Room.availableRooms = function() {
  return Rooms.find({ current_count: { $gt: -1, $lt: ROOM_SIZE } }).fetch();
};
Room.availableRoomCount = function() {
  return Rooms.find({ current_count: { $gt: -1, $lt: ROOM_SIZE } }).fetch().length;
};
Room.makeRoom = function(size, roomName, callback) {
  var room = Rooms.insert({
    'name': roomName,
    'players': [],
    'current_count': 0,
    'size': size
  }, function(error, result) {
    Session.set('currentRoom', result);
    console.log('rooms', Session.get('currentRoom'));
    callback(result);
  });
};
Room.addToRoom = function(room, user) {
  Rooms.update( {_id: room},
                {$inc: {current_count: 1} } );
  Rooms.update( {_id: room},
                {$push: {players: user} } );
};