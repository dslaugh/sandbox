const facilityIds = ['1', '2', '3'];


function createTemplate(facilityId, wait) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('facilityId', facilityId);
			resolve({facility_id: facilityId});
		}, wait);
	});
}


// Works!
// const x = Promise.resolve().then(() => {
// 	return createTemplate(1, 1000);
// }).then(() => {
// 	return createTemplate(2, 2000);
// }).then(() => {
// 	return createTemplate(3, 3000);
// });

// x.then(() => {
// 	console.log('all done');
// });


// Works!
facilityIds.reduce((curr, next) => {
	return curr.then(() => {
		return createTemplate(next, 1000);
	})
}, Promise.resolve()).then(() => {
	console.log('all done');
});

// Doesn't work!
// const templatePromises = [];
// facilityIds.forEach((id) => {
// 	templatePromises.push(createTemplate(id, 1000));
// });

// Promise.mapSeries(templatePromises, (result) => {
// 	console.log(result);
// });
