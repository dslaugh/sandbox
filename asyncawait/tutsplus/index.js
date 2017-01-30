// https://code.tutsplus.com/tutorials/a-primer-on-es7-async-functions--cms-22367

//function getValues() {
//	return Promise.resolve([1,2,3,4]);
//}

async function getValues() {
	return [1,2,3,4];
}

getValues().then(function(values) {
	console.log(values);
});

//function asyncOperation(value) {
//	return Promise.resolve(value + 1);
//}

async function asyncOperation(value) {
	return value + 1;
}

function foo() {
	return getValues().then(function(values) {
		var operations = values.map(function(value) {
			return asyncOperation(value).then(function(newValue) {
				console.log(newValue);
				return newValue;
			});
		});

		return Promise.all(operations);
	}).catch(function(err) {
		console.log('We had an ', err);
	});
}

function foo2() {
	return getValues().then(function(values) {
		var operations = values.map(asyncOperation);

		return Promise.all(operations).then(function(newValues) {
			newValues.forEach(function(newValue) {
				console.log(newValue);
			});
			
			return newValues;
		});
	}).catch(function(err) {
		console.log('We had an ', err);
	});
}

function foo3() {
	var newValues = [];
	return getValues().then(function(values) {
		return values.reduce(function(previousOperation, value) {
			return previousOperation.then(function() {
				return asyncOperation(value);
			}).then(function(newValue) {
				console.log(newValue);
				newValues.push(newValue);
			});
		}, Promise.resolve()).then(function() {
			return newValues;
		});
	}).catch(function(err) {
		console.log('We had an ', err);
	});
}

foo();
foo2();
foo3();

function promisingOperation() {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			if ( Math.round(Math.random()) ) {
				resolve('Success!');
			} else {
				reject('Failure!');
			}
		}, 1000);
	});
}


async function foo4() {
	try {
		var message = await promisingOperation()
		console.log(message);
	} catch (e) {
		console.log('We failed:', e);
	}
}

foo4();

(async function() {
	console.log(await getValues());
})();

async function foo5() {
	try {
		var values = await getValues()
		var newValues = values.map(async function(value) {
			var newValue = await asyncOperation(value);
			console.log('dos', newValue);
			return newValue;
		});

		return Promise.all(newValues);
	} catch (err) {
		console.log('We had an ', err);
	}
}

foo5();

async function foo6() {
	try {
		var values = await getValues();
		var newValues = await Promise.all(values.map(asyncOperation));

		newValues.forEach(function(value) {
			console.log('tres', value);
		});

		return newValues;
	} catch (err) {
		console.log('We had an ', err);
	}
}

foo6();

async function foo7() {
	try {
		var values = await getValues();
		return await values.reduce(async function(values, value) {
			values = await values;
			value = await asyncOperation(value);
			console.log('quatro', value);
			values.push(value);
			return values;
		}, []);
	} catch (err) {
		console.log('We had an ', err);
	}
}

foo7();
