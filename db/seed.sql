USE chat_db;

-- For table: rooms

INSERT INTO rooms (room_name) VALUES
  ('NFL'),
  ('MLB'),
  ('NBA'),
  ('NHL'),
  ('MLS');


-- For table: users
INSERT INTO users (login_id, first_name, last_name, display_name)
VALUES
  (1, 'John', 'Doe', 'JohnD'),
  (2, 'Jane', 'Smith', 'JaneS'),
  (3, 'Mike', 'Johnson', 'MikeJ');

-- For table: login_info
INSERT INTO login_info (user_name, user_password, isAdmin)
VALUES
  ('johnDoe', 'password123'),
  ('janeSmith', 'pass456'),
  ('mikeJohnson', 'secure789');

-- For table: messages
INSERT INTO messages (user_id, room_id, message_body)
VALUES
  (1, 1, 'Hey, everyone! Ready for some NFL action?'),
  (2, 1, 'Go Patriots! Lets dominate this season.'),
  (1, 2, 'Whos excited for the MLB playoffs?'),
  (3, 2, 'Go Yankees! Were going all the way.'),
  (3, 3, 'NBA fans, who\s your favorite team?'),
  (2, 3, 'Lakers all the way!'),
  (1, 4, 'Any movie buffs here? Share your favorite sports movies.'),
  (3, 4, 'Just watched "Field of Dreams." Its a must-see for baseball fans.'),
  (2, 5, 'What genre of music gets you pumped for a game?'),
  (1, 5, 'Rock and roll, baby! It sets the perfect atmosphere for sports.');