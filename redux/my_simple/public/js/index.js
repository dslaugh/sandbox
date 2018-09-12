const list = document.querySelector('#list');
const itemInput = document.querySelector('#item');
const nameForm = document.querySelector('#nameForm');

function resetInput() {
	itemInput.value = '';
	itemInput.focus();
}

function renderList(items) {
	return items.reduce((prev, curr) => {
		return `${prev}<li id="${curr.id}">${curr.name}</li>`;
	}, '');
}

function rerenderPage(data) {
	list.innerHTML = renderList(data.listItems);
	resetInput();
}

nameForm.onsubmit = (e) => {
	e.preventDefault();
	const item = itemInput.value.trim();
	if (item === "") {
		return;
	}
	fetch(`/add/${item}`)
		.then(response => response.json())
		.then(rerenderPage)
		.catch(err => console.error(err));
};

list.onclick = (e) => {
	fetch(`/remove/${e.target.id}`)
		.then(response => response.json())
		.then(rerenderPage)
		.catch(err => console.log(err));
};
