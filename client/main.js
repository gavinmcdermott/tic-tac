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

Template.lobby.inRoom = function() {
  return Session.get('currentRoom');
};

Template.createRoom.events = {
  "click .create": function() {
    var roomName = $('input.roomName').val();
    Room.makeRoom(roomName);
  }
};

Template.allRooms.rooms = function() {
  // return Room.availableRooms();
  return Rooms.find({}).fetch();
};

Template.allRooms.events = {
  'click .joinRoom': function() {
    Room.addUser(this._id, Session.get('currentUser'));
    Meteor.users.update({_id: Session.get('currentUser') }, {$set:{"profile.currentRoom": this._id}});
  }
};

Template.roomOverview.roomName = function() {
  var room = Rooms.findOne({_id: Session.get('currentRoom')});
  return room && room.name;
};

Template.roomOverview.currentCount = function() {
  // var room = Rooms.findOne({_id: Session.get('currentRoom')});
  return Room.currentSize(Session.get('currentRoom'));
  // return room && room.currentCount;
};

// Template.roomUsers.user = function() {
//   var userIds = Rooms.findOne({_id: Session.get('currentRoom')}, {users: 1, _id: 0} ).users,
//       users = [];
//   for (var i = 0; i < userIds.length; i++) {
//     users.push(Meteor.users.findOne({_id: userIds[i] }));
//   }
//   return users;
// };

Template.room.events = {
  'click .leave': function() {
    Room.removeFromRoom(Meteor.userId());
    Meteor.users.update({_id: Meteor.userId() }, {$set:{"profile.currentRoom": null}});
  }
};