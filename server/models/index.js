var db = require('../db');
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function (callback) {
      var queryStr = 'SELECT objectId, text, createdAt, roomname, username FROM messages LEFT JOIN (rooms) ON (messages.id_rooms = rooms.id) LEFT JOIN (users) ON (messages.id_users = users.id) ORDER BY objectId DESC';
      // var queryStr = 'SELECT objectId, text, createdAt, username, roomname FROM messages, users, rooms WHERE messages.id_users = users.id AND messages.id_rooms = rooms.id ORDER BY objectId DESC';
      var queryArgs = [];
      db.dbConnect.query(queryStr, queryArgs, (err, results) => {
        if (err) { throw err; }
        callback({results: results});
      });
      

    }, // a function which produces all the messages
    post: function (data, callback) {
      console.log('Parsed data: ', data);
    
    
      // GET user ID specifically

      var userId = module.exports.users.getUserId(data.username);
      userId.then((results) => {     
        if (results.length === 0) {
          return module.exports.users.post(data.username);
        } else {
          return results[0].id;
        }
      }).then((userId) => {
        // console.log('we can still see id:', id);
        console.log('userId', userId);
        //room check
        var roomId = module.exports.rooms.getRoomId(data.roomname);
        roomId.then((results) => {
          if (results.length === 0) {
            // console.log('')
            return module.exports.rooms.post(data.roomname);
          } else {
            console.log('after getRoomId, this is results:', results[0]);
            return results[0].id;
          }
        }).then((roomId) => {
          // userId and roomId are both here
          console.log('userId is valid here', userId);
          console.log('roomId is this: ', roomId);
          var queryStr = `INSERT INTO messages (id_users, text, id_rooms) VALUES (${userId}, '${data.text.replace("'", "''")}', ${roomId})`;
          var queryArgs = [];
          db.dbConnect.query(queryStr, queryArgs, (err, results) => {
            if (err) { throw err; }
            console.log('INSERT INTO');
            console.log('results: ', results);
            callback(results);
          });
        });
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      
    },
    getUserId: function (username) {
      return new Promise((resolve, reject) => {
        var queryStr = `SELECT id FROM users WHERE username = ('${username}')`;
        var queryArgs = [];
        db.dbConnect.query(queryStr, queryArgs, (err, results) => {
          if (err) { reject(err); }
          resolve(results);
        });
      });
    },
    post: function (username) {
      return new Promise((resolve, reject) => {
        var queryStr = `INSERT INTO users (username) VALUES ('${username}')`;
        var queryArgs = [];
        db.dbConnect.query(queryStr, queryArgs, (err, results) => {
          if (err) { reject(err); }
          resolve(results.insertId);
        });
      });
    }
  },

  rooms: {
    // Ditto as above.
    get: function () {},
    getRoomId: function (roomname) {
      return new Promise((resolve, reject) => {
        var queryStr = `SELECT id FROM rooms WHERE roomname = ('${roomname}')`;
        var queryArgs = [];
        db.dbConnect.query(queryStr, queryArgs, (err, results) => {
          if (err) { reject(err); }
          resolve(results);
        });
      });
    },
    post: function (roomname) {
      return new Promise((resolve, reject) => {
        var queryStr = `INSERT INTO rooms (roomname) VALUES ('${roomname}')`;
        var queryArgs = [];
        db.dbConnect.query(queryStr, queryArgs, (err, results) => {
          if (err) { reject(err); }
          console.log('post ROOM Successful');
          console.log('post results: ', results);
          resolve(results.insertId);
        });
      });
    }
  }
};

// console.log('MODELS are here');
// module.exports.messages.get();