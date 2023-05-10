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
("Michael", "Phelps", 1, null),
("Don", "Quixote", 2, 1),
("Charlette", "Thedoc", 2, 1),
("Bonnie", "Lead", 3, null),
("Johnny", "Rocket", 4, 4),
("Bett", "Beclean", 5, 4),
("Berenice", "Ankind", 6, null),
("Get", "Yomony", 7, 7),
("Isaiah", "Hello", 8, 7),
("Aiwanna", "Dacash", 9, null),
("Isa", "Leegood", 10, 10)