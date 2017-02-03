const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

'use strict'
app.get('/', (req, res) => {
	res.status(200).send('<a href="/test">It is working</a>');
});

app.get('/test', (req, res) => {
	MongoClient.connect('mongodb://localhost:27017/video', (err, db) => {
		if (err) {
			console.log('Connection error ', err);
			res.status(500).send('Database connection failed');
		}
		let movies = '';
		db.collection('movies').find({}).sort({title: 1}).toArray((err, moviesInfo) => {
			moviesInfo.forEach((movie) => {
				movies += '<tr><td>' + movie.title + '</td></tr>'; 
			});
			res.status(200).send('<table border=1><tr><th>Title</th></tr>'+movies+'</table>');	
		});
	});
});

app.get('/test2', (req, res) => {
	MongoClient.connect('mongodb://localhost:27017/test', (err, db) => {
		const myName = db.collection('names').findOne({name: 'David Slaugh'});
		myName.then((m) => {
			res.status(200).send('My name is: ' + m.name);
		});	
	});
});

app.listen(8000, () => {
	console.log('App listening on port 8000');
});
