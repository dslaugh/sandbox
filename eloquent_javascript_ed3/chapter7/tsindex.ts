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
  place: string;
  address: string;
}

class VillageState {
  place: string;
  parcels: Parcel[];

  constructor(place: string, parcels: Parcel[]) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination: string): VillageState {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map((parcel) => {
          if (parcel.place !== this.place) {
            return parcel;
          }
          return { place: destination, address: parcel.address };
        })
        .filter((parcel) => {
          return parcel.place !== parcel.address;
        });
      return new VillageState(destination, parcels);
    }
  }

  static random(parcelCount = 5): VillageState {
    let parcels: Parcel[] = [];
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph));
      let place: string;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place === address);
      parcels.push({ place, address });
    }
    return new VillageState('Post Office', parcels);
  }
}

function runRobot(state: VillageState, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length === 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array: string[]): string {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

interface Action {
  direction: string;
  memory?: string[];
}

function randomRobot(state: VillageState): Action {
  return { direction: randomPick(roadGraph[state.place]) };
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
  return { direction: memory[0], memory: memory.slice(1) };
}

const myParcels: Parcel[] = [
  { place: "Post Office", address: "Alice's House" },
];
const village = new VillageState('Post Office', myParcels);
village.move("Alice's House");