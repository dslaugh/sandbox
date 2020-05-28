import { students } from './students';

//function getBy<T>(model: T[], prop: string, value): T | null {
//  return model.filter(item => item[prop] === value)[0];
//}

function getBy<T, P extends keyof T>(model: T[], prop: P, value: T[P]): T | null {
  return model.filter(item => item[prop] === value)[0] || null;
}

const result = getBy(students, 'hasScar', true);

console.log('result:', result);