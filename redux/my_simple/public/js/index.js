const list = document.querySelector('#list');
const itemInput = document.querySelector('#item');
const nameForm = document.querySelector('#nameForm');

const colors = document.querySelector('#colors');
const colorInput = document.querySelector('#color')
const colorForm = document.querySelector('#colorForm');

function resetInput() {
	itemInput.value = '';
	itemInput.focus();
}

function renderList(items) {
	return items.reduce((prev, curr) => {
		return `${prev}<li id="${curr.id}">${curr.name}</li>`;
	}, '');
}

function resetColorInput() {
	colorInput.value = '';
	colorInput.focus();
}

function renderColorList(colors) {
	return colors.reduce((prev, curr) => {
		return `${prev}<li id="${curr.id}">${curr.color}</li>`;
	}, '');
}

function rerenderList(data) {
	list.innerHTML = renderList(data.listItems.items);
	resetInput();
}

function rerenderColors(data) {
	colors.innerHTML = renderColorList(data.colors.items);
	resetColorInput();
}



nameForm.onsubmit = (e) => {
	e.preventDefault();
	const item = itemInput.value.trim();
	if (item === "") {
		return;
	}
	fetch(`/add/${item}`)
		.then(response => response.json())
		.then(rerenderList)
		.catch(err => console.error(err));
};

list.onclick = (e) => {
	fetch(`/remove/${e.target.id}`)
		.then(response => response.json())
		.then(rerenderList)
		.catch(err => console.log(err));
};

colorForm.onsubmit = (e) => {
	e.preventDefault();
	const color = colorInput.value.trim();
	if (color === '') {
		return;
	}
	fetch(`/addColor/${color}`)
		.then(response => response.json())
		.then(rerenderColors)
		.catch(err => console.log(err));
};

colors.onclick = (e) => {
	fetch(`/removeColor/${e.target.id}`)
		.then(response => response.json())
		.then(rerenderColors)
		.catch(err => console.log(err));
};