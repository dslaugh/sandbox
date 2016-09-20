function wonderous(x, z) {
	'use strict';
	z = z || 0;

	console.log(x);
	if (x === 1) {
		console.log('it is wonderous', z);
	} else if (z === 1000) {
		console.log('too long');
	} else {
		z = z + 1;
		if (x % 2 === 0) {
			wonderous(x / 2, z);
		} else {
			let n = (3 * x) + 1;
			wonderous(n, z);
		}
	}




}

wonderous(31);