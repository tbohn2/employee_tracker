const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Mbaechapa',
        database: 'workplace_db'
    },
);
const startSelect = () =>
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'selection1',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
            }
        ])
        .then((selection) => {
            if (selection.selection1 === 'View All Employees') {
                viewAllEmployees()
                console.log('All employees');
            }
            if (selection.selection1 === 'Add Employee') {
                console.log('hi');
            }
            if (selection.selection1 === 'Update Employee Role') {
                console.log('hi');
            }
            if (selection.selection1 === 'View All Roles') {
                console.log('hi');
            }
            if (selection.selection1 === 'Add Role') {
                console.log('hi');
            }
            if (selection.selection1 === 'View All Departments') {
                console.log('hi');
            }
            if (selection.selection1 === 'Add Department') {
                console.log('hi');
            }
            if (selection.selection1 === 'Quit') {
                console.log('hi');
            }
        }
        )

// employee ids, first names, last names, job titles, departments, salaries, and managers
function viewAllEmployees() {
    const sql = `SELECT e.id, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS 'Job Title', department.name AS 'Department', role.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
    FROM employee e 
    JOIN role ON e.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee m ON e.manager_id = m.id;`;
    const params = [];
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log('oh no!');
        }
        console.table(result)
    });
}

startSelect();