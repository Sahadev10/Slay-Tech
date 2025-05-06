-- Create the database
CREATE DATABASE IF NOT EXISTS tp;

-- Use the created database
USE tp;

-- Create the images table
CREATE TABLE IF NOT EXISTS images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL
);

-- To check the tables in the database
SHOW TABLES;
