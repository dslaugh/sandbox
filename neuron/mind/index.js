// http://stevenmiller888.github.io/mind-how-to-build-a-neural-network/

// A neural network is a collection of "neurons" and "synapses" connecting them.
// The collection is organized into three main parts: The Input Layer. The Hidden Layer(s). The Output Layer.
// Having multiple Hidden Layers are referred to as "deep" learning.

// Synapses take input and multiply it by a "weight" (The strength of the input in determining the output)

// Training a neural network basically means calibrating all of the "weights" by repeating two key steps:
// Forward Propagation and Backward Propagation.

// In Forward Propagation, we apply a set of weights to the input data and calculate an output.
// For the first Forward Propagation, the set of weights is selected randomly.

// In Backward Propagation, we measure the margin of error of the output and adjust the weights accordingly
// to decrease the error.

// Neural networks repeat both Forward and Backward Propagation until the weights are calibrated to 
// accurately predict an output.

function sigmoid(z) {
	return 1 / (1 + Math.exp(-z));
}

function sigmoidPrime(z) {
  return Math.exp(-z) / Math.pow(1 + Math.exp(-z), 2);
}

function htan(z) {
  var y;
  return ((y = Math.exp(2 * z)) - 1) / (y + 1);
}

function htanPrime(z) {
  return 1 - Math.pow((Math.exp(2 * z) - 1) / (Math.exp(2 * z) + 1), 2);
}

function Mind(opts) {
	if (!(this instanceof Mind)) return new Mind(opts);
	opts = opts || {};

	opts.activator === 'sigmoid'
	 ? (this.activate = sigmoid, this.activatePrime = sigmoidPrime)
	 : (this.activate = htan, this.activatePrime = htanPrime);

	 // hyperparameters
	 this.learningRate = opts.learningRate || 0.7;
	 this.iterations = opts.iterations || 10000
	 this.hiddenUnits = opts.hiddenUnits || 3;
}