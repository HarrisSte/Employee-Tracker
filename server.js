//Dependencies
const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const util = require('util');

const PORT = process.env.PORT || 3001;

//Connection to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: '',
    database: 'employee_trackerDB',
  },
  console.log(`Connected to the employee_trackerDB database.`)
);

connection.query = util.promisify(connection.query);

//Connect to MySQL server
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server');
  startApp();
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

//Function to view all employees
function viewAllEmployees() {}

//Funtion to view employees by department
function viewAllEmployeesByDepartment() {}

//Funtion to view employees by manager
function viewAllEmployeesByManager() {}

//Function to remove employee
function removeEmployee() {}

//Function to update employee role
function updateEmployeeRole() {}

//Function to update employee manager
function updateEmployeeManager() {}
