-- Active: 1751735993976@@127.0.0.1@5432@rentalusers
CREATE TABLE Utente(
    id int PRIMARY KEY,
    username VARCHAR(100) not null UNIQUE,
    password CHAR(60) not null
);