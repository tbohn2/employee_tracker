INSERT INTO department (name)
VALUES
("Doctors"),
("Clinical Support"),
("Patient Coodination"),
("Insurance");

INSERT INTO role (title, salary, department_id)
VALUES
("Head Doctor", 300000, 1),
("Affiliate Doctor", 175060, 1),
("Lead Assistant", 70000, 2),
("Assistant", 50000, 2),
("Sterile Tech", 25000, 2),
("Front Lead", 80000, 3),
("Treatment Coordinator", 65000, 3),
("Receptionist", 40000, 3),
("Auditor", 70000, 4),
("Insurance Verification", 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Michael", "Prouder", 1, null),
("Don", "Jenkins", 2, 1),
("Charlette", "Scarlet", 2, 1),
("Bonnie", "Ledder", 3, null),
("Johnny", "Prince", 4, 4),
("Bett", "Beclean", 5, 4),
("Berenice", "Ankind", 6, null),
("Geff", "Harmony", 7, 7),
("Isaiah", "Haiduke", 8, 7),
("Aiwanna", "Smith", 9, null),
("Isa", "Montoya", 10, 10)