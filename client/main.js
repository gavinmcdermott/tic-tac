// assume someone clicks a button and then this happens:
// if (!Meteor.rooms.checkRooms) {
//   Meteor.rooms.makeRoom(ROOM_SIZE);
// } else {
//   Meteor.rooms._make user join an existing room_
// }


Template.lobby.currentRoom = function() {
  return Session.get('currentRoom');
};

Template.lobby.events = {
  "click .createRoom": function() {
    var roomName = $('input.roomName').val();
    Meteor.call('makeRoom', ROOM_SIZE, roomName, function(error, result){
      Session.set('currentRoom', result);

      var currentPlayer = Players.insert({
        'name': $('input.name').val(),
        'room_id': Session.get('currentRoom')
      });
      Session.set('currentPlayer', currentPlayer);

      Rooms.update( {_id: Session.get('currentRoom')},
                    {$inc: {current_count: 1} } );
      Rooms.update( {_id: Session.get('currentRoom')},
                    {$push: {players: Session.get('currentPlayer')} } );
      var r = Rooms.findOne({_id: Session.get('currentRoom')});
      console.log(r);
    });
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
                      Session.set('currentRoom', null);
                      console.log("the currentRoom is now: ", Session.get('currentRoom'));
                    } );
                  } );
  }
};


