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
        viewDepartment();
        startPrompt();
        break;

      case "View all roles":
        viewRole();
        startPrompt();
        break;
      
      case "View all employees":
        viewEmployee();
        startPrompt();
        break;

      case "Add a department":
        inquirer.prompt([
            {
                name: "department",
                type: "input",
                message: "What is the new department name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },

        ]).then(answers => {
            addDepartment(answers.Department);
            startPrompt();
        })
        break;
      
      case "Add a role":
        addRole();
        startPrompt();
        break;

      case "Add an employee":
          addEmployee();
          startPrompt();
          break;
    }
  })
}

// View all departments
function viewDepartment() {
  connection.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      console.log('\n\n')
      console.table(res);
  });
}
// View all roles
function viewRole() {
  connection.query(`SELECT * FROM role`, 
                    (err, res) => {
                        if (err) throw err;
                        console.log('\n\n')
                        console.table(res);
                    });
}

// View all employees
function viewEmployee() {
  connection.query(`SELECT * FROM employee`, 
                    (err, res) => {
                        if (err) throw err;
                        console.log('\n\n')
                        console.table(res);
                    });
}

// Add a department
function addDepartment(department) {

  var department = connection.query(
      "INSERT INTO department SET ?",
      [department],
      function (error, department) {
          if (err) throw err;
          console.log('\n\n')
          console.table(res);
      });

  departmentTable();
}

// Add a role

// Add an employee