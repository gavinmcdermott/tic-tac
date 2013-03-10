var makeUser = function(callback){
  Players.insert({}, function(error, result){
    callback(result);
  });
};

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
      makeUser(function(user) {
        user.name = $('input.name').val();
        user.room_id = Session.get('currentRoom');
        Session.set('currentPlayer', user);
        Room.addToRoom(Session.get('currentRoom'), Session.get('currentPlayer'));
      });
    });
  },

  'click .joinRoom': function() {
    Session.set('currentRoom', this._id);
    // console.log('CP - ', Session.get('currentPlayer'));
    // console.log('room id',this._id);
    // console.log(Session.get('currentRoom'));
    Rooms.update( {_id: Session.get('currentRoom')},
                    {$inc: {current_count: 1} } );
    Rooms.update( {_id: Session.get('currentRoom')},
                  {$push: {players: Session.get('currentPlayer')} } );
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
    Players.update( {_id: Session.get('currentPlayer')},
                    { $set : { room_id: null } } );
    Rooms.update( {_id: Session.get('currentRoom')},
                  {$inc: {current_count: -1} } );

    var roomPlayers = Rooms.findOne({_id: Session.get('currentRoom')},
                                    {players: 1, _id: 0} ).players;
    var playerIdx = roomPlayers.indexOf(Session.get('currentPlayer'));
    playerIdx = 'players.'+playerIdx;
    var playerLeaving = {};
    playerLeaving[playerIdx] = 1;
    Rooms.update( {_id: Session.get('currentRoom')},
                  {$unset: playerLeaving }, function(){
                    Rooms.update( {_id: Session.get('currentRoom')},
                    {$pull: {'players': null } }, function(){
                      var room = Rooms.findOne({_id: Session.get('currentRoom')});
                      if (!room.players.length) {
                        Rooms.remove({_id: Session.get('currentRoom')});
                      }
                      Session.set('currentRoom', null);
                      console.log("the currentRoom is now: ", Session.get('currentRoom'));
                    } );
                  } );
  }
};


