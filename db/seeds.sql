INSERT INTO department (name)
VALUES ('Customer Service'),
    ('Idea Creator'),
    ('Engineering');

INSERT INTO roles (title, salary, department_id)
VALUES ('Customeer Service Lead', 250000, 1),
    ('Customer Service', 7000, 3),
    ('Idea Creator Lead', 100000, 2),
    ('Idea Creator', 70000, 2),
    ('Lead Engineer', 150000, 3),
    ('Engineer', 120000, 3);

INSERT INTO employee (
        first_name,
        last_name,
        role_id,
        manager_id,
        manager_confirm
    )
VALUES ('Tom', 'Brady', 1, null, true),
    ('James', 'Paxon', 2, 1, false),
    ('Kyle', 'Hurd', 2, 1, false),
    ('Nick', 'Samual', 3, null, true),
    ('Mack', 'Jones', 4, 2, false),
    ('John', 'Davison', 4, 2, false),
    ('Tim', 'Mauler', 4, 2, false),
    ('Caleb', 'McDavis', 5, null, true),
    ('Samantha', 'Jameson', 6, 3, false),
    ('Maria', 'Jackson', 6, 3, false);

INSERT INTO manager (first_name, last_name)
SELECT first_name,
    last_name
FROM employee
WHERE manager_confirm = 1;