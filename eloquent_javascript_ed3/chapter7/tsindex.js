var roads = [
    "Alice's House-Bob's House",
    "Alice's House-Cabin",
    "Alice's House-Post Office",
    "Bob's House-Town Hall",
    "Daria's House-Ernie's House",
    "Daria's House-Town Hall",
    "Ernie's House-Grete's House",
    "Grete's House-Farm",
    "Grete's House-Shop",
    "Marketplace-Farm",
    "Marketplace-Post Office",
    "Marketplace-Shop",
    "Marketplace-Town Hall",
    "Shop-Town Hall"
];
function buildGraph(edges) {
    var graph = Object.create(null);
    function addEdge(from, to) {
        if (!graph[from]) {
            graph[from] = [to];
        }
        else {
            graph[from].push(to);
        }
    }
    edges.forEach(function (edge) {
        var _a = edge.split('-'), from = _a[0], to = _a[1];
        addEdge(from, to);
        addEdge(to, from);
    });
    // for (let [from, to] of edges.map(r => r.split('-'))) {
    //   addEdge(from, to);
    //   addEdge(to, from);
    // }
    return graph;
}
var roadGraph = buildGraph(roads);
var VillageState = /** @class */ (function () {
    function VillageState(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }
    VillageState.prototype.move = function (destination) {
        var _this = this;
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        }
        else {
            var parcels = this.parcels
                .map(function (parcel) {
                if (parcel.place !== _this.place) {
                    return parcel;
                }
                return { place: destination, address: parcel.address };
            })
                .filter(function (parcel) {
                return parcel.place !== parcel.address;
            });
            return new VillageState(destination, parcels);
        }
    };
    VillageState.random = function (parcelCount) {
        if (parcelCount === void 0) { parcelCount = 5; }
        var parcels = [];
        for (var i = 0; i < parcelCount; i++) {
            var address = randomPick(Object.keys(roadGraph));
            var place = void 0;
            do {
                place = randomPick(Object.keys(roadGraph));
            } while (place === address);
            parcels.push({ place: place, address: address });
        }
        return new VillageState('Post Office', parcels);
    };
    return VillageState;
}());
function runRobot(state, robot, memory) {
    for (var turn = 0;; turn++) {
        if (state.parcels.length === 0) {
            console.log("Done in " + turn + " turns");
            break;
        }
        var action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log("Moved to " + action.direction);
    }
}
function randomPick(array) {
    var choice = Math.floor(Math.random() * array.length);
    return array[choice];
}
function randomRobot(state) {
    return { direction: randomPick(roadGraph[state.place]) };
}
var mailRoute = [
    "Alice's House",
    "Cabin",
    "Alice's House",
    "Bob's House",
    "Town Hall",
    "Daria's House",
    "Ernie's House",
    "Grete's House",
    "Shop",
    "Grete's House",
    "Farm",
    "Marketplace",
    "Post Office"
];
function routeRobot(state, memory) {
    if (memory.length === 0) {
        memory = mailRoute;
    }
    return { direction: memory[0], memory: memory.slice(1) };
}
var myParcels = [
    { place: "Post Office", address: "Alice's House" },
];
var village = new VillageState('Post Office', myParcels);
village.move("Alice's House");
