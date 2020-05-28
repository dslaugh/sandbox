const httpEndpoints = {};

function registerEndpoint(constructor) {
  const className = constructor.name;
  const endpointPath = '/' + className.toLowerCase();

  httpEndpoints[endpointPath] = new constructor();
}

function nope(target, propertyKey, descriptor) {
  descriptor.value = function() {
    console.log("nope");
  };
  return descriptor;
}

@registerEndpoint
class Families {
  private houses = ["Lannister", "Targaryen"];

  @nope
  get() {
    return this.houses;
  }
}

httpEndpoints["/families"].get(); // nope
