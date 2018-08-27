'use strict';
const express = require('express');
const knex = require('knex')({
	client: 'mysql',
	connection: {
		host: 'mysqldb',
		user: 'root',
		password: 'root',
		database: 'test',
		charset: 'utf8'
	}
});
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const PORT = 8080;

const app = express();

app.get('/classes', (req, res) => {
	knex('classes')
		.select()
		.then((classes) => {
			res.status(200).send(classes);
		})
		.catch((err) => {
			res.status(403).send(err);
		});
});

app.put('/classes', jsonParser, (req, res) => {
	if (!req.body || !req.body.name) {
		return res.status(200).send('Error! name is required');
	}

	knex('classes')
		.insert({ name: req.body.name })
		.then((response) => {
			res.status(201).send(response);
		});
});

app.get('/classes/teachers', (req, res) => {
	knex('classes')
		.select()
		.leftJoin('classes_teachers', 'classes.id', 'classes_teachers.class_id')
		.leftJoin('teachers', 'teachers.id', 'classes_teachers.teacher_id')
		.then((results) => {
			const data = results.map((r) => {
				return {
					class: {
						id: r.class_id,
						name: r.name,
					},
					teacher: {
						fname: r.fname,
						lname: r.lname,
					},
				};
			});
			res.status(200).send(data);
		})
		.catch((err) => {
			res.status(403).send(err);
		});
});

app.get('/classes/students', (req, res) => {
	knex('classes')
		.select()
		.leftJoin('classes_students', 'classes.id', 'classes_students.class_id')
		.leftJoin('students', 'students.id', 'classes_students.student_id')
		.then((results) => {
			const data = [];
			const compiledData = {};
			results.forEach((r) => {
				if (!compiledData[r.name]) {
					compiledData[r.name] = {
						id: r.class_id,
						name: r.name,
						students: []
					};
				}

				compiledData[r.name].students.push({ id: r.student_id, fname: r.fname, lname: r.lname });
			});

			for (const c in compiledData) {
				data.push(compiledData[c]);
			}

			res.status(200).send(data);
		})
		.catch((err) => {
			res.status(403).send(err);
		});
});

app.get('/classes/books', (req, res) => {
	knex('classes')
		.select()
		.leftJoin('books_classes', 'classes.id', 'books_classes.class_id')
		.leftJoin('books', 'books.id', 'books_classes.book_id')
		.then((results) => {
			const data = [];
			const compiledData = {};
			results.forEach((r) => {
				if (!compiledData[r.name]) {
					compiledData[r.name] = {
						id: r.class_id,
						name: r.name,
						books: [],
					};
				}

				compiledData[r.name].books.push({ id: r.book_id, title: r.title });
			});

			for (const c in compiledData) {
				data.push(compiledData[c]);
			}
			res.status(200).send(data);
		})
		.catch((err) => {
			res.status(403).send(err);
		});
});

app.get('/teachers', (req, res) => {
	knex('teachers')
		.select()
		.then((teachers) => {
			res.status(200).send(teachers);
		})
		.catch((err) => {
			res.status(403).send({ status: 'ERROR', message: err });
		});
});

app.get('/books', (req, res) => {
	knex('books')
		.select()
		.then((books) => {
			res.status(200).send(books);
		})
		.catch((err) => {
			res.status(403).send({ status: 'ERROR', message: err });
		});
});

app.get('/students', (req, res) => {
	knex('students')
		.select()
		.then((students) => {
			res.status(200).send(students);
		})
		.catch((err) => {
			res.status(403).send({ status: 'ERROR', message: err });
		});
});


app.listen(PORT, () => {
	console.log(`Server listening on PORT: ${PORT}`);
});