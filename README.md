# Challenge 12 - Express : Easy Notetaker [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## DESCRIPTION 
This application enables you to create a list of notes with only a few steps! Go to the webpage and input the information below. You can easily save and delete tasks.
* Title of the note
* Contents (texts)

## TABLE OF CONTENTS
[INSTALLATION](#installation)<br>
[USAGE](#usage)<br>
[LICENSE](#license)<br>
[CONTRIBUTION](#contribution)<br>
[TESTS](#tests)<br>
[SCREENSHOTS](#screenshots)<br>
[QUESTIONS](#questions)

## INSTALLATION 
### HEROKU
If you use the application on Heroku, no installation is needed. Go to the webpage directly: [https://shohei-easynotetaker.herokuapp.com/](https://shohei-easynotetaker.herokuapp.com/)
### LOCAL COMPUTER
If you'd like to use the application on your local computer, follow the guidelines below:<br>
This application requires 1.JavaScript, 2.Node.JS (version 16, not the latest) and 3.Node package manager to run. In a blank folder, please put necessary files (please refer to the TESTS section for the details) and open the command line. In the command line, move to this folder and then type "npm install". Make sure that a folder called "node_modules" and a file called package-lock.json are created. This application uses the following libraries: express and uuid. Type "npm start" in the command line and you'll see a  message "App listening at http://localhost:3001 🚀". Go to a web browser and type this URL. 

## USAGE 
On the landing page, click the "Get Started" button to go to the note section. Once you're in the note section, you can see saved notes on the left-hand side of the page and new note creation section on the right-hand side.
* To delete a note, click a red bin icon in the list. 
* To see the details of a saved note, click the note title in the list. 
* To make a new note, click the + icon at the top right corner.
* To save a new note, type a note title and its content (text) in the form and click the file icon at the top right corner. 
* To go back to the landing page, click the webpage title "Note Taker" at the top left corner.

## LICENSE 
MIT:<br>
Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the “Software”), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so.

## CONTRIBUTION 
Please feel free to develop this application by forking the GitHub repository and sending me pull requests. You can also contact me.

## TESTS 
### HEROKU
If you use the application on Heroku, no installation is needed. Go to the webpage directly: [https://shohei-easynotetaker.herokuapp.com/](https://shohei-easynotetaker.herokuapp.com/)
### LOCAL COMPUTER
Please copy the following files and folder to your computer and test this application:
```md
.
├── db/db.json
├── helpers/fsUtils.js
├── public/               
|   ├── assets/           
|   |   ├── css/styles.css
|   |   └── js/index.js     
|   ├── index.html         
|   └── notes.html        
├── routes/
|   ├── index.js
|   └── notes.js          
├── package.json
└── server.js  
``` 

## SCREENSHOTS
![image](https://user-images.githubusercontent.com/121307266/219237671-9f8bb3c5-ae24-471c-88ba-cba0db10c897.png)
![image](https://user-images.githubusercontent.com/121307266/219237784-bc10f76e-cc21-4120-8977-986de19b35d1.png)
![image](https://user-images.githubusercontent.com/121307266/219237884-62d6939e-df14-467e-acf4-a2ca46258afa.png)

## QUESTIONS 
If you have any questions, please feel free to reach out to me!<br>
GitHub page: [https://github.com/shohei-mochizuki](https://github.com/shohei-mochizuki)<br>
Email: [shohei.mochizuki.jp@gmail.com](mailto:shohei.mochizuki.jp@gmail.com)
