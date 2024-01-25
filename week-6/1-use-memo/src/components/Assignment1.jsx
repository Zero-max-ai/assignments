import { useState, useMemo } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input.
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
  const [input, setInput] = useState(0);
  // Your solution starts here
  let expensiveValue = 0;
  const fact = (num) => {
    if (num === 0 || num === 1) return 1;
    return num * fact(num - 1);
  };
  const expensiveCalculation = useMemo(() => {
    expensiveValue =  fact(input);
    return expensiveValue;
  }, [input]);
  // Your solution ends here

  return (
    <div>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
      />
      <p>Calculated Value: {expensiveCalculation}</p>
    </div>
  );
}
