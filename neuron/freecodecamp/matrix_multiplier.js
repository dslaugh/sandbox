module.exports = function matrixMultiplier(matrix1, matrix2) {
	console.log(matrix1, matrix2);
	function getCol(col, matrix) {
		return matrix.map(row => row[col]);
	}

	if (!Array.isArray(matrix1)) {
		matrix1 = [matrix1];
	}

	if (!Array.isArray(matrix1[0])) {
		matrix1 = [matrix1];
	}

	const results = [];

	for (let i=0; i<matrix1.length; i++) {
		// console.log('1', results);
		for (let k=0; k<matrix2[0].length; k++) {
			// console.log('2', results);
			const col = getCol(k, matrix2);
			let sum = 0;
			for (let j=0; j<matrix1[i].length; j++) {
				sum += matrix1[i][j] * col[j];
			}
			if (!results[i]) {
				results[i] = [];
			}
			results[i][k] = sum;
		}
	}

	return results;
};
