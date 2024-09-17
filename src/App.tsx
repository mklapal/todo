import React, { useEffect, useState } from "react";
import "./App.css";

import NewList from "./components/NewList";
import ListCollection from "./components/ListCollection";

import TodoModel from "./components/model/Todo";

// load from storage at the beginning
const getTodos = () => JSON.parse(localStorage.getItem("todos") || "[]");

function App() {
  const [todos, setTodos] = useState<Array<TodoModel>>(getTodos());

  function listCreate(newList: TodoModel) {
    const updatedTodos = [...todos, newList];
    setTodos(updatedTodos);
  }

  function listUpdate(changedList: TodoModel) {
    // note: may update two lists at the same time, access prevTodos here
    setTodos((prevTodos) => {
      return prevTodos.map((obj) =>
        changedList.id === obj.id ? changedList : obj
      );
    });
  }

  function listRemove(list: TodoModel) {
    const updatedTodos = todos.filter((obj: TodoModel) => obj.id !== list.id);
    setTodos(updatedTodos);
  }

  useEffect(() => {
    // save to storage everytime when todos change
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO lists</h1>
      </header>

      <section>
        <NewList onCreate={listCreate} />

        <ListCollection
          coll={todos}
          onUpdate={listUpdate}
          onDelete={listRemove}
        />
      </section>
    </div>
  );
}

export default App;
