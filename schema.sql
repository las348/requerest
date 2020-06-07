DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

use employee_db;

create table department (
id int auto_increment primary key,
name varchar(30) not null
);

create table role (
id int auto_increment primary key,
title varchar(30) not null,
salary decimal (10,2) not null,
department_id int not null
);

create table employee (
id int not null auto_increment primary key,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id int not null,
manager_id int,
FOREIGN KEY (manager_id) REFERENCES employee (id)
);