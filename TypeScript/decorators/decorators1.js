"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var decorators0_1 = require("./decorators0");
var httpEndpoints = {};
function registerEndpoint(constructor) {
    var className = constructor.name;
    var endpointPath = '/' + className.toLowerCase();
    httpEndpoints[endpointPath] = new constructor();
}
registerEndpoint(decorators0_1.Families);
registerEndpoint(decorators0_1.Castles);
console.log(httpEndpoints);
console.log(httpEndpoints['/families'].get());
