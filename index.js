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
                console.log('hi');
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

startSelect();