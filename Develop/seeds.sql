INSERT INTO departments (name) VALUES
('Human Resources'),
('Engineering'),
('Finance'),
('Marketing');

INSERT INTO roles (title, salary, department_id) VALUES
('HR Manager', 75000, 1),
('Software Engineer', 95000, 2),
('Accountant', 65000, 3),
('Marketing Specialist', 60000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Johnson', 1, NULL),
('Bob', 'Smith', 2, NULL),
('Charlie', 'Brown', 3, NULL),
('Diana', 'Prince', 4, NULL),
('Eve', 'White', 2, 2),
('Frank', 'Black', 4, 4);
