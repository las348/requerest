insert into department (name)
values ('Sales'), ('Engineering'), ('Finance'), ('Legal');

select * from department;

insert into role (title, salary, department_id)
values ('Sales Lead', 100000, 1), ('Accountant', 120000, 3), ('CTO', 500000, 2), ('Lawyer', 150000, 2);

select * from roles;

insert into employee (first_name, last_name, role_id)
values ('Chu', 'Chu',1), ('Kobe', 'Kobe', 2), ('Dan', 'Dan', 3), ('Steve', 'Steve', 4);

select * from employee;