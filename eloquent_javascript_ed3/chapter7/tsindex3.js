const roads = [
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
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (!graph[from]) {
            graph[from] = [to];
        }
        else {
            graph[from].push(to);
        }
    }
    edges.forEach((edge) => {
        const [from, to] = edge.split('-');
        addEdge(from, to);
        addEdge(to, from);
    });
    // for (let [from, to] of edges.map(r => r.split('-'))) {
    //   addEdge(from, to);
    //   addEdge(to, from);
    // }
    return graph;
}
const roadGraph = buildGraph(roads);
class VillageState {
    constructor(robotLocation, parcels) {
        this.robotLocation = robotLocation;
        this.parcels = parcels;
    }
    move(destination) {
        // If the destination isn't in the list of valid destinations for the robot's current location,
        // it can't move there so just return the original state.
        if (!roadGraph[this.robotLocation].includes(destination)) {
            return this;
        }
        else {
            let parcels = this.parcels.map((parcel) => {
                if (parcel.pickupLocation === this.robotLocation) {
                    return Object.assign({}, parcel, { pickedUp: true });
                }
                return parcel;
            }).filter((parcel) => {
                if (parcel.pickedUp === false) {
                    return true;
                }
                if (parcel.destination !== this.robotLocation) {
                    return true;
                }
                return false;
            });
            return new VillageState(destination, parcels);
        }
    }
    static random(parcelCount = 5) {
        let parcels = [];
        for (let i = 0; i < parcelCount; i++) {
            let destination = randomPick(Object.keys(roadGraph));
            let pickupLocation;
            do {
                pickupLocation = randomPick(Object.keys(roadGraph));
            } while (pickupLocation === destination);
            parcels.push({ pickupLocation, destination, pickedUp: false });
        }
        return new VillageState('Post Office', parcels);
    }
}
function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length === 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.destination);
        memory = action.memory;
        console.log(`Moved to ${action.destination}`);
    }
}
function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}
function randomRobot(state) {
    return { destination: randomPick(roadGraph[state.robotLocation]) };
}
const mailRoute = [
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
function findRoute(graph, from, to) {
    let work = [{ at: from, route: [] }];
    for (let i = 0; i < work.length; i++) {
        let { at, route } = work[i];
        for (let place of graph[at]) {
            // We found it, return the route
            if (place === to) {
                return route.concat(place);
            }
            // It's somewhere we haven't already been, add it to work
            if (!work.some(w => w.at === place)) {
                work.push({ at: place, route: route.concat(place) });
            }
        }
    }
}
function goalOrientedRobot({ robotLocation, parcels }, route) {
    if (route.length === 0) {
        let parcel = parcels[0];
        if (parcel.pickupLocation !== robotLocation) {
            route = findRoute(roadGraph, robotLocation, parcel.pickupLocation);
        }
        else {
            route = findRoute(roadGraph, robotLocation, parcel.destination);
        }
    }
    return { destination: route[0], memory: route.slice(1) };
}
// const myParcels: Parcel[] = [
//   { pickupLocation: "Post Office", destination: "Alice's House" },
// ];
// const village = new VillageState('Post Office', myParcels);
// village.move("Alice's House");
runRobot(VillageState.random(2), goalOrientedRobot, []);
//# sourceMappingURL=tsindex3.js.map