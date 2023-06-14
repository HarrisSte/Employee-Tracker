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
  connection.query(
    'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, CONCAT(manager.first_name, " ", manager.last_name) AS manager_name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id JOIN employee manager ON employee.manager_id = manager.id',
    (err, res) => {
      if (err) throw err;
      console.table(res);
      startApp();
    }
  );
}

// Function to view employees by department
function viewAllEmployeesByDepartment() {
  connection.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;

    const deptChoices = [];
    for (let i = 0; i < results.length; i++) {
      deptChoices.push({
        name: results[i].department_name,
        value: results[i].id,
      });
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'department',
          message: 'Select a department:',
          choices: deptChoices,
        },
      ])
      .then((answers) => {
        const department = answers.department;
        connection.query(
          'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, CONCAT(manager.first_name, " ", manager.last_name) AS manager_name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id JOIN employee manager ON employee.manager_id = manager.id WHERE department.id = ?',
          [department],
          (err, res) => {
            if (err) throw err;
            console.table(res);
            startApp();
          }
        );
      });
  });
}

// Function to view employees by manager
function viewAllEmployeesByManager() {
  connection.query(
    'SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL',
    (err, results) => {
      if (err) throw err;

      const managerChoices = [];
      for (let i = 0; i < results.length; i++) {
        managerChoices.push({
          name: `${results[i].first_name} ${results[i].last_name}`,
          value: results[i].id,
        });
      }
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'manager',
            message: 'Enter the manager id:',
            choices: managerChoices,
          },
        ])
        .then((answers) => {
          const manager = answers.manager;
          const query =
            'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, CONCAT(manager.first_name, " ", manager.last_name) AS manager_name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id JOIN employee manager ON employee.manager_id = manager.id WHERE manager_id = ?';
          connection.query(query, [manager], (err, results) => {
            if (err) throw err;
            console.table(results);
            startApp();
          });
        });
    }
  );
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
  connection.query('SELECT id, title FROM role', (err, results) => {
    if (err) throw err;

    const roleChoices = [];
    for (let i = 0; i < results.length; i++) {
      roleChoices.push({
        name: results[i].title,
        value: results[i].id,
      });
    }

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: 'Enter the ID of the employee to update:',
        },
        {
          type: 'list',
          name: 'newRole',
          message: 'Select the new role for the employee!',
          choices: roleChoices,
        },
      ])
      .then((answers) => {
        const employeeId = answers.employeeId;
        const roleId = answers.newRole;
        const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
        connection.query(query, [roleId, employeeId], (err, results) => {
          if (err) throw err;
          console.log('Employee role updated successfully.');
          startApp();
        });
      });
  });
}

// Function to update employee manager
function updateEmployeeManager() {
  connection.query(
    'SELECT id, first_name, last_name FROM employee',
    (err, results) => {
      if (err) throw err;

      const managerChoices = [];
      for (let i = 0; i < results.length; i++) {
        managerChoices.push({
          name: `${results[i].first_name} ${results[i].first_name}`,
          value: results[i].id,
        });
      }

      inquirer
        .prompt([
          {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the ID of the employee to update:',
          },
          {
            type: 'list',
            name: 'newManager',
            message: 'Enter the new manager for the employee:',
            choices: managerChoices,
          },
        ])
        .then((answers) => {
          const employeeId = answers.employeeId;
          const newManager = answers.newManager;
          const query = 'UPDATE employee SET manager_id = ? WHERE id = ?';
          connection.query(query, [newManager, employeeId], (err, results) => {
            if (err) throw err;
            console.log('Employee manager updated successfully.');
            startApp();
          });
        });
    }
  );
}
