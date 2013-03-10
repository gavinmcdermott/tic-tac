ROOM_SIZE = 2;
var Games = new Meteor.Collection('games');
// { game_id: 123, room_id: 123 }
var Rooms = new Meteor.Collection('rooms');
// { room_id: 10, players: [player_id] }
var Players = new Meteor.Collection('players');
// { player_id: 123, name: 'matt', room_id: 123 }