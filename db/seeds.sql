-- Department
INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Marketing"),
       ("IT"),
       ("Finance"),
       ("Operations");

-- Role
INSERT INTO role (title, department_name, salary)
VALUES ("Sales Manager", "Sales", 80000),
       ("Marketing Manager", "Marketing", 90000),
       ("Engineering Manager", "IT", 250000),
       ("Software Engineer", "IT", 150000),
       ("Finance Manager", "Finance", 120000),
       ("Operations Manager", "Operations", 75000);
       
-- Employee
INSERT INTO employee (first_name, last_name, role_id, department_name, salary, manager_id)
VALUES ("Mike", "Chen", 1, 1, 1, null),
       ("James", "Moore", 2, 2, 2, null),
       ("Michael", "Donald", 3, 3, 3, null),
       ("Gary", "Lee", 4, 4, 4, 3),
       ("Samantha", "Price", 5, 5, 5, null),
       ("Catherine", "Sutton", 6, 6, 6, null),
