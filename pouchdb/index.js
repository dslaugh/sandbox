const PouchDB = require('pouchdb');

const db = new PouchDB('test');

const postDoc = {
	test: 'test',
	items: [],
};

// db.post(postDoc)
// 	.then((doc) => {
// 		console.log('doc', doc);
// 	})
// 	.catch((err) => {
// 		console.log('error', err);
// 	});

const putDoc = {
	_id: 'puttest',
	test: 'put test',
	items: [],
};

// db.put(putDoc)
// 	.then((doc) => {
// 		console.log('put doc', doc);
// 	})
// 	.catch((err) => {
// 		console.log('error', err);
// 	});

// db.get('puttest')
// 	.then((doc) => {
// 		console.log('doc', doc);
// 	})
// 	.catch((err) => {
// 		console.log('error', err);
// 	});

db.allDocs({ include_docs: true })
	.then((docs) => {
		console.log('docs', docs);
	});