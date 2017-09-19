var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {

      var queryStr = 'SELECT * FROM messages';
      var queryArgs = [];
      db.dbConnect.query(queryStr, queryArgs, (err, results) => {
        if (err) { throw err; }

        callback({results: results});

      });
      

    }, // a function which produces all the messages
    post: function (data, callback) {
      console.log('Parsed data: ', data);
      
      var queryStr = `INSERT INTO messages (text) VALUES ('${data.text}')`;
      console.log('Query string', queryStr);
      var queryArgs = [];
      
      db.dbConnect.query(queryStr, queryArgs, (err, results) => {
        if (err) { throw err; }
        console.log('Post Successful');
        console.log('results: ', results);
        callback(results);
      });
      
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

// console.log('MODELS are here');
// module.exports.messages.get();