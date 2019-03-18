let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test('Boohoooohoohooo'));

let match = /\d+/.exec('one two 100');
console.log(match);

console.log('one two 100'.match(/\d+/));

let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));

console.log(/bad(ly)?/.exec('bad'));
console.log(/(\d)+/.exec('123'));

function getDate(string: string): Date {
  let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
}
console.log(getDate('1-30-2003'));

console.log(/cat/.test('concatenate'));
console.log(/\bcat\b/.test('concatenate'));

let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test('15 pigs'));
console.log(animalCount.test('15 pigchickens'));

console.log('papa'.replace('p', 'm'));

console.log('Borobudur'.replace(/[ou]/, 'a'));
console.log('Borobudur'.replace(/[ou]/g, 'a'));

console.log('Liskov, Barbara\nMcCarthy, John\nWadler, Phillip'.replace(/(\w+), (\w+)/g, '$2 $1'));

let s = 'the cia and fbi';
console.log(s.replace(/\b(fbi|cia)\b/g, str => str.toUpperCase()));

let stock = '1 lemon, 2 cabbages, and 101 eggs';
function minusOne(match: string, amount: string|number, unit: string): string {
  amount = Number(amount) - 1;

  if (amount === 1) {
    unit = unit.slice(0, unit.length - 1);
  } else if (amount === 0) {
    amount = 'no';
  }

  return amount + ' ' + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));

function stripComments(code: string) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, '');
}
console.log(stripComments("1 + /* 2 */3"));
console.log(stripComments("x = 10; // ten!"));
console.log(stripComments("1 /* a */+/* b*/ 1"));

let name1 = 'harry';
let text = 'Harry is a suspicious character';
let regexp = new RegExp('\\b(' + name1 + ')\\b', 'gi');
console.log(text.replace(regexp, '_$1_'));

let name2 = 'dea+hl[]rd';
let text2 = 'This dea+hl[]rd guy is super annoying';
let escaped = name2.replace(/[\\[.+*?(){|^$]/g, '\\$&');
console.log('escaped', escaped);
let regexp2 = new RegExp('\\b(' + escaped + ')\\b', 'gi');
console.log(text2.replace(regexp2, '_$&_'));

console.log('  word'.search(/\S/));
console.log('    '.search(/\S/));

let pattern = /y/g;
pattern.lastIndex = 3;
let match2 = pattern.exec('xyzzy');
console.log(match2.index);
console.log(pattern.lastIndex);

let global = /abc/g;
console.log(global.exec('xyz abc'));
let sticky = /abc/y;
console.log(sticky.exec('xyz abc'));

let input = 'A string with 3 numbers in it... 42 and 88.';
let number = /\b\d+\b/g;
let match3;
while (match3 = number.exec(input)) {
  console.log('Found', match3[0], 'at', match3.index);
}

function parseINI(string: string) {
  let result = {};
  let section = result;
  string.split(/\r?\n/).forEach((line) => {
    let match;
    if (match = line.match(/^(\w+)=(.*)$/)) {
      section[match[1]] = match[2];
    } else if (match = line.match(/^\[(.*)\]$/)) {
      section = result[match[1]] = {};
    } else if (!/^\s*(;.*)?$/.test(line)) {
      throw new Error(`Line '${line}' is not valid`);
    }
  });
  return result;
}

const x = parseINI(`
name=Vasilis
[address]
city=Tessaloniki
`);
console.log(x);

verify(/ca[rt]/,
  ["my car", "bad cats"],
  ["camper", "high art"]);

verify(/pr?op/,
  ["pop culture", "mad props"],
  ["plop", "prrrop"]);

verify(/ferr[et|y|ari]/,
  ["ferret", "ferry", "ferrari"],
  ["ferrum", "transfer A"]);

verify(/ious\b/,
  ["how delicious", "spacious room"],
  ["ruinous", "consciousness"]);

verify(/\s[.,:;]/,
  ["bad punctuation ."],
  ["escape the period"]);

verify(/\w{7}/,
  ["hottentottententen"],
  ["no", "hotten totten tenten"]);

verify(/\b[^\We]+\b/i,
  ["red platypus", "wobbling nest"],
  ["earth bed", "learning ape", "BEET"]);


function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  // console.log('here', regexp.source, yes, no);
  if (regexp.source == "...") return;
  for (let str of yes) {
    if (!regexp.test(str)) {
      console.log(`Failure to match '${str}'`);
    }
  }
  for (let str of no) {
    if (regexp.test(str)) {
      console.log(`Unexpected match for '${str}'`);
    }
  }
}