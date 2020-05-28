const httpEndpoints = {};

function registerEndpoint(constructor) {
  const className = constructor.name;
  const endpointPath = '/' + className.toLowerCase();

  httpEndpoints[endpointPath] = new constructor();
}

function protect(target, propertyKey, descriptor) {
  const originalFunction = descriptor.value;

  descriptor.value = function(request) {
    if (request.token !== '123') {
      throw new Error('forbidden!');
    }
    const bindedOriginalFunction = originalFunction.bind(this);
    const result = bindedOriginalFunction(request);
    return result;
  };

  return descriptor;
}

@registerEndpoint
class Families {
  private houses = ["Lannister", "Targaryen"];

  @protect
  get() {
    return this.houses;
  }
}

console.log(httpEndpoints['/families'].get({ token: '123' }));
httpEndpoints['/families'].get({});
