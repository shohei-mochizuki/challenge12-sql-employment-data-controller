INSERT INTO department (department_name)
VALUES ("Human Resources"),
       ("Engineering"),
       ("Customer Support");

INSERT INTO role (role_title, role_salary, department_id)
VALUES ("HR Director", 150000, 1),
       ("HR Specialist", 70000, 1),
       ("Engineering Director", 150000, 2),
       ("Engineering Manager", 120000, 2),
       ("Senior Engineer", 100000, 2),
       ("Junior Engineer", 70000, 2),
       ("Customer Support Manager", 120000, 3),
       ("Customer Support Specialist", 70000, 3);

INSERT INTO employee (employee_firstname, employee_lastname, role_id, manager_id)
VALUES ("Barack", "Obama", 1),
       ("Anna", "Smith", 2, 1),
       ("Adams", "Coen", 2, 1),
       ("Bill", "Gates", 3),
       ("Tim", "Cook" 4, 4),
       ("Sundar", "Pichai" 5, 4),
       ("Jack", "Dorsey" 6, 4),
       ("Elon", "Musk" 7, 1),
       ("George", "Clooney", 8, 4),
       ("Natalie", "Portman", 8, 8);
