-- Dropping database and creating new database
DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

-- Using new database
USE employee_trackerDB;

-- Creating tables
CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT,
    PRIMARY KEY (id),
    CONSTRAINT FK_roles_department_id FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    CONSTRAINT FK_employees_roles_id FOREIGN KEY (roles_id) REFERENCES roles(id),
    CONSTRAINT FK_employees_manager_id FOREIGN KEY (manager_id) REFERENCES employees(id)
);
