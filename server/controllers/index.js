var models = require('../models');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('INSIDE GET');

      // express query response space
      models.messages.get((results) => {
        // db query response space
        res.writeHead(200, headers);
        console.log('results :', JSON.stringify(results));
        res.end(JSON.stringify(results));
        //res.end(results);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('POST REQUEST');
      var data = '';
      req.on('data', (chunk) => {
        data += chunk;
        // console.log('CHUNK TO STRING WORKS: ', chunk.toString());
        // console.log('Data is this: ', data);
      });
      req.on('end', () => {
        console.log('Inside request end');
        models.messages.post(JSON.parse(data), (results) => {
          
          res.writeHead(201, headers);
          res.end(JSON.stringify(results));
        });
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

