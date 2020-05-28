const httpEndpoints = {};

function registerEndpoint(constructor) {
  const className = constructor.name;
  const endpointPath = '/' + className.toLowerCase();

  httpEndpoints[endpointPath] = new constructor();
}

@registerEndpoint
class Families {
  private houses = ['Lannister', 'Targaryen'];

  get() {
    return this.houses;
  }

  post(request) {
    this.houses.push(request.body);
  }
}

@registerEndpoint
class Castles {
  private castles = ["Winterfell", "Casterly Rock"];

  get() {
    return this.castles;
  }

  post(request) {
    this.castles.push(request.body);
  }
}

console.log(httpEndpoints);
console.log(httpEndpoints['/families'].get());