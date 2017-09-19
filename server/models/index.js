var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.dbConnect.connect();
      var queryStr = 'SELECT * FROM messages';
      var queryArgs = [];
      db.dbConnect.query(queryStr, queryArgs, (err, results) => {
        if (err) { throw err; }

        console.log('Results is THIS: ', results[0].id);
        callback(results);
      });
      //db.dbConnect.end();
      

    }, // a function which produces all the messages
    post: function (data, callback) {
      console.log('Parsed data: ', data);
      // db.dbConnect.connect();
      
      var queryStr = `INSERT INTO messages (text) VALUES ('${data.text}')`;
      console.log('Query string', queryStr);
      var queryArgs = [];
      
      db.dbConnect.query(queryStr, queryArgs, (err, results) => {
        if (err) { throw err; }
        console.log('Post query to DB done');
        console.log('results: ', results);
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