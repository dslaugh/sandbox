/*
const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: 'David',
  age: 49,
  hobbies: ['sports', 'cooking'],
  role: [2, 'author'],
};
 */

enum Role { ADMIN, READ_ONLY, AUTHOR};

const person = {
  name: 'David',
  age: 49,
  hobbies: ['sports', 'cooking'],
  role: Role.ADMIN,
};

if (person.role === Role.ADMIN) {
  console.log('yep');
}

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

console.log(person.name);