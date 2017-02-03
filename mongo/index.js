const mongo = require('mongodb');

const Server = mongo.Server;
const Db = mongo.Db;
const BSON = mongo.BSONPure;

const server = new Server('localhost', 27017, { auto_reconnect: true });
const db = new Db('mytest', server);

db.open((err, db) => {
 	if (!err) {
 		console.log('Connected!');
		db.collection('stuff', (err, collection) => {
			if (err) {
				console.log('Error getting stuff', err);
			}
		});
	} else {
		console.log('There was an error: ', err);
	}
});

db.collection('stuff', (err, coll) => {
	console.log('getting here');
	coll.findOne({}, (err, item) => {
		console.log('item', item);	
	});
});
