const inquirer = require('inquirer');

// Inital Prompt - Main Menu
const promptUser = () => {
    inquirer

        // Prompt the user
        .prompt({
            type: 'list',
            name: 'begin choices',
            message: 'What would you like to do? (Select on of the following)',
            choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Update Employee Role', 'View Departments', 'Add Department', 'View Roles', 'Add Role', 'View totalized budget', 'I am finished']
        })
    };
    
    module.exports = { promptUser }    