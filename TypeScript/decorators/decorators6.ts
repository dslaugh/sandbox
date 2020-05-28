const httpEndpoints = {};

function registerEndpointFactory(endpointPath) {
  return function registerEndpoint(constructor) {
    httpEndpoints[endpointPath] = new constructor();
  }
}

function protect(token = {}) {
  return function(target, propertyKey, descriptor) {
    const originalFunction = descriptor.value;

    descriptor.value = function(request) {
      if (request.token !== token) {
        throw new Error('forbidden!');
      }
      const bindedOriginalFunction = originalFunction.bind(this);
      const result = bindedOriginalFunction(request);
      return result;
    }
  }

}

@registerEndpointFactory('/families/stark/members')
class StarkMembers {
  private members = ['Robb', 'Sansa', 'Arya'];

  @protect('abc')
  get(request) {
    return this.members;
  }

  @protect('abc')
  post(request) {
    this.members.push(request.body);
  }
}

console.log(httpEndpoints);
httpEndpoints['/families/stark/members'].post({ body: 'Bran', token: 'abc' });
console.log(httpEndpoints['/families/stark/members'].get({ token: 'abc' }));