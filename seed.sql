INSERT INTO department (name)
VALUES 
("Sales"), 
("Accounting"), 
("Customer Service"), 
("HR");

INSERT INTO role (title, salary, department_id)
VALUES 
("Sr Sales Rep", 100000, 1), 
("Sales Rep", 80000, 1),
("Sr Accountant", 120000, 2),
("Accountant", 95000, 2),
("Customer Service Rep", 80000, 3),
("HR Rep", 110000, 4),
("Receptionist", 70000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Jim", "Halpert", 1, 1),
("Dwight", "Schrute", 2, 1),
("Pam", "Beesly", 7, null),
("Stanley", "Hudson", 2, 1),
("Angela", "Martin", 3, null),
("Kevin", "Malone", 4, 2),
("Oscar", "Martinez", 4, 2),
("Toby", "Flenderson", 6, 4);

select * from employee;

select title, salary, name from role 
inner join department on role.department_id=department.id;

select first_name, last_name, title, salary, name from employee 
inner join role on employee.role_id=role.id 
inner join department on role.department_id=department.id;
