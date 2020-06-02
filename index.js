//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");


var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "password",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});


function start() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "userChoice",
                message: 'Would you like to view department, roles, employees, or exit?',
                choices: ['department', 'roles', 'employees', 'Exit'],
            },
        ])
        .then(answers => {
            if (answers.userChoice === "department") {
                viewDepartment();
            } else if
                (answers.userChoice === "roles") {
                viewRoles();
            } else if
                (answers.userChoice === "employees") {
                viewEmployees();
            } else
                (answers.userChoice === 'Exit')
            connection.end();
        });
};


function viewDepartment() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the dept you would like to submit?"
            },
        ])
        .then(function (answer) {
            connection.query("INSERT INTO department SET ?",
                {
                    name: answer.item
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your dept was created successfully!");
                    // re-prompt the user for if they want to bid or post
                    start();
                })
        })
}

function viewRoles() {
    connection.query(`select title, salary, name from role inner 
    join department on role.department_id=department.id`, function (err, results) {
        if (err) throw err;
        console.table(results);
        start()
    });
};

function viewEmployees() {
    connection.query('select first_name, last_name, title, salary, name from employee inner join role on employee.role_id=role.id inner join department on role.department_id=department.id', function (err, results) {
        if (err) throw err;
        console.table(results);
        start()
    });
};

