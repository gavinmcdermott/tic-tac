Meteor.autorun(function () {
  if (Meteor.user()) {
    Session.set('currentUser', Meteor.userId());
    if (Meteor.user().profile) {
      if (Meteor.user().profile.currentRoom !== null) {
        Session.set('currentRoom', Meteor.user().profile.currentRoom);
      }
      if (Meteor.user().profile.currentRoom === null) {
        Session.set('currentRoom', null);
      }
    }
  } else {
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
    Room.makeRoom(roomName);
  },

  'click .joinRoom': function() {
    Room.addUser(this._id, Session.get('currentUser'));
    Meteor.users.update({_id: Session.get('currentUser') }, {$set:{"profile.currentRoom": this._id}});
  }
};

Template.game.currentRoom = function() {
  return Session.get('currentRoom');
};

Template.room.roomName = function() {
  var room = Rooms.findOne({_id: Session.get('currentRoom')});
  return room && room.name;
};

Template.room.currentCount = function() {
  var room = Rooms.findOne({_id: Session.get('currentRoom')});
  return room && room.currentCount;
};

Template.room.events = {
  'click .leaveRoom': function() {
    Room.removeFromRoom(Meteor.userId());
    Meteor.users.update({_id: Meteor.userId() }, {$set:{"profile.currentRoom": null}});
  }
};


