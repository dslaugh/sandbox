function GridItem(id) {
	// let id;
	let element;

	function getId() {
		return id;
	}

	function setElement(el) {
		element = el;
	}

	function getElementId() {
		return element.id;
	}

	return {
		getId,
		setElement,
		getElementId,
	};
}



function createGrid(dim) {
	let i = 0;
	for(; i<dim; i++) {
		let j = 0;
		for(; j<dim; j++) {
			console.log(i + ' ' + j);
		}
	}
}




