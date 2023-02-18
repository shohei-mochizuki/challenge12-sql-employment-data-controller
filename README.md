# Challenge 12 - SQL : Employment Data Controller [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## DESCRIPTION 
This application enables you to create and manage employment related data using Command Line! You can do the following actions:
* View general data (List of departments, roles or employees)
* View specific data (List of employees by a manager or by a department)
* View total budget per department 
* Add new data (a department, a role or an employee)
* Update data (Role or Manager of an employee)
* Delete data (A department, a role or an employee)

## TABLE OF CONTENTS
[INSTALLATION](#installation)<br>
[USAGE](#usage)<br>
[LICENSE](#license)<br>
[CONTRIBUTION](#contribution)<br>
[TESTS](#tests)<br>
[SCREENSHOTS](#screenshots)<br>
[DEMO](#demo)<br>
[QUESTIONS](#questions)

## INSTALLATION 
This application requires 1.JavaScript, 2.Node.JS (version 16, not the latest) and 3.Node package manager to run. In a blank folder, put necessary files (refer to the TESTS section for the details) and open the command line. In the command line, move to this folder and then type "npm install". Make sure that a folder called "node_modules" and a file called package-lock.json are created. Following libraries are used:
* inquirer (version 8.2.4) and its add-on (maxlength input prompt)
* mysql2
* console.table

## USAGE 
### Step 1. Data Preparation 
First you need to load your data onto MySQL server. Go to Command Line and go to the folder of this application which contains db folder and index.js. Once you're in the folder, type "mysql -u root" (if you get a server connection error, type "mysql.server start" first) and then you're ready to use MySQL. In MySQL, type "source db/schema.sql;" first and then "source db/seeds.sql;". Now this database is available in MySQL and you can exit MySQL by typing "quit" and hit Enter button.  

### Step 2. Data Management
In Command Line, type "node index.js". It takes you to the list of actions. Choose the option you'd like. Keep in mind the following rules:
* Name of a department cannot be longer than 30 characters
* Name of a role/title cannot be longer than 30 characters
* First and last names of an employee cannot be longer than 30 characters
* Salary should be a number. Do not input "k" or "$" marks

## LICENSE 
MIT:<br>
Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the “Software”), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so.

## CONTRIBUTION 
Feel free to develop this application by forking the GitHub repository and sending me pull requests. You can also contact me.

## TESTS 
Copy the following files and folder to your computer and test this application:
```md
.
├── db/
|   ├── schema.sql
|   └── seeds.sql
├── index.js          
└── package.json
``` 

## SCREENSHOTS
![image](https://user-images.githubusercontent.com/121307266/219885075-c96eae61-6122-489e-9bc2-903f487dd004.png)
![image](https://user-images.githubusercontent.com/121307266/219885090-e8ccbcd4-892c-4942-b9ee-af84dd14e394.png)

## DEMO
[Demo video](https://drive.google.com/file/d/14S-iRzW-uj3V_bIrqswidJkC7BuBzU6N/view)<br>
[Demo video (another link)](https://watch.screencastify.com/v/u2AAt1kFMxkBHBiQj27U)

## QUESTIONS 
If you have any questions, feel free to reach out to me!<br>
GitHub page: [https://github.com/shohei-mochizuki](https://github.com/shohei-mochizuki)<br>
Email: [shohei.mochizuki.jp@gmail.com](mailto:shohei.mochizuki.jp@gmail.com)
