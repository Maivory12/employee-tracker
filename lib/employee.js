const { promptUser } = require('../index')
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { dropManager, createManagerTable, addManagers } = require('./manager');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Antonio11$',
    database: 'employees'
});

// View all employees
const viewAllEmp = () => {

    // connect to db
    connection.query(
        // Manipulate tables to view all employees
        `SELECT employee.id, employee.first_name, employee.last_name, roles.title AS role, roles.salary AS salary, manager.first_name AS manager,
        department.name AS department 
        FROM employee
        LEFT JOIN roles
        ON employee.role_id = roles.id
        LEFT JOIN department
        ON roles.department_id = department.id
        LEFT JOIN manager
        ON employee.manager_id = manager.id`,
        // Call back function to decide what to do with data
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }

            // Show the results as a table to the user
            console.table(results);

            // Re-prompt the user
            promptUser();
        }
    );
};

// View Employees by Department
const viewEmpByDep = () => {

    // Connect to db
    connection.query(
        // Get the table contents from department table
        `SELECT * FROM department`,

        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }
            // Create empty array for storing info
            depArr = [];
            // for each item in the results array, push the name of the department to the department array
            results.forEach(item => {
                depArr.push(item.name)
            });
            inquirer
                .prompt({
                    type: 'list',
                    name: 'filter-emp-dep',
                    message: 'Choose a department to filter from:',
                    // Choices are from the department array, this will allow for the user to add departments in future
                    choices: depArr
                })
                .then((data) => {
                    // Take the data and filter based on what user chose
                    connection.query(
                        `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department 
                            FROM employee
                            LEFT JOIN roles
                            ON employee.role_id = roles.id
                            LEFT JOIN department
                            ON roles.department_id = department.id
                            WHERE department.name = ?`,
                        // Value user chose that will be replaced with question mark, this prevents SQL Injection attacks
                        [data['filter-emp-dep']],
                        function (err, results, fields) {
                            if (err) {
                                console.log(err.message);
                                return;
                            }

                            // Show results as table
                            console.table(results);
                            // Reprompt user
                            promptUser();
                        }
                    )
                });
        }
    );
};

module.exports = { viewAllEmp, viewEmpByDep };