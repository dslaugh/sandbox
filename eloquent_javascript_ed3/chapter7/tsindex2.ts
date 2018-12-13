const roads: string[] = [
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

interface Graph {
  from: string[];
}

function buildGraph(edges: string[]): Graph {
  let graph: Graph = Object.create(null);

  function addEdge(from: string, to: string) {
    if (!graph[from]) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }

  edges.forEach((edge: string) => {
    const [from , to] = edge.split('-');
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

interface Parcel {
  pickupLocation: string;
  destination: string;
}

class VillageState {
  robotLocation: string;
  parcels: Parcel[];

  constructor(robotLocation: string, parcels: Parcel[]) {
    this.robotLocation = robotLocation;
    this.parcels = parcels;
  }

  move(destination: string): VillageState {
    // If the destination isn't in the list of valid destinations for the robot's current location,
    // it can't move there so just return the original state.
    if (!roadGraph[this.robotLocation].includes(destination)) {
      return this;
    } else {
      let parcels1 = this.parcels
        .map((parcel): Parcel => {
          // If the pickupLocation is not the current location, keep it.
          if (parcel.pickupLocation !== this.robotLocation) {
            return parcel;
          }
          // If the pickLocation is the current location, change the
          return { pickupLocation: destination, destination: parcel.destination };
        });


      let parcels2 = parcels1.filter((parcel) => {
        return parcel.pickupLocation !== parcel.destination;
      });

      return new VillageState(destination, parcels2);
    }
  }

  static random(parcelCount = 5): VillageState {
    let parcels: Parcel[] = [];
    for (let i = 0; i < parcelCount; i++) {
      let destination = randomPick(Object.keys(roadGraph));
      let pickupLocation: string;
      do {
        pickupLocation = randomPick(Object.keys(roadGraph));
      } while (pickupLocation === destination);
      parcels.push({ pickupLocation, destination });
    }
    return new VillageState('Post Office', parcels);
  }
}

function runRobot(state: VillageState, robot, memory: string[]) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length === 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action: Action = robot(state, memory);
    state = state.move(action.destination);
    memory = action.memory;
    console.log(`Moved to ${action.destination}`);
  }
}

function randomPick(array: string[]): string {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

interface Action {
  destination: string;
  memory?: string[];
}

function randomRobot(state: VillageState): Action {
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

function routeRobot(state: VillageState, memory: string[]): Action {
  if (memory.length === 0) {
    memory = mailRoute;
  }
  return { destination: memory[0], memory: memory.slice(1) };
}

const myParcels: Parcel[] = [
  { pickupLocation: "Post Office", destination: "Alice's House" },
];
const village = new VillageState('Post Office', myParcels);
village.move("Alice's House");