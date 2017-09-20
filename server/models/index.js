var db = require('../db');
var Promise = require('bluebird');

module.exports = {
  messages: {
    // get: function (callback) {
    //   var queryStr = 'SELECT objectId, text, messages.createdAt, roomname, username FROM messages LEFT JOIN (rooms) ON (messages.id_rooms = rooms.id) LEFT JOIN (users) ON (messages.id_users = users.id) ORDER BY objectId DESC';
    //   var queryArgs = [];
    //   db.dbConnect.query(queryStr, queryArgs, (err, results) => {
    //     if (err) { throw err; }
    //     callback({results: results});
    //   });
    // },
    // http://docs.sequelizejs.com/manual/tutorial/associations.html#creating-with-associations
    get: function (callback) {
      db.sequelize.sync()
        .then(() => db.Messages.findAll({
          attributes: ['objectId', 'text', 'roomname', 'username'],
          where: {
            id_users: 1
          }
        }))
        .then((results) => { 
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
        //room check
        var roomId = module.exports.rooms.getRoomId(data.roomname);
        roomId.then((results) => {
          if (results.length === 0) {
            return module.exports.rooms.post(data.roomname);
          } else {
            return results[0].id;
          }
        }).then((roomId) => {
          // userId and roomId are both here
          var queryStr = `INSERT INTO messages (id_users, text, id_rooms) VALUES (${userId}, '${data.text.replace("'", "''")}', ${roomId})`;
          var queryArgs = [];
          db.dbConnect.query(queryStr, queryArgs, (err, results) => {
            if (err) { throw err; }
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
          resolve(results.insertId);
        });
      });
    }
  }
};