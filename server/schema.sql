DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;


/* Create other tables and define schemas for them here! */

DROP TABLE IF EXISTS users;
    
CREATE TABLE users (
  id INT(4) PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(64)
);


DROP TABLE IF EXISTS rooms;
    
CREATE TABLE rooms (
  id INT(4) AUTO_INCREMENT,
  roomname VARCHAR(64),
  PRIMARY KEY (id)
);

INSERT INTO rooms (roomname) VALUES ('main');

DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
    
  objectId INT(4) AUTO_INCREMENT,
  text MEDIUMTEXT,
  createdAt TIMESTAMP,
  id_users INT(4),
  id_rooms INT(4) DEFAULT 1,
  PRIMARY KEY (objectId),
  FOREIGN KEY (id_users) REFERENCES users (id),
  FOREIGN KEY (id_rooms) REFERENCES rooms (id)
);

-- ALTER TABLE messages ADD ;
-- ALTER TABLE messages ADD FOREIGN KEY (id_rooms) REFERENCES rooms (id);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

