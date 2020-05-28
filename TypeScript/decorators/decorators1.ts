import { Families, Castles } from './decorators0';

const httpEndpoints = {};

function registerEndpoint(constructor) {
  const className = constructor.name;
  const endpointPath = '/' + className.toLowerCase();

  httpEndpoints[endpointPath] = new constructor();
}

registerEndpoint(Families);
registerEndpoint(Castles);

console.log(httpEndpoints);
console.log(httpEndpoints['/families'].get());
