--Seeds for database 
--Department
INSERT INTO department (department_id)
   VALUES ('Sales'),
          ('Engineering'),
          ('Finance'),
          ('Legal');


--Role
INSERT INTO role (title, salary, department_id) 
  VALUES ('Sales Lead', 70000, 1),
         ('Salesperson', 50000, 1),
         ('Lead Engineer', 130000, 2),
         ('Account Manager', 70000, 3),
         ('Accountant', 100000, 3),
         ('Legal Team Lead', 500000, 4),
         ('Lawyer', 350000, 4);


--Managers
-- INSERT INTO manager (first_name, last_name)
--     VALUES ('')
--            ('')
--            ('')
            
--Employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) 
  VALUES ('Sylvanas', 'Windrunner', 1, NULL),
         ('Vanessa', 'VanCleef', 2, 1),
         ('Lady', 'Liadrin', 2, 1),
         ('Draca', 'Orc', 1, 1),
         ('Lady', 'Vashj', 3, NULL),
         ('Valeera', 'Sanguinar', 4, NULL),
         ('Alexstrasza', 'Dragonflight', 4, 1),
         ('Jaina', 'Proudmoore', 3, 2);
         ('Grommash', 'Hellscream', 1, 2),
         ('Tyrande', 'Whisperwind', 1, NULL),
         ('Veressa', 'Windrunner', 4, 2),
         ('Malfurion', 'Stormrage', 3, NULL);