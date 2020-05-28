export class Families {
  private houses = ['Lannister', 'Targaryen'];

  get() {
    return this.houses;
  }

  post(request) {
    this.houses.push(request.body);
  }
}

export class Castles {
  private castles = ["Winterfell", "Casterly Rock"];

  get() {
    return this.castles;
  }

  post(request) {
    this.castles.push(request.body);
  }
}