function Person(first, last) {
	this.first = first;
	this.last = last;
	this.suffix = undefined;
}
Person.prototype.getFullName = function() {
	return `${this.first} ${this.last} ${this.suffix || ''}`;
};

const BobSmith = new Person('Bob', 'Smith');

const BobSmithJr = Object.create(BobSmith);
BobSmithJr.suffix = 'Jr';

const KarenSmith = new BobSmith.constructor('Karen', 'Smith');
console.log(BobSmith.getFullName());
console.log(BobSmithJr.getFullName());
console.log(KarenSmith.getFullName());
