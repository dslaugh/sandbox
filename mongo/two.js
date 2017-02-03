'use strict'
const express = require('express');
const mongo = require('mongodb');

const app = express();

const Server = mongo.Server;
const Db = mongo.Db;
const BSON = mongo.BSONPure;

const server = new Server('localhost', 27017, { auto_reconnect: true });
const db = new Db('video', server);

db.open((err, db) => {
	if (err) {
		console.log('error opening', err);
	}
});

app.get('/', (req, res) => {
	db.collection('movies', (err, moviesColl) => {
		if (err) {
			console.log('error', err);
		}

		const movie = moviesColl.findOne({});
		movie.then((m) => {
			res.status(200).send(m.title);
		});
	});
});

app.listen(8000, () => {
	console.log('App listening on port 8000');
});
