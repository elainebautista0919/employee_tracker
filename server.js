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

      case "Update an employee role":
          updateEmployeeRole();
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
              console.log('New role added to employee_db database.')
              viewRole();
          });

  });

};

// Add an employee
const addEmployee = () => {
  connection.query('SELECT * FROM role', (err, roles) => {
      if (err) console.log(err);
      roles = roles.map((role) => {
          return {
              name: role.title,
              value: role.id,
          };
      });
      inquirer
          .prompt([
              {
                type: 'input',
                name: 'firstName',
                message: 'What is the first name of the new employee?'
              },
              {
                type: 'input',
                name: 'lastName',
                message: 'What is the last name of the new employee?'
              },
              {
                type: 'list',
                name: 'role',
                message: 'What is the role of the employee?',
                choices: roles,
              },
              {
                type: 'list',
                name: 'managerId',
                message: 'Please select a manager ID.',
                choices: [1, 2, 3, 4, 5, 6, 7]
              }
          ])
          .then((data) => {
              console.log(data.role);
              connection.query(
                  'INSERT INTO employee SET ?',
                  {
                    first_name: data.firstName,
                    last_name: data.lastName,
                    role_id: data.role,
                    manager_id: data.managerId
                  },
                  (err) => {
                    if (err) throw err;
                      console.log('New employee added to employee_db database.');
                      viewEmployee();

                  }
              );
          });

  });

};

// Update an employee role
const updateEmployeeRole = () => {
  connection.query('SELECT * FROM employee', (err, employees) => {
      if (err) console.log(err);
      employees = employees.map((employee) => {
          return {
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
          };
      });
      connection.query('SELECT * FROM role', (err, roles) => {
          if (err) console.log(err);
          roles = roles.map((role) => {
              return {
                  name: role.title,
                  value: role.id,
              }
          });
          inquirer
              .prompt([
                  {
                      type: 'list',
                      name: 'selectEmployee',
                      message: 'Select an employee to update.',
                      choices: employees,
                  },
                  {
                      type: 'list',
                      name: 'selectNewRole',
                      message: 'Select a new employee role.',
                      choices: roles,
                  },
              ])
              .then((data) => {
                  connection.query('UPDATE employee SET ? WHERE ?',
                      [
                          {
                              role_id: data.selectNewRole,
                          },
                          {
                              id: data.selectEmployee,
                          },
                      ],
                      function (err) {
                          if (err) throw err;
                      }
                  );
                  console.log('New employee role update to employee_db database.');
                  viewEmployee();
              });
      });
  });
};