//Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const util = require('util');
const figlet = require('figlet');

//Connection to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employeetracker_db',
  },
  console.log(`Connected to the employeetracker_db database.`)
);

connection.query = util.promisify(connection.query);

//Connect to MySQL server
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server');
  startApp();
});

//Figlet display 'Employee Tracker' using ASCII art
const options = {
  font: 'Standard',
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 80,
  whitespaceBreak: true,
};

figlet('Employee Tracker', options, function (err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data);
});

//Function to start the application
function startApp() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all Employees',
          'View all employees by Department',
          'View all employees by Manager',
          'Add Employee',
          'Remove Employee',
          'Update Employee role',
          'Update Employee Manager',
          'Exit',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'View all Employees':
          viewAllEmployees();
          break;
        case 'View all employees by Department':
          viewAllEmployeesByDepartment();
          break;
        case 'View all employees by Manager':
          viewAllEmployeesByManager();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Remove Employee':
          removeEmployee();
          break;
        case 'Update Employee role':
          updateEmployeeRole();
          break;
        case 'Update Employee Manager':
          updateEmployeeManager();
          break;
        case 'Exit':
          connection.end();
          console.log('Connection to server has ended');
          break;
      }
    });
}

// Function to view all employees
function viewAllEmployees() {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

// Function to view employees by department
function viewAllEmployeesByDepartment() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'department',
        message: 'Select a department:',
        choices: ['Sales', 'Engineering', 'Finance', 'Legal'],
      },
    ])
    .then((answers) => {
      const department = answers.department;
      connection.query(
        'SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.department_name = ?',
        [department],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          startApp();
        }
      );
    });
}

// Function to view employees by manager
function viewAllEmployeesByManager() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'manager',
        message: 'Enter the manager name:',
      },
    ])
    .then((answers) => {
      const manager = answers.manager;
      const query = 'SELECT * FROM employee WHERE manager = ?';
      connection.query(query, [manager], (err, results) => {
        if (err) throw err;
        console.log(results);
        startApp();
      });
    });
}

// Function to remove employee
function removeEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: 'Enter the ID or name of the employee to remove:',
      },
    ])
    .then((answers) => {
      const employeeId = answers.employeeId;
      const query = 'DELETE FROM employee WHERE id = ? OR name = ?';
      connection.query(query, [employeeId, employeeId], (err, results) => {
        if (err) throw err;
        console.log('Employee removed successfully.');
        startApp();
      });
    });
}

// Function to update employee role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: 'Enter the ID or name of the employee to update:',
      },
      {
        type: 'list',
        name: 'newRole',
        message: 'Enter the new role for the employee!',
        choices: [
          'Sales Lead',
          'Salesperson',
          'Lead Engineer',
          'Account Manager',
          'Accountant',
          'Legal Team Lead',
          'Lawyer',
        ],
      },
    ])
    .then((answers) => {
      const employeeId = answers.employeeId;
      const newRole = answers.newRole;
      const query = 'UPDATE employee SET role = ? WHERE id = ? OR name = ?';
      connection.query(
        query,
        [newRole, employeeId, employeeId],
        (err, results) => {
          if (err) throw err;
          console.log('Employee role updated successfully.');
          startApp();
        }
      );
    });
}

// Function to update employee manager
function updateEmployeeManager() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: 'Enter the ID or name of the employee to update:',
      },
      {
        type: 'input',
        name: 'newManager',
        message: 'Enter the new manager for the employee:',
      },
    ])
    .then((answers) => {
      const employeeId = answers.employeeId;
      const newManager = answers.newManager;
      const query = 'UPDATE employee SET manager = ? WHERE id = ? OR name = ?';
      connection.query(
        query,
        [newManager, employeeId, employeeId],
        (err, results) => {
          if (err) throw err;
          console.log('Employee manager updated successfully.');
          startApp();
        }
      );
    });
}
