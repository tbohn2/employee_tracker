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
                const display = new Employee
                display.update()
            }
            if (selection.selection1 === 'View All Roles') {
                const display = new Role
                display.viewAll()
            }
            if (selection.selection1 === 'Add Role') {
                const display = new Role
                display.addNew()
            }
            if (selection.selection1 === 'View All Departments') {
                const display = new Department
                display.viewAll()
            }
            if (selection.selection1 === 'Add Department') {
                const display = new Department
                display.addNew()
            }
            if (selection.selection1 === 'Quit') {
                process.exit();
            }
        }
        )

class Workplace {
    constructor() {
        this.view = (sql, params) => {
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err);
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
        this.update = () => {
            let eArray = []
            db.query(`SELECT first_name, last_name FROM employee;`, [], (err, results) => {
                if (err) { console.log(err); }
                for (let i = 0; i < results.length; i++) {
                    const e = results[i].first_name + ' ' + results[i].last_name
                    eArray.push(e);
                }
            })
            let rArray = []
            db.query(`SELECT title FROM role;`, [], (err, results) => {
                if (err) { console.log(err); }
                for (let i = 0; i < results.length; i++) {
                    rArray.push(results[i].title);
                }
                selectEmployee()
            })
            function selectEmployee() {
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'employee',
                            message: 'Which employee would you like to update?',
                            choices: eArray
                        }
                    ])
                    .then((employee) => {
                        inquirer
                            .prompt([
                                {
                                    type: 'list',
                                    name: 'newRole',
                                    message: 'What is the new role of the employee?',
                                    choices: rArray
                                }
                            ])
                            .then((newRole) => {
                                const emp = employee.employee.split(' ')[1]
                                let roleID
                                db.query(`SELECT id FROM role WHERE title = ?;`, newRole.newRole, (err, results) => {
                                    if (err) { console.log(err); }
                                    roleID = results[0].id;
                                    db.query(`UPDATE employee SET role_id = ? WHERE last_name = ?;`, [roleID, emp], (err, results) => {
                                        if (err) { console.log(err); }
                                        startSelect()
                                    })
                                })
                            })
                    })

            }
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
                        choices: ['Michael Prouder', 'Bonnie Ledder', 'Berenice Ankind', 'Aiwanna Smith']
                    },
                ])
                .then((selection) => {
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
        this.addNew = () => {
            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'What is the title of the new role? '
                    },
                    {
                        type: 'number',
                        name: 'salary',
                        message: 'What is the annual salary of the role? '
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Which department will contain this role? ',
                        choices: ['Doctors', 'Clinical Support', 'Patient Coordination', 'Insurance']
                    },
                ])
                .then((selection) => {
                    const title = selection.title
                    const salary = selection.salary
                    findID()
                    function findID() {
                        db.query(`SELECT id FROM department WHERE name = ?;`, selection.department, (err, results) => {
                            if (err) { console.log(err); }
                            const deptID = results[0].id;
                            insertRole(title, salary, deptID)
                        })
                    }
                    function insertRole(title, salary, deptID) {
                        const sql = `INSERT INTO role (title, salary, department_id) 
                            VALUES ('${title}', '${salary}', ${deptID})`
                        const params = []
                        console.log('New role added');
                        db.query(sql, params, (err, results) => {
                            if (err) { console.log(err); }
                            startSelect()
                        })
                    }
                })
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
        this.addNew = () => {
            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'What is the name of the new department? '
                    },
                ])
                .then((selection) => {
                    const deptName = selection.name
                    insertDept(deptName)
                    function insertDept(name) {
                        const sql = `INSERT INTO department (name) 
                            VALUES ('${name}')`
                        const params = []
                        console.log('New department added');
                        db.query(sql, params, (err, results) => {
                            if (err) { console.log(err); }
                            startSelect()
                        })
                    }
                })
        }
    }
}

startSelect()