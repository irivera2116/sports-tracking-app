-- For table: login_info
INSERT INTO login_info (user_name, user_password, isAdmin) 
VALUES ('admin','admin', true);

INSERT INTO login_info (user_name, user_password) 
VALUES ('guest','guest');

INSERT INTO login_info (user_name, user_password) 
VALUES ('guest2','guest2');


-- For table: users
INSERT INTO users (login_id, first_name, last_name, display_name, avatar_dirct)
VALUES (1, 'Admin', 'Istrator', 'Adminstrator', '1.png');

INSERT INTO users (login_id, first_name, last_name, display_name, avatar_dirct)
VALUES (2, 'Guest', 'One', 'Guest 1', '2.png');

INSERT INTO users (login_id, first_name, last_name, display_name, avatar_dirct)
VALUES (3, 'Guest', 'Two', 'Guest 2', '3.png');


-- For table: messages
INSERT INTO messages (user_id, room_id, message_body)
VALUES (1, 1, 'WELCOME TO THE NFL CHAT ROOM!');

INSERT INTO messages (user_id, room_id, message_body)
VALUES (1, 2, 'WELCOME TO THE NBA CHAT ROOM!');

INSERT INTO messages (user_id, room_id, message_body)
VALUES (1, 3, 'WELCOME TO THE MLB CHAT ROOM!');

INSERT INTO messages (user_id, room_id, message_body)
VALUES (1, 4, 'WELCOME TO THE MLS CHAT ROOM!');



-- For table: rooms
INSERT INTO rooms (room_name)
VALUES ('NFL');
INSERT INTO rooms (room_name)
VALUES ('NBA');
INSERT INTO rooms (room_name)
VALUES ('MLB');
INSERT INTO rooms (room_name)
VALUES ('MLS');
