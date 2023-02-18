// Include packages needed for this application
const inquirer = require('inquirer');
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt'); // This is an add-on to limit the number of input letters
const mysql = require('mysql2');

inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt) // This is an add-on to limit the number of input letters

let db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employment_db'
  },
  console.log(`Connected to the employment_db database.`)
);

const listOptionsInitial = ["View all departments", 
"View all roles", 
"View all employees", 
"Add a department", 
"Add a role", 
"Add an employee", 
"Update an employee role",
"Quit"];

// Create an array of questions for user input
const questionInitial = [
  {type: 'list',
   message: 'What would you like to do?',
   name: 'action',
   choices: listOptionsInitial}
  ];

const questionAddDepartment = [
  {type: 'maxlength-input',
   message: 'What is the name of the department?',
   name: 'department',
   maxLength: 30},
  ];

const questionAddRole = [
  {type: 'maxlength-input',
    message: 'What is the title of the role?',
    name: 'role_title',
    maxLength: 30},
  {type: 'input',
   message: 'What is the salary of the role?',
   name: 'role_salary'},
  {type: 'list',
   message: 'Which department does the role belong to?',
   name: 'role_department',
   choices: []}
  ];

const questionAddEmployee = [
  {type: 'maxlength-input',
    message: 'What is the first name of the employee?',
    name: 'employee_firstname',
    maxLength: 30},
  {type: 'maxlength-input',
    message: 'What is the last name of the employee?',
    name: 'employee_lastname',
    maxLength: 30},
  {type: 'list',
    message: 'What is the role of the employee?',
    name: 'employee_role',
    choices: []},
  {type: 'list',
    message: 'Who is the manager of the employee?',
    name: 'employee_manager',
    choices: []}
  ];

const questionUpdateEmployee = [
  {type: 'list',
    message: 'Whose role do you want to update?',
    name: 'update_emp_name',
    choices: []},
  {type: 'list',
    message: 'Which role do you want to assign the selected employee?',
    name: 'update_emp_role',
    choices: []},
  ];

function queryAction (queryText) {
  db.query(queryText, function (err, results) {
    if (results) {
      console.table(results);
      init()
    } else {
      console.error(err)
    };
  })
};

// Function
function reaction(data) {
  switch (data.action) {
    case "View all departments":
      queryText = 'SELECT department_id AS "Id", department_name AS "Department" FROM department';
      queryAction(queryText);
      break;
    // When 
    case "View all roles":
      queryText = 'SELECT role_id AS "Id", role_title AS "Role", department_name AS "Department", role_salary AS "Salary" FROM role JOIN department ON role.department_id = department.department_id';
      queryAction(queryText);
      break;
    // When
    case "View all employees":
      queryText = 'SELECT one.employee_id AS "Id", CONCAT(one.employee_firstname, " ", one.employee_lastname) AS "Name", role_title AS "Role", department_name AS "Department", role_salary AS "Salary", CONCAT(two.employee_firstname, " ", two.employee_lastname) AS "Manager" FROM employee one JOIN role ON one.role_id = role.role_id JOIN department ON role.department_id = department.department_id LEFT JOIN employee two ON one.manager_id = two.employee_id';
      queryAction(queryText);
      break;
    // When
    case "Add a department":
      inquirer.prompt(questionAddDepartment)
        .then((response) => {
          queryText = `INSERT INTO department (department_name) VALUES ("${response.department}")`
          queryAction(queryText);
        })
      break;
          // When
    case "Add a role":
      db.query("SELECT * FROM department", function (err, results) {
        let listOfDepartments = {};
        results.forEach(element => {
          listOfDepartments[element.department_name] = element.department_id; 
        });
        questionAddRole[2].choices = Object.keys(listOfDepartments);
        inquirer.prompt(questionAddRole)
        .then((response) => { // role_title, role_salary, role_department
          console.log(response)
        });
      })
      break;
          // When
    case "Add an employee":
      console.log("You'll be able to add an employee soon")
      .then(() => init());
      break;
          // When
    case "Update an employee's role":
      console.log("You'll be able to update an employee's role soon")
      .then(() => init());
      break;
    case "Quit":
      console.log("Bye!");
      db.end();
      break;
  }
}


// Function to initialize app
function init() {
  inquirer.prompt(questionInitial) // Prompt window shows up first
    .then((res) => {
        reaction(res);
      })
    .catch((err) => {
      console.error(err);
    })
}


// Function call to initialize app
init();
