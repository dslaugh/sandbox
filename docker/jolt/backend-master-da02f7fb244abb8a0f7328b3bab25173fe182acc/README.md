# Backend Test

**** NOTE *****
If you're not familiar with Docker, please feel free to spend some time before actually taking the test. It will not count against your time. Get familiar with Docker and then start the assessment.

Thank you for your interest in joining the backend team at Jolt! We are a hard working bunch that is eager to learn and implement new technologies while also being willing to maintain legacy code. While completion of this test is important to us, if you get stuck, feel free to reach out with questions and feel free to submit a test that’s not 100% complete.

## Guidelines
* The purpose of this Test is to help us evaluate your backend development skills
* You are allowed to use any non-human resource. Ex:
  * **Allowed:** StackOverflow, Google, reference code on Github, etc.
  * **Not Allowed:** Chatting or calling your old boss, using the code of your friend who already took this assessment
* You have a maximum of 5 hours to take the test. Please don't exceed this time limit.

## Deliverables
Once you have completed the test please fill out this Google Form: https://goo.gl/forms/twwHgOOknX71mm113
For the code file, please submit a compressed directory with:
* Code
* Complete Docker Compose file
* Readme documenting your database schema, choice of technologies, any challenges, and the required URLs

## The Test

Albus Dumbledore can no longer rely on magic and his brain to keep track of the classes, teachers, and students at Hogwarts School of Witchcraft and Wizardry. He has commissioned you, a muggle, to build a backend to store this information for him with an API to access this data. He would like a system to keep track of the current classes offered at Hogwarts, their teachers, which students are enrolled in which classes, and which books are required for each class. These are Dumbledore’s requirements:

* The database used to store the data should be a MySQL database
* The API should follow REST or GraphQL best practices
* The backend should be implemented in one of the following languages: NodeJS, PHP, Elixir, Java
* For these requirements, provide a URL hitting an endpoint for each of the following actions:
    * Fetch data from each table
    * Insert new data into each table
    * Update existing data in each table
    * Delete existing data from each table
    * Fetch the Hogwarts classes with their teachers, required books, and students
        * Note: If you’re building a GraphQL API, you should be able to fetch classes with teachers, books, and students together in one request. If you’re building a RESTful API, you should be able to get classes with their teachers in one request, classes with their books in another request, and classes with their students in another request.

## Docker Instructions

To simplify setup and to show that you understand (or can at least figure out) Docker, we expect a Docker Compose file that will spin up your backend and port forward so that we can hit your endpoints from localhost. We provide you with a docker compose YAML file that will spin up your MySQL database to help get you started.
Instructions for docker compose:
* Make sure docker is installed
    * For Mac: https://www.docker.com/docker-mac
    * For Windows: https://www.docker.com/docker-windows
    * For Ubuntu: https://www.docker.com/docker-ubuntu
* Make sure you're in the same directory as this readme
* run `docker-compose up -d`
    * This will create a container called mysqldb
    * To verify it was created you can run `docker ps` -- it should show up in the list of containers
* To tear down your environment you can run `docker-compose down` so that you can spin it from scratch as you make changes
* In this same directory there is a schemadump.sql file which is where you should put the DDL for creating your schema. The database name is `test` which is consistent with what is specified in the docker-compose.yml file
* The schemadump.sql script should automatically run when the pod spins up
    * If you get an error like `ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock' (2)` then just wait a minute or two for mysql to fully initialize and then try again
* To bash into your mysql container you can run `docker exec -it mysqldb bash` and you can either login to MySQL with user:root pass:root or user:test pass:test
* Complete the docker-compose.yml file with your api service
* Refer to https://docs.docker.com/compose/gettingstarted/ for the official Docker Compose tutorial

## Sample Data
### Teachers
* Filius Flitwick (Teaches Charms)
* Rubeus Hagrid (Teaches Care of Magical Creatures)
* Rolanda Hooch (Teaches Flying)
* Minerva McGonagall (Teaches Transfiguration)
* Severus Snape (Teaches Potions)
* Gilderoy Lockhart (Teaches Defense Against The Dark Arts)

### Classes
* Charms
* Care of Magical Creatures
* Flying
* Transfiguration
* Potions
* Defense Against the Dark Arts

### Books
* A Beginner’s Guide to Transfiguration (Transfiguration class)
* Break with a Banshee (Defense Against the Dark Arts class)
* Wanderings with Werewolves (Defense Against the Dark Arts class)
* Magical Drafts and Potions (Potions class)
* The Standard Book of Spells (Charms class)
* The Monster Book of Monsters (Care of Magical Creatures class)

### Students (you can pick which classes they are enrolled in)
* Harry Potter
* Hermione Granger
* Ron Weasley
* Draco Malfoy
* Seamus Finnigan
* Neville Longbottom

## Grading
We will be grading the test on the following criteria:
* Completion
    * If you’re not able to finish 100% feel free to submit what you were able to get done
* Code quality
* Follows best practices
* Architecture
* Implementation of API
* Schema design
* Documentation - Please provide a couple example requests so we know how to format them when reviewing the assessment
