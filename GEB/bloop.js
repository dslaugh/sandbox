function isPrime(n) {
	if (n === 0) {
		return 'NO';
	}
	var cell0 = 2;
	var times = n - 2;
	for(var i = 0; i < times; i++) {
		if (n % cell0 === 0) {
			return 'NO';
		}
		cell0 += 1;
	}
	return 'YES';
}

console.log(isPrime(3));
console.log(isPrime(4));
console.log(isPrime(22));

function isPrime2(n) {
	if (n === 0) {
		return 'NO';
	}
	if (n === 1) {
		return 'NO';
	}

	for(var i = 2; i < n; i++) {
		if (n % i === 0) {
			return 'NO';
		}
	}
	return 'YES';
}

function isGoldbach(n) {
	for(var i = 3; i < n; i++) {
		console.log('test', i, isPrime2(i), n - i, isPrime2(n - i));
		if (isPrime(i) === 'YES' && isPrime(n - i) === 'YES') {
			return 'YES';
		}
	}
	return 'NO';
}

console.log('isGoldbach', 2, isGoldbach(2));
console.log('isGoldbach', 4, isGoldbach(4));
console.log('isGoldbach', 20, isGoldbach(20));
console.log('isGoldbach', 8, isGoldbach(8));



// for (var x = 1; x < 100; x++) {
// 	console.log(x, isPrime2(x));
// }