const Movie = require('./Movie');
const Rental = require('./Rental');
const Customer = require('./Customer');

const movie = new Movie('Pulp Fiction', 1);
const rental = new Rental(movie, 5);

const movie2 = new Movie('Jaws', 2);
const rental2 = new Rental(movie2, 5);

const customer = new Customer('David');
customer.addRental(rental);
customer.addRental(rental2);

const statement = customer.statement();
console.log(statement);
