	// https://medium.com/gitconnected/understand-javascript-promises-by-building-a-promise-from-scratch-84c0fd855720

	class PromiseSimple {
		constructor(executionFunction) {
			this.promiseChain = [];
			this.handleError = () => {};

			this.onResolve = this.onResolve.bind(this);
			this.onReject = this.onReject.bind(this);

			executionFunction(this.onResolve, this.onReject);
		}

		then(onResolve) {
			this.promiseChain.push(onResolve);

			return this;
		}

		catch(handleError) {
			this.handleError = handleError;

			return this;
		}
		
		onResolve(value) {
			let storedValue = value;

			try {
				this.promiseChain.forEach((nextFunction) => {
					storedValue = nextFunction(storedValue);
				});
			} catch (error) {
				this.promiseChain = [];

				this.onReject(error);
			}
		}

		onReject(error) {
			this.handleError(error);
		}
	}

	const test = () => {
		return new PromiseSimple((resolve, reject) => {
			setTimeout(() => {
				if (Math.random() > 0.5) {
					resolve('your mom');
				} else {
					reject(new Error('You suck'));
				}
			}, 3000);
		});
	};

	test().then((x) => {
		return x + ' rocks!';
	})
	.then((y) => {
		console.log('Response:', y);
	})
	.catch((err) => {
		console.error('Error:', err);
	});
