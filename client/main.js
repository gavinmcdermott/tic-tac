Meteor.autorun(function () {
  if (Meteor.userId()) {
    // console.log('logged in');
    Session.set('currentUser', Meteor.userId());
  } else {
    // console.log('logged out');
    Session.set('currentUser', null);
  }
});

Template.lobby.currentRoom = function() {
  return Session.get('currentRoom');
};

Template.lobby.showAvailableRooms = function() {
  return Room.availableRooms();
};

Template.lobby.events = {
  "click .createRoom": function() {
    var roomName = $('input.roomName').val();
    Room.makeRoom(function(roomID){
      Room.createRoomSession(roomID);
      Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.currentRoom": Session.get('currentRoom')}});
      Room.addToRoom(Meteor.userId());
    }, roomName);
  },

  'click .joinRoom': function() {
    Room.createRoomSession(this._id);
    Meteor.users.update({_id: Meteor.userId() }, {$set:{"profile.currentRoom": Session.get('currentRoom')}});
    Room.addToRoom(Meteor.userId());
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
    Room.removeFromRoom(Meteor.userId());
    Meteor.users.update({_id: Meteor.userId() }, {$set:{"profile.currentRoom": null}});
  }
};


