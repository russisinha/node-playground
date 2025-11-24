const _ = require('lodash'); // Import lodash

// Deep clone a nested object
const user = { 
  name: 'Alice', 
  age: 25, 
  address: { 
    city: 'Wonderland', 
    zip: '12345' 
  } 
};
const clonedUser = _.cloneDeep(user);
console.log('Cloned User:', clonedUser);

// Merge two objects
const obj1 = { a: 1, nested: { x: 10 } };
const obj2 = { b: 2, nested: { y: 20 } };
const merged = _.merge(obj1, obj2);
console.log('Merged Object:', merged);

// Debounce a function to limit its execution frequency
const log = _.debounce(() => {
  console.log('Debounced function executed!');
}, 2000);

log();
log(); // Only executes once if called multiple times within 2 seconds
