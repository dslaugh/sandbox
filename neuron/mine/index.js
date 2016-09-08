var CustomEvents = function() {
    var subscribers = {};
    return {
        on: function(topic, fn) {
            if (typeof topic === 'string' && typeof fn === 'function') {
                subscribers[topic] = subscribers[topic] || [];
                subscribers[topic].push(fn);
            }
        },
        off: function(topic, fn) {
            subscribers[topic].splice(subscribers[topic].indexOf(fn), 1);
        },
        emit: function(topic, data) {
            if (subscribers[topic]) {
                subscribers[topic].forEach(function(fn) {
                    fn(data);
                });
            }
        }
    };
};

var externalEvents = CustomEvents();

function Neuron() {
	var events = CustomEvents();
    var synapseValues = [0,0,0];
    var fireThreshold = 3;

	events.on('synapse-received-input', function() {
		shouldFire();
	});

	externalEvents.on('test-event0', function(data) {
		console.log('neuron detected event', data);
        synapseValues[0] = 1;
		events.emit('synapse-received-input');

        // Degrade value after a certain amount of time
        // setTimeout(function() {
        //     synapseValues[0] = 0;
        // }, 3000);
        
	});

    externalEvents.on('test-event1', function(data) {
        console.log('neuron detected event', data);
        synapseValues[1] = 1;
        events.emit('synapse-received-input');
    });

    externalEvents.on('test-event2', function(data) {
        console.log('neuron detected event', data);
        synapseValues[2] = 1;
        events.emit('synapse-received-input');
    });


	function shouldFire() {
        var sum = synapseValues.reduce(function(prev, curr) {
            return prev + curr;
        }, 0);

		console.log('shouldFire called. sum = ' + sum);

        if (sum >= fireThreshold) {
            fire();
        }
	}

	function fire() {
        console.log('fire called');
		// events.emit(some event, some data);
	}
}

var myNeuron = Neuron();

externalEvents.emit('test-event0', {hello: 'world'});

setTimeout(function() {
    externalEvents.emit('test-event1', {hello: 'world'});
}, 2000);

setTimeout(function() {
    externalEvents.emit('test-event2', {hello: 'world'});
}, 500);

// var nObj = {
//     events: CustomEvents(),
//     shouldFire: function() {
//         console.log('shouldFire called');
//     },
//     fire: function() {
//         console.log(this.name + ' fired');
//     }
// };

// var test = Object.create(nObj);

// test.shouldFire();


