# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql


```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Task

1. Create a new database called `cyf_classes` (hint: use `createdb` in the terminal)
2. ## Create a new table `mentors`, for each mentor we want to save their name, how many years they lived in Glasgow, their address and their favourite programming language.

   CREATE TABLE mentors (
   id SERIAL PRIMARY KEY,
   name VARCHAR(120) NOT NULL,
   address VARCHAR NOT NULL,
   years_glasgow INT NOT null,
   programming_language VARCHAR (20) NOT NULL
   );
   --
3. ## Insert 5 mentors in the `mentors` table (you can make up the data, it doesn't need to be accurate ;-)).
   insert into mentors (id, name, address, years_glasgow, programming_language) values (1, 'Me', 'near here', 10, 'HTML');
   insert into mentors (id, name, address, years_glasgow, programming_language) values (2, 'MeMe', 'near there', 9, 'CSS');
   insert into mentors (id, name, address, years_glasgow, programming_language) values (3, 'You', ' here', 8, 'Javascript');
   insert into mentors (id, name, address, years_glasgow, programming_language) values (4, 'YouYou', 'there', 7, 'React');
   insert into mentors (id, name, address, years_glasgow, programming_language) values (5, 'Them', 'far', 6, 'Python');
   --
4. ## Create a new table `students`, for each student we want to save their name, address and if they have graduated from Code Your Future.
  --
   CREATE TABLE students (
   id SERIAL PRIMARY KEY,
   name VARCHAR(120) NOT NULL,
   address VARCHAR NOT NULL,
   graduated_cyf BOOLEAN NOT null
   );
   --
5. ## Insert 10 students in the `students` table.
   insert into students (id, name, address, graduated_cyf) values (1, 'Me', 'near here', true);
   insert into students (id, name, address, graduated_cyf) values (2, 'Me', 'near here', true);
   insert into students (id, name, address, graduated_cyf) values (3, 'Me', 'near here', true);
   insert into students (id, name, address, graduated_cyf) values (4, 'Me', 'near here', false);
   insert into students (id, name, address, graduated_cyf) values (5, 'Me', 'near here', true);
   insert into students (id, name, address, graduated_cyf) values (6, 'Me', 'near here', false);
   insert into students (id, name, address, graduated_cyf) values (7, 'Me', 'near here', true);
   insert into students (id, name, address, graduated_cyf) values (8, 'Me', 'near here', false);
   insert into students (id, name, address, graduated_cyf) values (9, 'Me', 'near here', true);
   insert into students (id, name, address, graduated_cyf) values (10, 'Me', 'near here', false);
   --
6. ## Verify that the data you created for mentors and students are correctly stored in their respective tables (hint: use a `select` SQL statement).
   select * from mentors;
   select * from students;
   select * from classes;
   --
7. Create a new `classes` table to record the following information:

   - A class has a leading mentor
   - A class has a topic (such as Javascript, NodeJS)
   - ## A class is taught at a specific date and at a specific location
   --
     CREATE TABLE classes (
     class_id SERIAL PRIMARY KEY,
     leading_mentor VARCHAR(30) NOT NULL,
     topic VARCHAR(30) NOT NULL,
     class_date date NOT null,
     location VARCHAR(120) not null
     );
     --

8. ## Insert a few classes in the `classes` table

   --
   insert into classes (class_id, leading_mentor, topic, class_date, location) values (1, 'Me', 'CSS', '2021-08-07', 'Barcelona');
   insert into classes (class_id, leading_mentor, topic, class_date, location) values (2, 'Him', 'CSS', '2021-10-07', 'Badalona');
   insert into classes (class_id, leading_mentor, topic, class_date, location) values (3, 'Her', 'CSS', '2021-08-01', 'Girona');
   insert into classes (class_id, leading_mentor, topic, class_date, location) values (4, 'You', 'CSS', '2020-08-07', 'Vic');
   --

9. ## We now want to store who among the students attends a specific class. How would you store that? Come up with a solution and insert some data if you model this as a new table.
   --
   CREATE TABLE class1 (
   student_id INT REFERENCES students(student_id),
   mentor_id INT REFERENCES mentors(mentor_id)
   );
   insert into class1 (student_id, mentor_id) values (1,3);
   insert into class1 (student_id, mentor_id) values (3,1);
   insert into class1 (student_id, mentor_id) values (2,2);
   insert into class1 (student_id, mentor_id) values (4,5);
   --

## select * from class1;

10. Answer the following questions using a `select` SQL statement:
    - Retrieve all the mentors who lived more than 5 years in Glasgow
      select * from mentors where years_glasgow > 5;
    - Retrieve all the mentors whose favourite language is Javascript
      select * from mentors where programming_language = 'Javascript';
    - Retrieve all the students who are CYF graduates
      select * from students where graduated_cyf = true;
    - Retrieve all the classes taught before June this year
      select * from classes where class_date < '2021-06-01';
    - Retrieve all the students (retrieving student ids only is fine) who attended the Javascript class (or any other class that you have in the `classes` table).
      select * from class1;
