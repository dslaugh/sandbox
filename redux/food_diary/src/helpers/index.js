export function formattedDate(timestamp) {
	const d = new Date(timestamp);
	return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export function sortDesc(a, b) {
	return (a < b) ? 1 : -1;
}
