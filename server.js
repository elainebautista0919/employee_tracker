// Import and require express
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// Import and require inquirer
const inquirer = require("inquirer")
// Import console table
const cTable = require('console.table');

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
  runSearch();

})
