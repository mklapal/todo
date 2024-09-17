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
    <div className="flex">
      <div className="bg-blue-500 flex m-auto py-5 px-5">
        <div className="text-white px-5 m-auto">Create new list</div>

        <input
          className="p-2 h-[40px] outline-none"
          required
          value={name}
          placeholder="Name"
          onChange={changeInput}
        />

        <div
          className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4"
          onClick={createList}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NewList;
