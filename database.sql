CREATE TABLE Utente(
    id int PRIMARY KEY,
    username VARCHAR(100) not null UNIQUE,
    password CHAR(60) not null
);