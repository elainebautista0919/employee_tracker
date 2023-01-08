-- Department
INSERT INTO department (name)
VALUES ("Sales"),
       ("Marketing"),
       ("IT"),
       ("Finance"),
       ("Operations");

SELECT * FROM department;

-- Role
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 80000, 1),
       ("Marketing Manager", 90000, 2),
       ("Engineering Manager", 250000, 3),
       ("Software Engineer", 150000, 3),
       ("Finance Manager", 120000, 4),
       ("Operations Manager", 75000, 5);

SELECT * FROM role;
       
-- Employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chen", 1, null),
       ("James", "Moore", 2, null),
       ("Michael", "Donald", 3, null),
       ("Gary", "Lee", 4, null),
       ("Mary", "Stevens", 4, null),
       ("Samantha", "Price", 5, null),
       ("Catherine", "Sutton", 6, null);

SELECT * FROM employee;
