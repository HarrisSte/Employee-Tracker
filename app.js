//Dependencies
const inquirer = require('inquirer');
const mysql2 = require('mysql2');

const PORT = process.env.PORT || 3001;
 

//Connection to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_trackerDB',
  },
  console.log(`Connected to the employee_trackerDB database.`)
);
