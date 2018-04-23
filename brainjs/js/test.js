function add(a, b) {
	return a + b;
}

function getColor({ r, g, b}) {
	// const xhr = new XMLHttpRequest();
	// xhr.open('GET', '/getcolor');
	// xhr.onload = function() {
	// 	console.log(xhr.response);
	// }
	// xhr.onerror = function() {
	// 	console.log('xhr error');
	// }
	// xhr.send();
	return fetch(`/getcolor/${r}/${g}/${b}`)
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			console.log('there was an error', err);
		});
}
