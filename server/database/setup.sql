DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS Progress;
DROP TABLE IF EXISTS Character;
DROP TABLE IF EXISTS Item;
DROP TABLE IF EXISTS Game;
DROP TABLE IF EXISTS Story;
DROP TABLE IF EXISTS Users;

SET TIME ZONE 'Europe/London';

CREATE TABLE Users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) UNIQUE NOT NULL ,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Game (
    game_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    state VARCHAR(20),
    difficulty VARCHAR(10),
    created_at DATE,
    updated_at DATE,
    PRIMARY KEY(game_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Story (
    story_id INT GENERATED ALWAYS AS IDENTITY,
    chapter_name VARCHAR(30),
    act_number INT,
    initial_prompt VARCHAR(3000),
    PRIMARY KEY(story_id)
);

CREATE TABLE Character (
    character_id INT GENERATED ALWAYS AS IDENTITY,
    story_id INT NOT NULL,
    character_name VARCHAR(50),
    description VARCHAR(200),
    image_url VARCHAR(100),
    PRIMARY KEY(character_id),
    FOREIGN KEY (story_id) REFERENCES Story(story_id)
);

CREATE TABLE Item (
    item_id INT GENERATED ALWAYS AS IDENTITY,
    story_id INT NOT NULL,
    item_name VARCHAR(50),
    description VARCHAR(200),
    image_url VARCHAR(100),
    PRIMARY KEY(item_id),
    FOREIGN KEY (story_id) REFERENCES Story(story_id)
);

CREATE TABLE Progress (
    progress_id INT GENERATED ALWAYS AS IDENTITY,
    game_id INT NOT NULL,
    story_id INT NOT NULL,
    saved_chat VARCHAR(50), 
    score INT,
    items INTEGER[],
    PRIMARY KEY(progress_id),
    FOREIGN KEY (game_id) REFERENCES Game(game_id),
    FOREIGN KEY (story_id) REFERENCES Story(story_id)
);


-- Insert data into Users table with 30 records
INSERT INTO Users (username, password, name)
VALUES
    ('user1', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'John Doe'),
    ('user2', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Jane Smith'),
    ('user3', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Alice Johnson'),
    ('user4', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Bob Brown'),
    ('user5', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Eva White'),
    ('user6', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'David Lee'),
    ('user7', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Grace Adams'),
    ('user8', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Frank Wilson'),
    ('user9', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Olivia Davis'),
    ('user10', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'William Taylor'),
    ('user', '$2b$10$gFWE8CNP/t2mlonOC34aA.f7Gr5bi.ZG4tB6hlnRmuCCkyr9k7wIC', 'username is user');


-- Insert fake data into Game table
INSERT INTO Game (user_id, state, difficulty, created_at, updated_at) VALUES
    (1, 'in-progress', 'easy', '2023-01-01', '2023-01-02'),
    (2, 'completed', 'medium', '2023-01-03', '2023-01-04'),
    (3, 'in-progress', 'hard', '2023-01-05', '2023-01-06'),
    (4, 'completed', 'easy', '2023-01-07', '2023-01-08'),
    (5, 'in-progress', 'medium', '2023-01-09', '2023-01-10'),
    (6, 'completed', 'hard', '2023-01-11', '2023-01-12'),
    (1, 'in-progress', 'easy', '2023-01-13', '2023-01-14'),
    (8, 'completed', 'medium', '2023-01-15', '2023-01-16'),
    (9, 'in-progress', 'hard', '2023-01-17', '2023-01-18'),
    (1, 'completed', 'easy', '2023-01-19', '2023-01-20');

-- Story table
INSERT INTO Story (chapter_name, act_number, initial_prompt)
VALUES
    ('Chapter 1', 1, 'Once upon a time...'),
    ('Chapter 2', 2, 'In the dark forest...'),
    ('Chapter 3', 3, 'The final showdown...'),
    ('Chapter 4', 1, 'A new beginning...'),
    ('Chapter 5', 2, 'Uncharted territory...'),
    ('Chapter 6', 3, 'Facing the unknown...'),
    ('Chapter 7', 1, 'The hidden realm...'),
    ('Chapter 8', 2, 'Ancient secrets...'),
    ('Chapter 9', 3, 'Confronting destiny...'),
    ('Chapter 10', 1, 'The journey continues...');

-- Character table
INSERT INTO Character (story_id, character_name, description, image_url)
VALUES
    (1, 'Alice', 'Brave adventurer', 'alice.jpg'),
    (1, 'Bob', 'Wise old wizard', 'bob.jpg'),
    (2, 'Charlie', 'Mysterious creature', 'charlie.jpg'),
    (2, 'Eva', 'Fearless warrior', 'eva.jpg'),
    (3, 'David', 'Enigmatic sorcerer', 'david.jpg'),
    (3, 'Fiona', 'Loyal companion', 'fiona.jpg'),
    (4, 'George', 'Cunning rogue', 'george.jpg'),
    (4, 'Helen', 'Swift archer', 'helen.jpg'),
    (5, 'Ian', 'Noble knight', 'ian.jpg'),
    (5, 'Jasmine', 'Sneaky rogue', 'jasmine.jpg');

-- Item table
INSERT INTO Item (story_id, item_name, description, image_url)
VALUES
    (1, 'Sword', 'A sharp and powerful weapon', 'sword.jpg'),
    (1, 'Potion', 'Healing elixir', 'potion.jpg'),
    (2, 'Crystal Ball', 'Reveals the future', 'crystal_ball.jpg'),
    (2, 'Enchanted Bow', 'Never misses its target', 'enchanted_bow.jpg'),
    (3, 'Amulet', 'Provides protection', 'amulet.jpg'),
    (3, 'Scroll of Knowledge', 'Unlocks hidden truths', 'scroll.jpg'),
    (4, 'Lockpicks', 'Opens any door', 'lockpicks.jpg'),
    (4, 'Cloak of Invisibility', 'Hides the wearer from sight', 'cloak.jpg'),
    (5, 'Golden Shield', 'Impenetrable defense', 'shield.jpg'),
    (5, 'Stealth Boots', 'Silent movement', 'boots.jpg');

-- Progress table
INSERT INTO Progress (game_id, story_id, saved_chat, score, items)
VALUES
    (1, 1, 'Save point 1', 100, '{1, 2, 3}'),
    (1, 2, 'Save point 2', 150, '{4, 5}'),
    (2, 1, 'Save point 3', 200, '{1, 2, 3}'),
    (2, 3, 'Save point 4', 180, '{6, 7}'),
    (3, 2, 'Save point 5', 120, '{4, 5}'),
    (3, 3, 'Save point 6', 250, '{8, 9}'),
    (4, 4, 'Save point 7', 300, '{10}'),
    (4, 5, 'Save point 8', 180, '{6, 7}'),
    (5, 3, 'Save point 9', 220, '{8, 9}'),
    (5, 1, 'Save point 10', 270, '{1, 2, 3}');
