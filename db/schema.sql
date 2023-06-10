-- Dropping database and creating new databases 
DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

--Using new database
USE employee_trackerDB;

--Creating tables
CREATE TABLE department (
    id INT NOT NULL,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY (id)
);

