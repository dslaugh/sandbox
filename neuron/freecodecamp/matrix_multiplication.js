// const matrix1 = [
// 	[4, 0],
// 	[1, -9],
// ];
//
// // Multiply matrix by a single number (scalar multiplication)
// const scalar1 = 2;
//
// const result1 = [
// 	[],
// 	[],
// ];
//
// // result1[0][0] = 2 * 4 = 8
// // result1[0][1] = 2 * 0 = 0
// // result1[1][1] = 2 * 1 = 2
// // result1[1][1] = 2 * -9 = -18
//
// result1[0][0] = scalar1 * matrix1[0][0];
// result1[0][1] = scalar1 * matrix1[0][1];
// result1[1][0] = scalar1 * matrix1[1][0];
// result1[1][1] = scalar1 * matrix1[1][1];
//
// console.log('result1', result1);
//
//
// const matrix2 = [
// 	[7, 8],
// 	[9, 10],
// 	[11, 12],
// ];
//
// const matrix3 = [
// 	[1, 2, 3],
// 	[4, 5, 6],
// ];
//
// const result2 = [
// 	[],
// 	[],
// ];
//
// // result2[0][0] = (1 * 7) + (2 * 9) + (3 * 11)  // 7 + 18 + 33 = 58
// // result2[0][1] = (1 * 8) + (2 * 10) + (3 * 12) // 8 + 20 + 36 = 64
// // result2[1][0] = (4 * 7) + (5 * 9) + (6 * 11) // 28 + 45 + 66 = 139
// // result2[1][0] = (4 * 8) + (5 * 10) + (6 * 12) // 32 + 50 + 72 = 154
//
// result2[0][0] =
// 	matrix3[0][0] * matrix2[0][0] +
// 	matrix3[0][1] * matrix2[1][0] +
// 	matrix3[0][2] * matrix2[2][0];
//
// result2[0][1] =
// 	matrix3[0][0] * matrix2[0][1] +
// 	matrix3[0][1] * matrix2[1][1] +
// 	matrix3[0][2] * matrix2[2][1];
//
// result2[1][0] =
// 	matrix3[1][0] * matrix2[0][0] +
// 	matrix3[1][1] * matrix2[1][0] +
// 	matrix3[1][2] * matrix2[2][0];
//
// result2[1][1] =
// 	matrix3[1][0] * matrix2[0][1] +
// 	matrix3[1][1] * matrix2[1][1] +
// 	matrix3[1][2] * matrix2[2][1];
//
// console.log('result2', result2);
//
//
// // https://www.mathsisfun.com/algebra/matrix-multiplying.html
//
// // The local shop sells 3 types of pies
// // Apple pies cost $3 each
// // Cherry pies cost $4 each
// // Blueberry pies cost $2 each
//
// // This is how many they sold in 4 days
// /*
// -------------------------------------------------------
// -           - Monday - Tuesday - Wednesday - Thursday -
// - Apple     -   13   -    9    -    7      -    15    -
// - Cherry    -    8   -    7    -    4      -     6    -
// - Blueberry -    6   -    4    -    0      -     3    -
// -------------------------------------------------------
//  */
//
// // Now think about this.. the value of sales for Monday is calculated this way:
// // Apple pie value + Cherry pie value + Blueberry pie value
// // $3 * 13 ($39)   + $4 * 8 ($32)     + $2 * 6 = ($12)       Total: $83
//
// // It is the "dot product" of prices and how many were sold
// // ($3, $4, $2) dot product (13, 8, 6)
// // We match the price to how many sold, multiply each, then sum the result
// // We match the price to how many sold, multiply each, then sum the result
//
// // For Tuesday:
// // ($3 * 9) + ($4 * 7) + ($2 * 4) = $27 + $28 + $8 = $63
//
// // For Wednesday:
// // ($3 * 7) + ($4 * 4) + ($2 * 0) = $21 + $16 + 0 = $37
//
// // For Thursday:
// // ($3 * 15) + ($4 * 6) + ($2 * 3) = $45 + $24 + $6 = $75
//
// // So it is important to match each price to each quantity
//
// const apple_price = 3;
// const cherry_price = 4;
// const blueberry_price = 2;
//
// // Each of these are sales for monday, tuesday, wednesday, thursday
// const apple_sales = [13, 9, 7, 15];
// const cherry_sales = [8, 7, 4, 6];
// const blueberry_sales = [6, 4, 0, 3];
//
// const prices = [
// 	apple_price,
// 	cherry_price,
// 	blueberry_price,
// ];
//
// const all_sales = [
// 	apple_sales,
// 	cherry_sales,
// 	blueberry_sales,
// ];
//
// const monday = (apple_price * apple_sales[0]) + (cherry_price * cherry_sales[0]) + (blueberry_price * blueberry_sales[0]);
// const tuesday = (apple_price * apple_sales[1]) + (cherry_price * cherry_sales[1]) + (blueberry_price * blueberry_sales[1]);
// const wednesday = (apple_price * apple_sales[2]) + (cherry_price * cherry_sales[2]) + (blueberry_price * blueberry_sales[2]);
// const thursday = (apple_price * apple_sales[3]) + (cherry_price * cherry_sales[3]) + (blueberry_price * blueberry_sales[3]);
//
// const sales_result1 = [
// 	monday,
// 	tuesday,
// 	wednesday,
// 	thursday,
// ];
// console.log('sales_result1', sales_result1);
//
// // Put another way:
// const monday2 = (prices[0] * all_sales[0][0]) + (prices[1] * all_sales[1][0]) + (prices[2] * all_sales[2][0]);
// const tuesday2 = (prices[0] * all_sales[0][1]) + (prices[1] * all_sales[1][1]) + (prices[2] * all_sales[2][1]);
// const wednesday2 = (prices[0] * all_sales[0][2]) + (prices[1] * all_sales[1][2]) + (prices[2] * all_sales[2][2]);
// const thursday2 = (prices[0] * all_sales[0][3]) + (prices[1] * all_sales[1][3]) + (prices[2] * all_sales[2][3]);
//
// const sales_result2 = [
// 	monday2,
// 	tuesday2,
// 	wednesday2,
// 	thursday2
// ];
// console.log('sales_result2', sales_result2);
//
/*
When we do multiplication:

	The number of columns of the 1st matrix must equal the number of rows of the 2nd matrix.
	And the result will have the same number of rows as the 1st matrix, and the same number of columns as the 2nd matrix.

	In General:

To multiply an m×n matrix by an n×p matrix, the ns must be the same,
and the result is an m×p matrix.

matrix multiply rows cols

*/

const matrix1 = [
	[1, 2, 3],
	[4, 5, 6],
];

const matrix2 = [
	[7, 8],
	[9, 10],
	[11, 12],
];


// const results = [
// 	[0, 0],
// 	[0, 0]
// ];
//
// console.log(results);



function matrixMultiplier(matrix1, matrix2) {
	function getCol(col, matrix) {
		return matrix.map(row => row[col]);
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
}

const x = matrixMultiplier(matrix1, matrix2);
console.log('x', x);

































