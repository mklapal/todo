import React, { FocusEvent, useState } from "react";

import TodoModel from "./model/Todo";

interface Props {
  onCreate: (arg1: TodoModel) => void;
}

const NewList: React.FC<Props> = ({ onCreate }) => {
  const [name, setName] = useState<string>("");

  function changeInput(e: FocusEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function createList() {
    let list: TodoModel = {
      id: window.crypto.randomUUID(),
      name: name,
      items: [],
    };

    setName("");

    onCreate(list);
  }

  return (
    <div className="text-center border">
      <h1>Create new list</h1>

      <input required value={name} placeholder="Name" onChange={changeInput} />
      <button onClick={createList}>Create</button>
    </div>
  );
};

export default NewList;
