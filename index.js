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
                const display = new Employee
                display.viewAll()
            }
            if (selection.selection1 === 'Add Employee') {
                const display = new Employee
                display.addNew()
            }
            if (selection.selection1 === 'Update Employee Role') {
                console.log('hi');
            }
            if (selection.selection1 === 'View All Roles') {
                const display = new Role
                display.viewAll()
            }
            if (selection.selection1 === 'Add Role') {
                console.log('hi');
            }
            if (selection.selection1 === 'View All Departments') {
                const display = new Department
                display.viewAll()
            }
            if (selection.selection1 === 'Add Department') {
                console.log('hi');
            }
            if (selection.selection1 === 'Quit') {
                console.log('hi');
            }
        }
        )

class Workplace {
    constructor() {
        this.view = (sql, params) => {
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log('oh no!');
                }
                console.table(result)
                startSelect();
            });
        }
    }
};

class Employee extends Workplace {
    constructor() {
        super()
        this.viewAll = () => {
            const sql = `SELECT e.id, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS 'Job Title', department.name AS 'Department', role.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
    FROM employee e 
    JOIN role ON e.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee m ON e.manager_id = m.id;`;
            const params = [];
            this.view(sql, params)
        }

        this.addNew = () => {
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
                    console.log(selection.role);
                    const fName = selection.firstName
                    const lName = selection.lastName
                    const mFirstName = selection.manager.split(' ')[0]
                    const mLastName = selection.manager.split(' ')[1]
                    let mID
                    let roleID
                    findID()
                    function findID() {
                        db.query(`SELECT id FROM role WHERE title = ?;`, selection.role, (err, results) => {
                            if (err) { console.log(err); }
                            roleID = results[0].id;
                        })
                        db.query(`SELECT id FROM employee WHERE first_name = ? AND last_name = ?;`, [mFirstName, mLastName], (err, results) => {
                            if (err) { console.log(err); }
                            mID = results[0].id;
                            insertEmployee(fName, lName, roleID, mID)
                        })
                    }
                    function insertEmployee(fName, lName, roleID, mID) {
                        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                            VALUES ('${fName}', '${lName}', ${roleID}, ${mID})`
                        const params = []
                        console.log('New employee added');
                        db.query(sql, params, (err, results) => {
                            if (err) { console.log(err); }
                            startSelect()
                        })
                    }
                })
        }
    }
}

class Role extends Workplace {
    constructor() {
        super()
        this.viewAll = () => {
            const sql = `SELECT role.id, title AS 'Job Title', department.name AS 'Department', salary AS 'Salary'
            FROM role 
            JOIN department ON role.department_id = department.id;`;
            const params = [];
            this.view(sql, params)
        }
    }
}

class Department extends Workplace {
    constructor() {
        super()
        this.viewAll = () => {
            const sql = `SELECT id, name AS 'Department Names' FROM department; `;
            const params = [];
            this.view(sql, params)
        }
    }
}

startSelect()