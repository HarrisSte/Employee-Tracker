--Seeds for database
--Department
INSERT INTO
    department (name) VALUE ('Sales');

INSERT INTO
    department (name) VALUE ('Engineering');

INSERT INTO
    department (name) VALUE ('Finance');

INSERT INTO
    department (name) VALUE ('Legal');

--Role
INSERT INTO
    role (title, salary, department_id) VALUE ('Sales Lead', 70000, 1),
    ('Salesperson', 50000, 1),
    ('Lead Engineer', 130000, 2),
    ('Account Manager', 70000, 3),
    ('Accountant', 100000, 3),
    ('Legal Team Lead', 500000, 4),
    ('Lawyer', 350000, 4);

--Employees
INSERT INTO
    employee (first_name, last_name, role_id, manager_id) VALUE ('Sylvanas', 'Windrunner', 1, NULL),
    ('Vanessa', 'VanCleef', 2, 1),
    ('Lady', 'Liadrin', 2, 1),
    ('Draca', 'Orc', 2, 1),
    ('Lady', 'Vashj', 3, NULL),
    ('Valeera', 'Sanguinar', 4, NULL),
    ('Alexstrasza', 'Dragonflight', 4, 1),
    ('Jaina', 'Proudmoore', 3, 2);