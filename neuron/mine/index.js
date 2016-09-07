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

	events.on('synapse-received-input', function() {
		shouldFire();
	});

	externalEvents.on('test-event', function(data) {
		console.log('neuron detected event', data);
		events.emit('synapse-received-input');
	});

	function shouldFire() {
		console.log('shouldFire called');
	}

	function fire() {
		// events.emit(some event, some data);
	}
}

var myNeuron = Neuron();



externalEvents.emit('test-event', {hello: 'world'});