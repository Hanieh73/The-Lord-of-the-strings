DROP TABLE IF EXISTS token;
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
    ('user', '$2b$10$gFWE8CNP/t2mlonOC34aA.f7Gr5bi.ZG4tB6hlnRmuCCkyr9k7wIC', 'username is user');;
