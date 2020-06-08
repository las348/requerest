INSERT INTO department (name)
VALUES 
("Sales"), 
("Accounting"), 
("Customer Service"), 
("Corporate"),
("HR");

INSERT INTO role (title, salary, department_id)
VALUES 
("Sr Sales Rep", 100000, 1), 
("Sales Rep", 80000, 1),
("Sr Accountant", 120000, 2),
("Accountant", 95000, 2),
("Customer Service Rep", 80000, 3),
("HR Rep", 110000, 5),
("CEO", 500000, 4),
("Receptionist", 70000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Jim", "Halpert", 1, null),
("Dwight", "Schrute", 2, 1),
("Pam", "Beesly", 7, null),
("Stanley", "Hudson", 2, 1),
("Angela", "Martin", 3, null),
("Kevin", "Malone", 4, 5),
("Oscar", "Martinez", 4, 5),
("David", "Wallace", 4, null),
("Toby", "Flenderson", 6, 8);

select * from employee;

select title, salary, name from role 
inner join department on role.department_id=department.id;

select first_name, last_name, manager_id, title, salary, name from employee 
inner join role on employee.role_id=role.id 
inner join department on role.department_id=department.id;

SELECT 
    CONCAT(m.last_name, ', ', m.first_name) AS Manager,
    CONCAT(e.last_name, ', ', e.first_name) AS 'Direct report'
FROM employee m
INNER JOIN employee e ON 
    m.id = e.manager_id
ORDER BY Manager ASC;
