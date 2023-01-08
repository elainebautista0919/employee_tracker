// Import and require express
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// Import and require inquirer
const inquirer = require("inquirer");
const util = require("util");
// Import console table
const cTable = require('console.table');
const { application } = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee_db"
});

connection.connect((err) => {
  if (err) {
      console.log(err);
      res.status(500);
      return res.send("Error conencting to database.");
  } console.log("Connected to employee_db database.");

  // Function for inquirer to prompt data
  startPrompt();

})

connection.query = util.promisify(connection.query);

function startPrompt() {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
    ]
  }).then (answer => {
    switch (answer.action) {
      case "View all departments":
        byDepartment();
        startPrompt();
        break;

      case "View all roles":
        byRole();
        startPrompt();
        break;
      
      case "View all employees":
        byEmployee();
        startPrompt();
        break;
      
    }
  })
}

// View all departments
function byDepartment() {
  var department = connection.query('SELECT * FROM department', function (err, results) {
    console.log(results);
   })
}