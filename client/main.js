var makeUser = function(){
  return Players.insert({});
};
var player = makeUser();
Session.set('currentPlayer', player);

Template.lobby.currentRoom = function() {
  return Session.get('currentRoom');
};

Template.lobby.showAvailableRooms = function() {
  return Room.availableRooms();
};

Template.lobby.events = {
  "click .createRoom": function() {
    var roomName = $('input.roomName').val();
    Room.makeRoom(ROOM_SIZE, roomName, function(roomID){
      Room.createSession(roomID);
      player.name = $('input.name').val();
      player.room_id = Session.get('currentRoom');
      Room.addToRoom(Session.get('currentRoom'), Session.get('currentPlayer'));
    });
  },

  'click .joinRoom': function() {
    Room.createSession(this._id);
    Room.addToRoom(this._id, Session.get('currentPlayer'));
  }
};

Template.game.currentRoom = function() {
  return Session.get('currentRoom');
};

Template.room.roomName = function() {
  var room = Rooms.findOne({_id: Session.get('currentRoom')});
  return room && room.name;
};

Template.room.roomPlayerCount = function() {
  var room = Rooms.findOne({_id: Session.get('currentRoom')});
  return room && room.current_count;
};

Template.room.events = {
  'click .leaveRoom': function() {
    Room.removeFromRoom(Session.get('currentRoom'), Session.get('currentPlayer'));
  }
};


