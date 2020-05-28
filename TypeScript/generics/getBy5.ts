import {students} from './students';
import { teachers } from './teachers';

declare global {
    interface Array<T> {
      getBy<P extends keyof T>(prop: P, value: T[P]): T | null;
    }
}

Array.prototype.getBy = function <T, P extends keyof T>(
  this: T[],
  prop: P,
  value: T[P]
): T | null {
  return this.filter(item => item[prop] === value)[0] || null;
};

const bestie = students.getBy('name', 'Ron');
console.log('bestie:', bestie);

const potionsTeacher = (teachers as any).getBy('subject', 'Potions');
console.log('potionsTeacher:', potionsTeacher);
