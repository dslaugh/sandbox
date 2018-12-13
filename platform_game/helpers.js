function elt(name, attrs, ...children) {
	let dom = document.createElement(name);
	for (let attr of Object.keys(attrs)) {
		dom.setAttribute(attr, attrs[attr]);
	}

	for (let child of children) {
		dom.appendChild(child);
	}

	return dom;
}

const scale = 20;

function drawGrid(level) {
	const attrs = {
		class: 'background',
		style: `width: ${level.width * scale}px`
	};
	const children = [...level].rows.map((row) => {
		const child = [...row].map((type) => {
			return elt('td', { class: type })
		});
		return elt('tr', attrs, children);
	});
	return elt('table', attrs, children);
}


// function drawGrid(level) {
// 	const attrs = {
// 		class: "background",
// 		style: `width: ${level.width * scale}px`
// 	};
// 	const children =
// 	return elt("table", attrs, ...level.rows.map(row =>	elt("tr", {style: `height: ${scale}px`},	...row.map(type => elt("td", {class: type})))
// 	));
// }