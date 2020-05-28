function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const orig = descriptor.value;
  descriptor.value = function(...args: string[]) {
    if (args.length > 0) {
      const x = args.join(',');
      console.log(`${propertyKey} called with ${args.length} argument(s): ${x}`);
    } else {
      console.log(`${propertyKey} called with no arguments`);
    }
    orig.apply(this, args);
  };

  return descriptor;
}

class User {
  constructor(private name: string) {}

  @log
  getName(): string {
    return this.name;
  }

  @log
  setName(newName: string) {
    this.name = newName;
  }

  @log
  doStuff(arg: string) {
    console.log(arg);
  }

  @log
  doStuff2(arg1: string, arg2: string) {
    console.log(`${arg1} AND ${arg2}`);
  }
}

const Dave = new User('Dave');
Dave.doStuff('hello');
Dave.doStuff2('hi', 'bye');
Dave.setName('David');
Dave.getName();
