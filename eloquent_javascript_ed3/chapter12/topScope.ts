const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

for (let op of ['+', '-', '*', '/', '==', '<', '>']) {
  topScope[op] = Function('a, b', `return a ${op} b;`);
}

topScope.print = value => {
  console.log(value);
  return value;
};

topScope.array = (...values) => {
  return values;
};

topScope.length = (arr) => {
  return arr.length;
};

topScope.element = (arr, idx) => {
  return arr[idx];
};

export default topScope;
