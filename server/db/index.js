var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

module.exports.dbConnect = mysql.createConnection({
  user: 'root',
  password: 'plantlife',
  database: 'chat'
});


const Sequelize = require('sequelize');
module.exports.sequelize = new Sequelize('chat', 'root', 'plantlife');

module.exports.Messages = module.exports.sequelize.define('messages', {
  objectId: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  text: Sequelize.TEXT,
  
  // id_users: Sequelize.INTEGER,
  // id_rooms: Sequelize.INTEGER,

  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

module.exports.Users = module.exports.sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  username: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

module.exports.Rooms = module.exports.sequelize.define('rooms', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  roomname: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

module.exports.Messages.belongsTo(module.exports.Users, {foreignKey: 'id_users'}); // add userId to Messages
module.exports.Messages.belongsTo(module.exports.Rooms, {foreignKey: 'id_rooms'}); // add roomId to Messages


// module.exports.sequelize.sync()
//   .then(() => module.exports.Users.create({
//     username: 'Lena'
//   }))
//   .then(() => module.exports.Messages.create({
//     text: 'janedoe was here',
//     id_users: 1,
//     id_rooms: 1
//   }))
//   .then(message => {
//     // message.set({primaryKey: true});
//     console.log(message.get({
//       plain: true
//     }));
//   });