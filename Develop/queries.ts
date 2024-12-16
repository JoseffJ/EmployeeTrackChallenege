import pool from './connections';

export const getAllDepartments = async (): Promise<any[]> => {
  const res = await pool.query('SELECT * FROM departments');
  return res.rows;
};

export const getAllRoles = async (): Promise<any[]> => {
  const res = await pool.query(
    `SELECT roles.id, roles.title, roles.salary, departments.name AS department 
     FROM roles 
     JOIN departments ON roles.department_id = departments.id`
  );
  return res.rows;
};

export const getAllEmployees = async (): Promise<any[]> => {
  const res = await pool.query(
    `SELECT employees.id, employees.first_name, employees.last_name, roles.title, 
            departments.name AS department, roles.salary, 
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
     FROM employees 
     JOIN roles ON employees.role_id = roles.id 
     JOIN departments ON roles.department_id = departments.id 
     LEFT JOIN employees AS manager ON employees.manager_id = manager.id`
  );
  return res.rows;
};

export const addDepartment = async (name: string): Promise<void> => {
  await pool.query('INSERT INTO departments (name) VALUES ($1)', [name]);
};

export const addRole = async (title: string, salary: number, departmentId: number): Promise<void> => {
  await pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
};

export const addEmployee = async (
  firstName: string,
  lastName: string,
  roleId: number,
  managerId: number | null
): Promise<void> => {
  await pool.query(
    'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [firstName, lastName, roleId, managerId]
  );
};

export const updateEmployeeRole = async (employeeId: number, roleId: number): Promise<void> => {
  await pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
};

export const deleteDepartment = async (departmentId: number): Promise<void> => {
  await pool.query('DELETE FROM departments WHERE id = $1', [departmentId]);
};

export const deleteRole = async (roleId: number): Promise<void> => {
  await pool.query('DELETE FROM roles WHERE id = $1', [roleId]);
};

export const deleteEmployee = async (employeeId: number): Promise<void> => {
  await pool.query('DELETE FROM employees WHERE id = $1', [employeeId]);
};

export const getDepartmentBudget = async (departmentId: number): Promise<number> => {
  const res = await pool.query(
    `SELECT SUM(roles.salary) AS total_budget 
     FROM employees 
     JOIN roles ON employees.role_id = roles.id 
     WHERE roles.department_id = $1`,
    [departmentId]
  );
  return res.rows[0].total_budget || 0;
};
