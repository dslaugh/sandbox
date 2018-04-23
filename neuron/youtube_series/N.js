// const sigmoid = require('./sigmoid');
function sigmoid(x) {
    const result = 1 / (1 + Math.exp(-x));
    return result;
};


function N(input1, input2, weight1, weight2, bias) {
	const result = (input1 * weight1) + (input2 * weight2) + bias;
	return sigmoid(result);
}


function getRandom(num) {
	const rand1 = Math.random();
	const rand2 = Math.random() * 5;

	if (rand1 >= .50) {
		return rand2 * -1;
	}

	return rand2;
}

function squaredError(prediction, target) {
	const diff = prediction - target;
	return diff * diff;
}

function cost(b) {
	return (b - 4) * (b - 4);
}

function numerical_slope(b) {
	const h = 0.0001;
	return (cost(b+h) - cost(b)) / h;
}

function slope(b) {
	return 2 * (b - 4);
}

// let b = 6;
// const times = 30;
// for(let i = 0; i<times; i++) {
// 	b = b - .1 * slope(b);
// 	console.log('b', b);
// }


// const weight1 = getRandom();
// const weight2 = getRandom();
// const bias = getRandom();

// // const weight1 = 0.1;
// // const weight2 = -0.199;
// // const bias = 0.0;

// console.log('weights', weight1, weight2, bias);

// const data = [
// 	[3, 1.5, 1],
// 	[2, 1, 0],
// 	[4, 1.5, 1],
// ];


// const val = N(3, 1.5, weight1, weight2, bias);

// console.log('val', val);

// const err = squaredError(val, 1);
// console.log('err', err);


// let nailedEm = 1;
// data.forEach((d) => {
// 	const val = N(d[0], d[1], weight1, weight2, bias);
// 	console.log('val', val);
// 	// console.log('d[2]', d[2]);
// 	if (val > 0.5) {
// 		if (d[2] === 0) {
// 			nailedEm = 0;
// 		}
// 		console.log('I predict red ', d[2]);
// 	} else {
// 		if (d[2] === 1) {
// 			nailedEm = 0;
// 		}
// 		console.log('I predict blue ', d[2]);
// 	}

// });

// if (nailedEm === 1) {
// 	console.log("WINNER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
// }


// const wagData = [
// 	[1, 2],
// 	[2, 4],
// 	[4, 5],
// ];

// const w = 1;
// const b = 1.37;

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

function safeAdd(a, b) {
	const aStr = a.toString();
	const bStr = b.toString();
	
	const aParts = aStr.split('.');
	const bParts = bStr.split('.');

	const aIntegerPart = aParts[0] ? aParts[0] : '0';
	const bIntegerPart = bParts[0] ? bParts[0] : '0';

	const aInteger = parseInt(aIntegerPart, 10);
	const bInteger = parseInt(bIntegerPart, 10);

	const aPositive = aInteger >= 0;
	const bPositive = bInteger >= 0;

	let integerSum = aInteger + bInteger;

	const aDecimalPart = aParts[1] ? aParts[1] : '';
	const bDecimalPart = bParts[1] ? bParts[1] : '';

	const aDecimalLength = aDecimalPart.length;
	const bDecimalLength = bDecimalPart.length;

	const theBigger = Math.max(aDecimalLength, bDecimalLength);

	const aNormalizedDecimal = aDecimalPart.padEnd(theBigger, '0');
	const bNormalizedDecimal = bDecimalPart.padEnd(theBigger, '0');

	const f = aIntegerPart + aNormalizedDecimal;
	const u = bIntegerPart + bNormalizedDecimal;

	const fI = parseInt(f, 10);
	const uI = parseInt(u, 10);
	const p = fI + uI;
	const pStr = p.toString();
	const pArray = pStr.split('');
	const pLen = pArray.length;
	const idx = pLen - theBigger;
	pArray.splice(idx, 0, '.');
	const c = pArray.join('');
	const z = parseFloat(c);
// console.log('safeAdd', a, b, z);	
	return z;




// 	const aNormalizedDecimalInteger = parseInt(aNormalizedDecimal, 10);
// 	const bNormalizedDecimalInteger = parseInt(bNormalizedDecimal, 10);

// 	const aFixedDecimalInteger = aPositive ? aNormalizedDecimalInteger : -aNormalizedDecimalInteger;
// 	const bFixedDecimalInteger = bPositive ? bNormalizedDecimalInteger : -bNormalizedDecimalInteger;

// 	const decimalSum =  aFixedDecimalInteger + bFixedDecimalInteger;
// 	const decimalSumStr = decimalSum.toString();

// 	const decimalArray = decimalSumStr.split('');
// 	decimalArray.splice(decimalSumStr.length - theBigger, 0, '.');
// 	if (decimalArray[0] === '-') {
// 		decimalArray.splice(1, 0, '0');
// 	}
// 	let decimalSumStrWithDot = decimalArray.join('');

// 	if (decimalSumStr.length > theBigger) {
// 		const decimalParts = decimalSumStrWithDot.split('.');
// 		const decimalInteger = parseInt(decimalParts[0], 10);
// 		integerSum += decimalInteger;

// 		decimalSumStrWithDot = '.'+decimalParts[1];
// 	}

// 	const integerSumStr = integerSum.toString();



// 	const recombinedStr = integerSumStr + decimalSumStrWithDot;

// 	const returnVal = parseFloat(recombinedStr);
// // console.log('safeAdd', a, b, returnVal);
// 	return returnVal;
}

// safeAdd(3.6, 14.81111);


// function wags(pats, w, b) {
// 	const x = safeAdd((pats * w), b);
// 	console.log('wags', pats, w, b, x);
// 	return x;
// }
//
// function costFn(prediction, target) {
// 	return (prediction - target) ** 2;
// }
//
// function costTotalFn(costsArray) {
// 	const total = costsArray.reduce((prev, next) => {
// 		return prev + next;
// 	}, 0);
// 	return total;
// }

// const prediction1 = wags(1, w, b);
// const prediction2 = wags(2, w, b);
// const prediction3 = wags(4, w, b);
// // console.log('predictions', prediction1, prediction2, prediction3);

// const cost1 = costFn(prediction1, 2);
// const cost2 = costFn(prediction2, 4);
// const cost3 = costFn(prediction3, 5);
// const costTotal = cost1 + cost2 + cost3;
// const costTotal2 = costTotalFn([cost1, cost2, cost3]);
// const constTotal3 = 1/3 * costTotal2;
// console.log('costs', cost1, cost2, cost3, costTotal, costTotal2, constTotal3);


// function blam(data, w, b) {
// 	const dataWithPredictions = data.map((d) => {
// 		const prediction = wags(d[0], w, b);
// 		d.push(prediction);
// 		return d;
// 	});
//
// 	const x = dataWithPredictions.reduce((prev, next) => {
// 		return prev + costFn(next[2], next[1]);
// 	}, 0);
//
// 	return (1/data.length) * x;
// }

// const x = blam(wagData, w, b);
// console.log('x', x);

// 2 * (w * 1 + b - 2) * 1 + 2 * (w * 2 + b - 4) * 2 + 2 * (w * 4 + b - 5) * 4;
// 2 * (wags - 2) * 1 + 2 * (wags - 4) * 2 + 2 * (wags - 5) * 4;
// 2 * (wags - 2) * 1 + 2 * (wags - 4) * 2 + 2 * (wags - 5) * 4;
// function dcdw2(data, w, b) {
//
// console.log('data[0]', data[0]);
// 	const one1 = safeAdd(w * data[0][0], b);
// 	const one2 = safeAdd(one1, -data[0][1]);
//
// 	const two1 = safeAdd(w * data[1][0], b);
// 	const two2 = safeAdd(two1, -data[1][1]);
//
// 	const three1 = safeAdd(w * data[2][0], b);
// 	const three2 = safeAdd(two1, -data[2][1]);
//
// 	const one = 2 * one2 * data[0][0];
// 	const two = 2 * two2 * data[1][0];
// 	const three = 2 * three2 * data[2][0];
//
// 	const y = safeAdd(one, two);
// 	const z = safeAdd(y, three);
//
// 	// const x = (2 * (w * one[0] + b - one[1]) * one[0]) + (2 * (w * two[0] + b - two[1]) * two[0]) + (2 * (w * three[0] + b - three[1]) * three[0]);
// 	return z;
// }
// function dcdw(data, w, b) {
// 	// console.log('dcdw data', data);
// 	const clone = Array.prototype.slice.call(data, 0);
// // console.log('dcdw', clone);
// 	const dataWithPredictions = clone.map((d) => {
// 		console.log('d', d);
// 		const prediction = wags(d[0], w, b);
// 		d.push(prediction);
// 		return d;
// 	});
//
// 	const x = dataWithPredictions.reduce((prev, next) => {
// 		let y = 2 * safeAdd(next[2], -next[1]) * next[0];
// 		return safeAdd(prev, y);
// 	}, 0);
//
// 	return x;
// }
//
// const w = 1;
// const b = 1.37;
//
// const result = dcdw(wagData, 0.1, 0.1);
// console.log('result', result);
// const result2 = dcdw2(wagData, 0.1, 0.1);
// console.log('result2', result);
// const result3 = dcdw(wagData, 0.2, 0.1);
// console.log('result3', result3);
// const result4 = dcdw2(wagData, 0.2, 0.1);
// console.log('result4', result4);



// function dave(data, z, a) {
// 	console.log('w', z, 'b', a);
// 	console.log(dcdw(data, z, a));	
// }

// dave(wagData, 1, 2);
// dave(wagData, 2, 1);
// dave(wagData, 3, 1);
// dave(wagData, 4, 1);
// dave(wagData, 5, 1);
// dave(wagData, 6, 1);


// THIS IS THE CODE FROM THE VIDEO
// Blue flowers
const dataB1 = [2, 1, 0];
const dataB2 = [3, 1, 0];
const dataB3 = [2, .5, 0];
const dataB4 = [1, 1, 0];

// Red flowers
const dataR1 = [3, 1.5, 1];
const dataR2 = [3.5, .5, 1];
const dataR3 = [4, 1.5, 1];
const dataR4 = [5.5, 1, 1];

const dataU = [4.5, 1, 'it should be 1'];

const all_points = [dataB1, dataB2, dataB3, dataB4, dataR1, dataR2, dataR3, dataR4];

// This is being imported from ./sigmoid.js
// function sigmoid(x) {
// 	return 1/(1+Math.exp(-x));
// }

function train() {
	let w1 = Math.random() * .2 - .1;
	let w2 = Math.random() * .2 - .1;
	let b =  Math.random() * .2 - .1;
	let learning_rate = 0.2;
	for (let iter=0; iter < 50000; iter++) {
		// Pick a random point
		let random_idx = Math.floor(Math.random() * all_points.length);
		let point = all_points[random_idx];
		let target = point[2];

		// Feed forward
		let z = w1 * point[0] + w2 * point[1] + b;
		let pred = sigmoid(z);

		// Now we compare the model prediction with the target
		let cost = (pred - target) ** 2;

		// Now we find the slope of the cost w.r.t (with respect to) each parameter (w1, w2, b)
		// Bring derivative through square function
		let dcost_dpred = 2 * (pred - target);

		// Bring derivative through sigmoid.
		// Derivative of sigmoid can be written using more sigmoids! d/dz sigmoid(z) = sigmoid(z) * (1 - sigmoid(z))
		let dpred_dz = sigmoid(z) * (1 - sigmoid(z));

		// I think you forgot these in your slope calculation?
		let dz_dw1 = point[0];
		let dz_dw2 = point[1];
		let dz_db = 1;

		// Now we can get the partial derivatives using the chain rule.
		// Notice the pattern? We're bringing how the cost changes through each function, first through the square, then through the sigmoid.
		// And finally whatever is multiplying our parameter of interest becomes the last part.
		let dcost_dw1 = dcost_dpred * dpred_dz * dz_dw1;
		let dcost_dw2 = dcost_dpred * dpred_dz * dz_dw2;
		let dcost_db = dcost_dpred * dpred_dz * dz_db;

		// now we update our parameters!
		w1 -= learning_rate * dcost_dw1;
		w2 -= learning_rate * dcost_dw2;
		b -= learning_rate * dcost_db;
	}
    return { w1: w1, w2: w2, b:b };
}

const results = train();
results;

const unknown_flower = sigmoid(dataU[0] * results.w1 + dataU[1] * results.w2 + results.b);
const unknown_flower2 = N(dataU[0], dataU[1], results.w1,  results.w2, results.b);
unknown_flower;
unknown_flower2
if (unknown_flower >= .5) {
	console.log('It Is Red');
} else {
	console.log('It Is Blue');
}
