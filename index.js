// Include packages needed for this application
const inquirer = require('inquirer');
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt'); // This is an add-on to limit the number of input letters
const fs = require("fs");
const shapeSvg = require("./lib/shapes.js"); // Import shape classes ("Circle", "Square" and "Triangle")

inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt) // This is an add-on to limit the number of input letters

let listOptionsInitial = ["View all departments", 
"View all roles", 
"View all employees", 
"Add a department", 
"Add a role", 
"Add an employee", 
"Update an employee role",
"Quit"];

let listDepartments = [];
let listRoles = [];
let listEmployees = [];

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
   choices: listDepartments}
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
    choices: listRoles},
  {type: 'list',
    message: 'Who is the manager of the employee?',
    name: 'employee_manager',
    choices: listEmployees}
  ];

const questionUpdateEmployee = [
  {type: 'list',
    message: 'Whose role do you want to update?',
    name: 'update_emp_name',
    choices: listEmployees},
  {type: 'list',
    message: 'Which role do you want to assign the selected employee?',
    name: 'update_emp_role',
    choices: listRoles},
  ];


// Function to write SVG file
function reaction(data) {
  switch (data.action) {
    // When 
    case "View all departments": 
      fs.writeFile(fileName, (new shapeSvg.Circle(data.shape_color, data.font_color, data.characters)).createSvg(), 
      (err) => err ? console.error(err) : console.log('Generated logo.svg'));
      break;
    // When 
    case "View all roles":
      fs.writeFile(fileName, (new shapeSvg.Square(data.shape_color, data.font_color, data.characters)).createSvg(), 
      (err) => err ? console.error(err) : console.log('Generated logo.svg'));
      break;
    // When
    case "View all employees":
      fs.writeFile(fileName, (new shapeSvg.Triangle(data.shape_color, data.font_color, data.characters)).createSvg(), 
      (err) => err ? console.error(err) : console.log('Generated logo.svg'));
      break;
          // When
    case "Add a department":
      fs.writeFile(fileName, (new shapeSvg.Triangle(data.shape_color, data.font_color, data.characters)).createSvg(), 
      (err) => err ? console.error(err) : console.log('Generated logo.svg'));
      break;
          // When
    case "Add a role":
      fs.writeFile(fileName, (new shapeSvg.Triangle(data.shape_color, data.font_color, data.characters)).createSvg(), 
      (err) => err ? console.error(err) : console.log('Generated logo.svg'));
      break;
          // When
    case "Add an employee":
      fs.writeFile(fileName, (new shapeSvg.Triangle(data.shape_color, data.font_color, data.characters)).createSvg(), 
      (err) => err ? console.error(err) : console.log('Generated logo.svg'));
      break;
          // When
    case "Update an employee role":
      fs.writeFile(fileName, (new shapeSvg.Triangle(data.shape_color, data.font_color, data.characters)).createSvg(), 
      (err) => err ? console.error(err) : console.log('Generated logo.svg'));
      break;
          // When
    case "Quit":
      fs.writeFile(fileName, (new shapeSvg.Triangle(data.shape_color, data.font_color, data.characters)).createSvg(), 
      (err) => err ? console.error(err) : console.log('Generated logo.svg'));
      break;
  }
}


// Function to initialize app
function init() {
  inquirer.prompt(questionInitial) // Prompt window shows up first
  .then((response) => {
    console.log(response);
    // reaction(response);
    }
  )
}


// Function call to initialize app
init();
