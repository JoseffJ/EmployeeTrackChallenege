import inquirer from 'inquirer';
import { Pool } from 'pg';

// Database connection configuration
const pool = new Pool({
  user: 'your_database_user',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_database_password',
  port: 5432,
});

// Main Menu
const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Exit',
      ],
    },
  ]);

  switch (action) {
    case 'View All Departments':
      await viewAllDepartments();
      break;
    case 'View All Roles':
      await viewAllRoles();
      break;
    case 'View All Employees':
      await viewAllEmployees();
      break;
    case 'Add Department':
      await addDepartment();
      break;
    case 'Add Role':
      await addRole();
      break;
    case 'Add Employee':
      await addEmployee();
      break;
    case 'Update Employee Role':
      await updateEmployeeRole();
      break;
    case 'Exit':
      console.log('Goodbye!');
      pool.end();
      return;
  }

  // Return to main menu after each action
  await mainMenu();
};

// Database Queries
const viewAllDepartments = async () => {
  const res = await pool.query('SELECT * FROM departments');
  console.table(res.rows);
};

const viewAllRoles = async () => {
  const res = await pool.query(`
    SELECT roles.id, roles.title, roles.salary, departments.name AS department
    FROM roles
    JOIN departments ON roles.department_id = departments.id
  `);
  console.table(res.rows);
};

const viewAllEmployees = async () => {
  const res = await pool.query(`
    SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    JOIN roles ON employees.role_id = roles.id
    JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees AS manager ON employees.manager_id = manager.id
  `);
  console.table(res.rows);
};

const addDepartment = async () => {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:',
    },
  ]);
  await pool.query('INSERT INTO departments (name) VALUES ($1)', [name]);
  console.log(`Department '${name}' added successfully.`);
};

const addRole = async () => {
  const { title, salary, department_id } = await inquirer.prompt([
    { type: 'input', name: 'title', message: 'Enter the role title:' },
    { type: 'number', name: 'salary', message: 'Enter the salary:' },
    { type: 'number', name: 'department_id', message: 'Enter the department ID:' },
  ]);
  await pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [
    title,
    salary,
    department_id,
  ]);
  console.log(`Role '${title}' added successfully.`);
};

const addEmployee = async () => {
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    { type: 'input', name: 'first_name', message: "Enter the employee's first name:" },
    { type: 'input', name: 'last_name', message: "Enter the employee's last name:" },
    { type: 'number', name: 'role_id', message: 'Enter the role ID:' },
    { type: 'number', name: 'manager_id', message: "Enter the manager's ID (or leave blank):" },
  ]);
  await pool.query(
    'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [first_name, last_name, role_id, manager_id || null]
  );
  console.log(`Employee '${first_name} ${last_name}' added successfully.`);
};

const updateEmployeeRole = async () => {
  const { employee_id, role_id } = await inquirer.prompt([
    { type: 'number', name: 'employee_id', message: 'Enter the ID of the employee to update:' },
    { type: 'number', name: 'role_id', message: 'Enter the new role ID:' },
  ]);
  await pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
  console.log('Employee role updated successfully.');
};

// Initialize the CLI
mainMenu();
