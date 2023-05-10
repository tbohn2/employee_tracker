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
                addEmployee();
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
        startSelect();
    });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the first name of the employee? '
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the last name of the employee? '
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the role of the employee? ',
                choices: ['Head Doctor', 'Affiliate Doctor', 'Lead Assistant', 'Assistant', 'Sterile Tech', 'Front Lead', 'Treatment Coordinator', 'Receptionist', 'Auditor', 'Insurance Verification']
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is the manager of the employee? ',
                choices: ['Michael Phelps', 'Bonnie Lead', 'Berenice Ankind', 'Aiwanna Dacash']
            },
        ])
        .then((selection) => {
            let mFirst
            let mLast
            let mID
            db.query(`SELECT first_name, last_name FROM employee WHERE manager_id IS NULL;`, [], (err, results) => {
                for (let i = 0; i < results.length; i++) {
                    if (results[i].first_name + " " + results[i].last_name === selection.manager) {
                        mFirst = results[i].first_name;
                        mLast = results[i].last_name;
                    }
                }
                db.query(`SELECT id FROM employee WHERE first_name = '${mFirst}' AND last_name = '${mLast}';`, [], (err, results) => {
                    mID = results[0].id;
                })
            })

            let roleID
            db.query(`SELECT * FROM role;`, [], (err, results) => {
                for (let i = 0; i < results.length; i++) {
                    if (results[i].title === selection.role) {
                        roleID = results[i].id;
                        console.log(roleID);
                    }
                }
            })
            return
        })
        .then(() => {
            db.query()
        })

    // startSelect()

    //         const sql = `SELECT e.id, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS 'Job Title', department.name AS 'Department', role.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
    // FROM employee e 
    // JOIN role ON e.role_id = role.id
    // JOIN department ON role.department_id = department.id
    // LEFT JOIN employee m ON e.manager_id = m.id;`;
    //         const params = [];
    //         db.query(sql, params, (err, result) => {
    //             if (err) {
    //                 console.log('oh no!');
    //             }
    //             console.table(result)
    //         });
    //         startSelect();



}



startSelect();