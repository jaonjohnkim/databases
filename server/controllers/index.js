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
      // express query response space
      models.messages.get((results) => {
        // db query response space
        res.writeHead(200, headers);
        // console.log('results :', JSON.stringify(results));
        res.end(JSON.stringify(results));
        //res.end(results);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('JUST A BODY', req.body);
      //console.log('MESSAGES POST REQUEST', JSON.parse(Object.keys(req.body)[0]));
      models.messages.post(req.body, (results) => {
        res.writeHead(201, headers);
        res.end(JSON.stringify(results));
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('USERS GET REQUEST');
      models.users.get((results) => {
        res.writeHead(200, headers);
        res.end(JSON.stringify(results));
      });
    },
    post: function (req, res) {
      console.log('USERS POST REQUEST', req.body);
      var promise = models.users.post(req.body);
      promise.then((results) => {
        console.log('results', results);
        res.writeHead(201, headers);
        res.end(JSON.stringify(results));
      });
    }
  }
};

