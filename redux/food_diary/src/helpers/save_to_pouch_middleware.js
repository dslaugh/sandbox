export default dbx => store => next => action => {
	return dbx.get('food_diary_data')
		.then((data) => {
			next(action);
			const doc = Object.assign({}, store.getState(), {
				_id: data._id,
				_rev: data._rev
			});
			dbx.put(doc);
		})
		.catch((err) => {
			console.log('There was an error saving to PouchDB', err);
		});
};
