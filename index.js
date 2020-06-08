const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;

  console.log("\n=============================")
  console.log("------ EMPLOYEE TRACKER -----");
  console.log("=============================\n")

  start();
});

function start() {
  inquirer
    .prompt({
      name: "userInput",
      type: "list",
      message:
        "What would you like to do?",
      choices: ["VIEW_DEPARTMENTS", "VIEW_ROLES", "VIEW_EMPLOYEES", "VIEW_MANAGERS", "ADD_DEPARTMENTS", "ADD_ROLES", "ADD_EMPLOYEES", "UPDATE_EMPLOYEE_ROLE", "UPDATE_MANAGER", "EXIT"],
    })
    .then(function (answer) {
      switch (answer.userInput) {
        case "VIEW_DEPARTMENTS":
          viewDepartments();
          break;
        case "VIEW_ROLES":
          viewRoles();
          break;
        case "VIEW_EMPLOYEES":
          viewEmployees();
          break;
        case "VIEW_MANAGERS":
          viewManagers();
          break;
        case "ADD_DEPARTMENTS":
          addDepartment();
          break;
        case "ADD_ROLES":
          addRole();
          break;
        case "ADD_EMPLOYEES":
          addEmployee();
          break;
        case "UPDATE_EMPLOYEE_ROLE":
          update_Employee();
          break;
        case "UPDATE_MANAGER":
          update_Manager();
          break;
        case "EXIT":
        default:
          connection.end();
      }
    });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
}

function viewRoles() {
  connection.query(
    `select title, salary, name from role 
    inner join department on role.department_id=department.id`,
    function (err, results) {
      if (err) throw err;
      console.table(results);
      start();
    }
  );
}

function viewEmployees() {
  connection.query(
    `select first_name, last_name, manager_id, title, salary, name from employee 
    inner join role on employee.role_id=role.id 
    inner join department on role.department_id=department.id`,
    function (err, results) {
      if (err) throw err;
      console.table(results);
      start();
    }
  );
}

function printResults(err, result) {
  if (err) throw err;
  console.log(result);
  start();
}

async function addDepartment() {

  const department = await inquirer.prompt([
    {
      name: "name",
      message: "What is the name of the department"
    }
  ])

  connection.query(`insert into department (name) values ('${department.name}')`, printResults)
}

function addRole() {
  connection.query("select * from department", async function (err, results) {

    const departments = results.map((result) => ({
      name: result.name,
      value: result.id
    }))

    const roleInfo = await inquirer.prompt([
      {
        name: "title",
        message: "What is the title for the position"
      },
      {
        name: "salary",
        message: "What is the salary for the position"
      },
      {
        type: "list",
        name: "department_id",
        message: "Which Department does the role belong to?",
        choices: departments
      }
    ])

    connection.query(`insert into role (title, salary, department_id) values('${roleInfo.title}','${roleInfo.salary}','${roleInfo.department_id}' )`, printResults)

  })
}

function addEmployee() {
  connection.query("select * from role", async function (err, results) {

    const roles = results.map((result) => ({
      name: result.title,
      value: result.id
    }))

    const employeeInfo = await inquirer.prompt([
      {
        name: "first_name",
        message: "What is the first name of the employee"
      },
      {
        name: "last_name",
        message: "What is the last name of the employee"
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the employee's role?",
        choices: roles
      }
    ])

    connection.query(`insert into employee (first_name, last_name, role_id) values('${employeeInfo.first_name}','${employeeInfo.last_name}','${employeeInfo.role_id}' )`, printResults)

  })
}

function update_Employee() {

  connection.query("select * from employee", function (err, employees) {

    connection.query("select * from role", async function (err, roles) {

      const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id
      }))

      const employeeChoices = employees.map((employee) => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.id
      }))

      const updateEmployee = await inquirer.prompt([
        {
          type: "list",
          name: "employee_id",
          message: "Which employee would you like to update?",
          choices: employeeChoices
        },
        {
          type: "list",
          name: "role_id",
          message: "What would you like their new role to be?",
          choices: roleChoices
        }
      ])

      connection.query(`update employee set role_id=${updateEmployee.role_id} where id=${updateEmployee.employee_id}`, printResults)

    })
  })
}


function viewManagers() {
  connection.query(
    `SELECT 
    CONCAT(m.last_name, ', ', m.first_name) AS Manager,
    CONCAT(e.last_name, ', ', e.first_name) AS 'Direct report'
    FROM employee m
    INNER JOIN employee e ON 
    m.id = e.manager_id
    ORDER BY Manager ASC`,
    function (err, results) {
      if (err) throw err;
      console.table(results);
      start();
    }
  );
}


function update_Manager() {

  connection.query("select * from employee", async function (err, employees) {

    const employeeChoices = employees.map((employee) => ({
      name: employee.first_name + " " + employee.last_name,
      value: employee.id
    }))

    // const managerChoices = employees.map((managers) => ({
    //   name: managers.first_name + " " + managers.last_name,
    //   value: managers.manager_id
    // }))

    const updateManager = await inquirer.prompt([
      {
        type: "list",
        name: "employee_id",
        message: "Which employee would you like to update?",
        choices: employeeChoices
      },
      {
        type: "list",
        name: "manager_id",
        message: "Who would you like their new manager to be?",
        choices: employeeChoices
      }
    ])

    connection.query(`UPDATE employee SET manager_id=${updateManager.manager_id} where id=${updateManager.employee_id}`, printResults)

  })
}

