DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS Progress;
DROP TABLE IF EXISTS Game;
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

CREATE TABLE Progress (
    progress_id INT GENERATED ALWAYS AS IDENTITY,
    game_id INT NOT NULL,
    stats VARCHAR(50), 
    branch_route VARCHAR(200), 
    score INT,
    additional_data INTEGER[],
    PRIMARY KEY(progress_id),
    FOREIGN KEY (game_id) REFERENCES Game(game_id)
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
    ('user11', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Sophia Thomas'),
    ('user12', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'James Harris'),
    ('user13', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Linda Lewis'),
    ('user14', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Michael King'),
    ('user15', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Sarah Martinez'),
    ('user16', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Robert Clark'),
    ('user17', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Elizabeth Hall'),
    ('user18', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Joseph Young'),
    ('user19', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Mary Adams'),
    ('user20', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'John Turner'),
    ('user21', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Catherine Lewis'),
    ('user22', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Daniel Moore'),
    ('user23', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Laura Mitchell'),
    ('user24', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Christopher Allen'),
    ('user25', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Patricia Wright'),
    ('user26', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Matthew Walker'),
    ('user27', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Jennifer White'),
    ('user28', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'William Martin'),
    ('user29', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Jessica Robinson'),
    ('user30', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq', 'Richard Green'),
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

-- Insert fake data into Progress table
INSERT INTO Progress (game_id, stats, branch_route, score, additional_data) VALUES
    (1, 'stats1', 'branch1', 100, ARRAY[1, 2, 3]),
    (2, 'stats2', 'branch2', 150, ARRAY[4, 5, 6]),
    (3, 'stats3', 'branch3', 200, ARRAY[7, 8, 9]),
    (4, 'stats4', 'branch4', 250, ARRAY[10, 11, 12]),
    (5, 'stats5', 'branch5', 300, ARRAY[13, 14, 15]),
    (6, 'stats6', 'branch6', 350, ARRAY[16, 17, 18]),
    (7, 'stats7', 'branch7', 400, ARRAY[19, 20, 21]),
    (8, 'stats8', 'branch8', 450, ARRAY[22, 23, 24]),
    (9, 'stats9', 'branch9', 500, ARRAY[25, 26, 27]),
    (10, 'stats10', 'branch10', 550, ARRAY[28, 29, 30]);
