// ## Counter without setInterval

let count = 0;
const Counter = () => {
  count++;
  console.log(count);
  setTimeout(Counter, 1000);
};

Counter();