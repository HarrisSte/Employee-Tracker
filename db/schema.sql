-- Dropping database and creating new databases 
DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

--Using new database
USE employee_trackerDB;

--Creating tables
CREATE TABLE department (
    id INT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
);

