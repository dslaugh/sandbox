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
    function VillageState(robotLocation, parcels) {
        this.robotLocation = robotLocation;
        this.parcels = parcels;
    }
    VillageState.prototype.move = function (destination) {
        var _this = this;
        // If the destination isn't in the list of valid destinations for the robot's current location,
        // it can't move there so just return the original state.
        if (!roadGraph[this.robotLocation].includes(destination)) {
            return this;
        }
        else {
            var parcels1 = this.parcels
                .map(function (parcel) {
                // If the pickupLocation is not the current location, keep it.
                if (parcel.pickupLocation !== _this.robotLocation) {
                    return parcel;
                }
                // If the pickLocation is the current location, change the
                return { pickupLocation: destination, destination: parcel.destination };
            });
            var parcels2 = parcels1.filter(function (parcel) {
                return parcel.pickupLocation !== parcel.destination;
            });
            return new VillageState(destination, parcels2);
        }
    };
    VillageState.random = function (parcelCount) {
        if (parcelCount === void 0) { parcelCount = 5; }
        var parcels = [];
        for (var i = 0; i < parcelCount; i++) {
            var destination = randomPick(Object.keys(roadGraph));
            var pickupLocation = void 0;
            do {
                pickupLocation = randomPick(Object.keys(roadGraph));
            } while (pickupLocation === destination);
            parcels.push({ pickupLocation: pickupLocation, destination: destination });
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
        state = state.move(action.destination);
        memory = action.memory;
        console.log("Moved to " + action.destination);
    }
}
function randomPick(array) {
    var choice = Math.floor(Math.random() * array.length);
    return array[choice];
}
function randomRobot(state) {
    return { destination: randomPick(roadGraph[state.robotLocation]) };
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
    return { destination: memory[0], memory: memory.slice(1) };
}
// var myParcels = [
//     { pickupLocation: "Post Office", destination: "Alice's House" },
// ];
// var village = new VillageState('Post Office', myParcels);
// village.move("Alice's House");
runRobot(VillageState.random(2), routeRobot, []);