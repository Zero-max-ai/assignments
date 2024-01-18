import React, { useState } from "react";

const App = () => {
  const initializedTodo = [
    {
      id: 1,
      title: "workout",
      description: "20 pushups daily",
      isCompleted: false,
    },
    {
      id: 2,
      title: "learn new topic",
      description: "doesn't matter even small topic work",
      isCompleted: false,
    },
  ];
  const [todos, setTodos] = useState(initializedTodo);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(3);

  const addTodo = () => {
    setTodos([...todos, { id, title, description, isCompleted: false }]);
    setId(id + 1);
    setTitle("");
    setDescription("");
  };
  return (
    <>
      <input
        type="text"
        placeholder="enter the title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="enter the title description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button onClick={addTodo}>Add the todo</button>
      <div className="">
        {todos.map(({ id, title, description, isCompleted }) => {
          return (
            <div key={id}>
              <h3>{title}</h3>
              <h4>{description}</h4>
              <button onClick={() => setTodos(todos.filter((todo) => todo.id != id))}>
                {isCompleted ? "task completed" : "Mark as completed"}
              </button>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
