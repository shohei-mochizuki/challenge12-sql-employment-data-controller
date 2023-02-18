// 1. LIBRALIES & VARIABLES
// Include packages needed for this application
const inquirer = require('inquirer');
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt'); // This is an add-on to limit the number of input letters
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt);
const mysql = require('mysql2');
const cTable = require('console.table');

// Create a connection to mySQL
let db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employment_db'
  },
  console.log(`Connected to the employment_db database.`)
);

// List of options users will see at the beginning
const listOptionsInitial = ["View all departments", 
"View all roles", 
"View all employees", 
"Add a department", 
"Add a role", 
"Add an employee", 
"Update an employee's role",
"Update an employee's manager",
"Quit"];

// Create arrays of questions for user input
const questionInitial = [ // This set of questions will be asked at the begining
  {type: 'list',
   message: 'What would you like to do?',
   name: 'action',
   choices: listOptionsInitial}
  ];

const questionAddDepartment = [ // This set of questions will be asked when a user choose "Add a department"
  {type: 'maxlength-input',
   message: 'What is the name of the department?',
   name: 'new_department',
   maxLength: 30},
  ];

const questionAddRole = [ // This set of questions will be asked when a user choose "Add a role"
  {type: 'maxlength-input',
    message: 'What is the title of the role?',
    name: 'role_title',
    maxLength: 30},
  {type: 'input',
   message: 'What is the salary of the role? (input a number/value)',
   name: 'role_salary'},
  {type: 'list',
   message: 'Which department does the role belong to?',
   name: 'role_department',
   choices: []}
  ];

const questionAddEmployee = [ // This set of questions will be asked when a user choose "Add an employee"
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

const questionUpdateEmployeeRole = [ // This set of questions will be asked when a user choose "Update an employee's role"
  {type: 'list',
    message: 'Whose role do you want to update?',
    name: 'update_emp_name',
    choices: []},
  {type: 'list',
    message: 'Which role do you want to assign the selected employee?',
    name: 'update_emp_role',
    choices: []},
  ];

const questionUpdateEmployeeManager = [ // This set of questions will be asked when a user choose "Update an employee's role"
  {type: 'list',
    message: 'Whose role do you want to update?',
    name: 'update_emp_name',
    choices: []},
  {type: 'list',
    message: 'Which role do you want to assign the selected employee?',
    name: 'update_emp_role',
    choices: []},
  ];


// 2. FUNCTIONS  
// 2-1. Function of viewing data from mySQL
function queryView (queryText) {
  db.query(queryText, function (err, results) {
    if (results) {
      console.log(` `);
      console.table(results);
      console.log(`--------- ⬇ CHOOSE YOUR NEXT ACTION ---------`);
      init()
    } else {
      console.error(err)
    };
  })
};

// 2-2. Function of adding data to mySQL
function queryAdd (queryText) {
  db.query(queryText, function (err, results) {
    if (results) {
      console.log(`Successfully added a new element as ID no.${results.insertId}

--------- ⬇ CHOOSE YOUR NEXT ACTION ---------`);
      init()
    } else {
      console.error(err)
    };
  })
};

// 2-3. Function of updating data in mySQL
function queryUpdate (queryText) {
  db.query(queryText, function (err, results) {
    console.log(results);
    if (results) {
      console.log(`Successfully updated the data!

--------- ⬇ CHOOSE YOUR NEXT ACTION ---------`);
      init()
    } else {
      console.error(err)
    };
  })
};

// 2-4 Switch function depending on what user wants to do
function reaction(data) {
  switch (data.action) {
    
    case "View all departments":
      queryText = 'SELECT department_id AS "Id", department_name AS "Department" FROM department ORDER BY department_id ASC';
      queryView(queryText);
      break;

    case "View all roles":
      queryText = 'SELECT role_id AS "Id", role_title AS "Role", department_name AS "Department", CONCAT("$",role_salary) AS "Salary" FROM role JOIN department ON role.department_id = department.department_id ORDER BY role_id ASC';
      queryView(queryText);
      break;
    
    case "View all employees":
      queryText = 'SELECT one.employee_id AS "Id", CONCAT(one.employee_firstname, " ", one.employee_lastname) AS "Name", role_title AS "Role", department_name AS "Department", CONCAT("$",role_salary) AS "Salary", CONCAT(two.employee_firstname, " ", two.employee_lastname) AS "Manager" FROM employee one JOIN role ON one.role_id = role.role_id JOIN department ON role.department_id = department.department_id LEFT JOIN employee two ON one.manager_id = two.employee_id ORDER BY one.employee_id ASC';
      queryView(queryText);
      break;
    
    case "Add a department":
      inquirer.prompt(questionAddDepartment) // Prompt to ask user to input data for new department
        .then((response) => {
          queryText = `INSERT INTO department (department_name) VALUES ("${response.new_department}")`
          queryAdd(queryText);
        })
      break;

    case "Add a role":
      db.query("SELECT * FROM department", function (err, results) {
        var listOfDepartments = {};
        results.forEach(element => {
          listOfDepartments[element.department_name] = element.department_id; 
        });
        questionAddRole[2].choices = Object.keys(listOfDepartments);
        inquirer.prompt(questionAddRole) // Prompt to ask user to input data for new role
        .then((response) => {
          queryText = `INSERT INTO role (role_title, role_salary, department_id) VALUES ("${response.role_title}", ${response.role_salary}, ${listOfDepartments[response.role_department]})`;
          queryAdd(queryText);
        })
      });
      break;

    case "Add an employee":
      db.query("SELECT role_id, role_title FROM role", function (err, res) {
        let listOfRoles = {};
        res.forEach(e => {
          listOfRoles[e.role_title] = e.role_id; 
        });
        questionAddEmployee[2].choices = Object.keys(listOfRoles);
        db.query("SELECT employee_id, employee_firstname, employee_lastname FROM employee", function (error, results) {
          let listOfEmployees = {};
          results.forEach(element => {
            listOfEmployees[element.employee_firstname + " " + element.employee_lastname] = element.employee_id; 
          });
          questionAddEmployee[3].choices = Object.keys(listOfEmployees);
          inquirer.prompt(questionAddEmployee) // Prompt to ask user to input data for new employee
          .then((response) => {
            queryText = `INSERT INTO employee (employee_firstname, employee_lastname, role_id, manager_id) VALUES ("${response.employee_firstname}", "${response.employee_lastname}", ${listOfRoles[response.employee_role]}, ${listOfEmployees[response.employee_manager]})`;
            queryAdd(queryText);
          });
        });
      });
      break;
      
    case "Update an employee's role":
      db.query("SELECT employee_id, employee_firstname, employee_lastname FROM employee", function (error, results) {
        let listOfEmployees = {};
        results.forEach(element => {
          listOfEmployees[element.employee_firstname + " " + element.employee_lastname] = element.employee_id; 
        });
        questionUpdateEmployeeRole[0].choices = Object.keys(listOfEmployees);  
        db.query("SELECT role_id, role_title FROM role", function (err, res) {
          let listOfRoles = {};
          res.forEach(e => {
            listOfRoles[e.role_title] = e.role_id; 
          });
          questionUpdateEmployeeRole[1].choices = Object.keys(listOfRoles);
          inquirer.prompt(questionUpdateEmployeeRole) // Prompt to ask user to input data to update employee's role
          .then((response) => {
            queryText = `UPDATE employee SET role_id = ${listOfRoles[response.update_emp_role]} WHERE employee_id = ${listOfEmployees[response.update_emp_name]}`;
            queryUpdate(queryText);
          });
        });
      });
      break;

      case "Update an employee's manager":
        db.query("SELECT employee_id, employee_firstname, employee_lastname FROM employee", function (error, results) {
          let listOfEmployees = {};
          results.forEach(element => {
            listOfEmployees[element.employee_firstname + " " + element.employee_lastname] = element.employee_id; 
          });
          questionUpdateEmployeeManager[0].choices = Object.keys(listOfEmployees);  
          db.query("SELECT role_id, role_title FROM role", function (err, res) {
            let listOfRoles = {};
            res.forEach(e => {
              listOfRoles[e.role_title] = e.role_id; 
            });
            questionUpdateEmployeeManager[1].choices = Object.keys(listOfRoles);
            inquirer.prompt(questionUpdateEmployeeManager) // Prompt to ask user to input data to update employee's role
            .then((response) => {
              queryText = `UPDATE employee SET role_id = ${listOfRoles[response.update_emp_role]} WHERE employee_id = ${listOfEmployees[response.update_emp_name]}`;
              queryUpdate(queryText);
            });
          });
        });
        break;

    case "Quit":
      console.log("Bye!");
      db.end(); // This ends connection with mySQL
      break;
  }
}


// 2-5. Function to initialize app
function init() {
  inquirer.prompt(questionInitial) // Prompt window shows up first
    .then((res) => {
        reaction(res);
      })
    .catch((err) => {
      console.error(err);
    })
}


// 3. INITIALIZE APP
init();
