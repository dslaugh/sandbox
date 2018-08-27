export default function (dateString) {
	const dateParts = dateString.split('T');
	const [hours, minutes] = dateParts[1].split(':').map(part => part.padStart(2, '0'));
	const [day, month, year] = dateParts[0].split('-');
	const fixedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
	return fixedDate;
}
