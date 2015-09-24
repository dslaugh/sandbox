function startSuccessfulGetTest() {
	console.log('helllo');
	var output = document.getElementById('output');

	if (!output) {
		return;
	}

	function log(text) {
		if (output && typeof output.innerHTML !== 'undefined') {
			output.innerHTML += text;
		} else {
			document.write(text);
		}
	}

	try {
		if (ajax && ajax.get) {
			var id = new Date().getTime();
			ajax.get('fragment.html?id='+id, {
				success: function(xhr) {
					log(xhr.responseText);
				}
			});
		} else {
			log('Browser does not support ajax.get');
		}
	} catch (e) {
		log('An exception occured: ' + e.message);
	}
}