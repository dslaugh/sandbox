// https://medium.com/javascript-scene/how-to-build-a-neuron-exploring-ai-in-javascript-pt-1-c2726f1f02b2#.n5opl6ue0

// (modified for es5)

function neuron(synapses, threshold) {
	var synapses = synapses || [];
	var threshold = threshold || 1;

	return {
		synapses: synapses,
		threshold: threshold
	};
}

function synapse(weight, value) {
	var weight = weight;
	var value = value;

	return {
		weight: weight,
		value: value
	};
}

function shouldTrigger(neuron) {
	var sum = neuron.synapses.reduce(function(amplitude, synapse) {
		return amplitude + (synapse.weight * synapse.value);
	}, 0);
	return sum >= neuron.threshold;
}

var neuron1 = neuron([
	synapse(.1, -.2),
	synapse(0, 1), // no effect
	synapse(.5, .8)
], .3);

var neuron2 = neuron([
	synapse(.1, -.2),
	synapse(0, 1), // no effect
	synapse(.5, .8)
], .5);

var willTriggerN1 = shouldTrigger(neuron1);
var willTriggerN2 = shouldTrigger(neuron2);

console.log(willTriggerN1);
console.log(willTriggerN2);