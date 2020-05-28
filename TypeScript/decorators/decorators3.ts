const httpEndpoints = {};
const protectedMethods = [];

function registerEndpoint(constructor) {
  const className = constructor.name;
  const endpointPath = '/' + className.toLowerCase();

  httpEndpoints[endpointPath] = new constructor();
}

function protect(target, propertyKey, descriptor) {
  const className = target.constructor.name;
  protectedMethods.push(className + '.' + propertyKey);
}

@registerEndpoint
class Families {
  private houses = ['Lannister', 'Targaryen'];

  @protect
  get() {
    return this.houses;
  }

  @protect
  post(request) {
    this.houses.push(request.body);
  }
}

console.log(protectedMethods);
