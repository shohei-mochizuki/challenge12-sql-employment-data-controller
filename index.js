// Include packages needed for this application
const inquirer = require('inquirer');
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt'); // This is an add-on to limit the number of input letters
const fs = require("fs");
const shapeSvg = require("./lib/shapes.js"); // Import shape classes ("Circle", "Square" and "Triangle")

inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt) // This is an add-on to limit the number of input letters

// Create an array of questions for user input
const questions = [
{type: 'maxlength-input',
message: 'What characters do you want to include in thd logo? (Up to 3 characters)',
name: 'characters',
maxLength: 3},
{type: 'input',
message: 'Which color do you want to use for the font? (Please type a color keyword or a hexadecimal number)',
name: 'font_color'},
{type: 'list',
message: 'Choose a shape for your logo.',
name: 'shape',
choices: ["circle ○", "square □", "triangle △"]},
{type: 'input',
message: 'Which color do you want to use for the shape? (Please type a color keyword or a hexadecimal number)',
name: 'shape_color'},
];


// Function to write SVG file
function createLogo(fileName, data) {
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
  inquirer.prompt(questions) // Prompt window shows up first
  .then((response) => {
    createLogo("./examples/logo.svg", response); // Then logo.svg file will be created in the folder "examples"
    }
  )
}


// Function call to initialize app
init();
