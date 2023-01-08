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
        break;

      case "View all roles":
        viewRole();
        break;
      
      case "View all employees":
        viewEmployee();
        break;

      case "Add a department":
        addDepartment();
        break;
      
      case "Add a role":
        addRole();
        break;

      case "Add an employee":
          addEmployee();
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
  startPrompt();
}
// View all roles
function viewRole() {
  connection.query(`SELECT * FROM role`, (err, res) => {
      if (err) throw err;
      console.log('\n\n')
      console.table(res);
  });
 startPrompt();
}

// View all employees
function viewEmployee() {
  connection.query(`SELECT * FROM employee`, (err, res) => {
      if (err) throw err;
      console.log('\n\n')
      console.table(res);
  });
  startPrompt();
}

// Add a department

const addDepartment = () => {
  inquirer
      .prompt([
          {
              type: 'input',
              name: 'newDepartment',
              message: 'What is the new department name?'
          },
      ])
      .then((data) => {
          connection.query('INSERT INTO department SET ?',
              {
                  name: data.newDepartment,
              },
              function (err) {
                  if (err) throw err;
              }
          );
          console.log('New department added to employee_db database.')
          viewDepartment();
      });
};

connection.connect((err) => {
  if (err) throw err;

});

// Add a role
const addRole = () => {
  connection.query('SELECT * FROM department', (err, departments) => {
      if (err) console.log(err);
      departments = departments.map((department) => {
          return {
              name: department.name,
              value: department.id,
          };
      });
      inquirer
          .prompt([
              {
                  type: 'input',
                  name: 'newRole',
                  message: 'What is the new role?'
              },
              {
                  type: 'input',
                  name: 'salary',
                  message: 'What is the salary of the new role?',
              },
              {
                  type: 'list',
                  name: 'departmentId',
                  message: 'What is the department of the new role?',
                  choices: departments,
              },
          ])
          .then((data) => {
              connection.query(
                  'INSERT INTO role SET ?',
                  {
                      title: data.newRole,
                      salary: data.salary,
                      department_id: data.departmentId,
                  },
                  function (err) {
                      if (err) throw err;
                  }
              );
              console.log('New roleadded to employee_db database.')
              viewRole();
          });

  });

};

// Add an employee



// // Classes
// class Department{
//   constructor(name){
//       this.name = name;
//   }
// }

// module.exports = Department;

// class Role {
//   constructor(title, salary, department_id) {
//       this.title = title;
//       this.salary = salary;
//       this.department_id = department_id;
//   }
// }

// module.exports = Role;

// class Employee {
//   constructor(first_name, last_name, role_id, manager_id) {
//       this.first_name = first_name;
//       this.last_name = last_name;
//       this.role_id = role_id;
//       this.manager_id = manager_id;
//   }
// }

// module.exports = Employee;