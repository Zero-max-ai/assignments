import React, { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [todos, setTodo] = useState([]);
  const addTodo = () => {
    if (!title) {
      alert("cannot add empty todo");
      return;
    }
    console.log(title);
    todos.push({
      id: RandomIdGenerator(),
      title: title,
      isCompleted: false,
    });
    console.log(todos);
    setTitle("");
  };
  return (
    <div className="allCenter">
      <div className="userInput">
        <TextInput
          labelName={"Title"}
          placeholder={"enter title"}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <DisplayAllTodo todos={todos} setTodo={setTodo} />
    </div>
  );
};

const TextInput = ({ labelName, placeholder, onChange, value }) => {
  return (
    <div>
      <label htmlFor="">{labelName}</label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

const RandomIdGenerator = () => {
  return parseInt(Math.random() * 1000000000000000);
};

const DisplayAllTodo = ({ todos, setTodo }) => {
  const removeTodo = (id) => setTodo(todos.filter((todo) => todo.id != id));

  const updateCompleteStatus = (id) => {
    setTodo((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id == id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <div className="todoShowcase">
      {todos.length ? (
        <div>
          {todos.map(({ id, title, isCompleted }) => {
            return (
              <div className="individual_todo" key={id}>
                <h3 className={`${isCompleted ? "done" : ""}`}>{title}</h3>
                <div className="btn_manager">
                  <button onClick={() => updateCompleteStatus(id)}>
                    {isCompleted ? "mark as not done" : "mark as done"}
                  </button>
                  <button onClick={() => removeTodo(id)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h4>The Todo List is Empty</h4>
      )}
    </div>
  );
};

export default App;
