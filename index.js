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
   name: 'shape',
   choices: listOptionsInitial}
  ];

const questionAddDepartment = [
  {type: 'maxlength-input',
   message: 'What is the name of the department?',
   name: 'new_department',
   maxLength: 30},
  ];

const questionAddRole = [
  {type: 'maxlength-input',
    message: 'What is the title of the role?',
    name: 'title',
    maxLength: 30},
  {type: 'input',
   message: 'What is the salary of the role?',
   name: 'salary'},
  {type: 'list',
   message: 'Which department does the role belong to?',
   name: 'department',
   choices: listDepartments}
  ];

const questionAddEmployee = [
  {type: 'maxlength-input',
    message: 'What is the first name of the employee?',
    name: 'title',
    maxLength: 30},
  {type: 'maxlength-input',
    message: 'What is the last name of the employee?',
    name: 'title',
    maxLength: 30},
  {type: 'list',
    message: 'What is the role of the employee?',
    name: 'department',
    choices: listRoles},
  {type: 'list',
    message: 'Who is the manager of the employee?',
    name: 'department',
    choices: listEmployees}
  ];

const questionUpdateEmployee = [
  {type: 'list',
    message: 'Whose role do you want to update?',
    name: 'department',
    choices: listEmployees},
  {type: 'list',
    message: 'Which role do you want to assign the selected employee?',
    name: 'department',
    choices: listRoles},
  ];


// Function to write SVG file
function reaction(data) {
  switch (data.shape) {
    // When "circle ○" is chosen, create an instance of the class "Circle" and use its function "createSvg" to create a SVG file with the user input data
    case "circle ○": 
      fs.writeFile(fileName, (new shapeSvg.Circle(data.shape_color, data.font_color, data.characters)).createSvg(), 
      (err) => err ? console.error(err) : console.log('Generated logo.svg'));
      break;
    // When "square □" is chosen, create an instance of the class "Square" and use its function "createSvg" to create a SVG file with the user input data
    case "square □":
      fs.writeFile(fileName, (new shapeSvg.Square(data.shape_color, data.font_color, data.characters)).createSvg(), 
      (err) => err ? console.error(err) : console.log('Generated logo.svg'));
      break;
    // When "triangle △" is chosen, create an instance of the class "Triangle" and use its function "createSvg" to create a SVG file with the user input data
    case "triangle △":
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
