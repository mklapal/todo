import React, { useState } from "react";

import TodoItemModel from "./model/TodoItem";

interface Props {
  model: TodoItemModel;
  onChange: (arg1: TodoItemModel) => void;
  onDelete: (arg1: TodoItemModel) => void;
}

const Item: React.FC<Props> = ({ model, onChange, onDelete }) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(model.text);

  function removeItem() {
    onDelete(model);
  }

  function onCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const newModel = { ...model, done: e.target.checked };
    onChange(newModel);
  }

  function saveText() {
    const newModel = { ...model, text: text };
    onChange(newModel);
    setEdit(false);
  }

  if (model.show === false) {
    return null;
  }

  return (
    <div className="flex flex-row justify-between gap-0.5 items-center group">
      <span className="my-handle text-gray-300 hover:text-gray-500 cursor-grab">
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
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </span>
      {edit === true ? (
        <>
          <input
            className="p-1 text-black outline-none border px-2 py-0 mr-auto"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="text-gray-400 hover:text-gray-300 cursor-pointer"
            onClick={saveText}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </div>
          <div
            className="text-gray-400 hover:text-gray-300 cursor-pointer"
            onClick={() => setEdit(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </>
      ) : (
        <>
          <input
            className="p-1"
            type="checkbox"
            checked={model.done}
            onChange={(e) => onCheckbox(e)}
          />
          <div className="m-0 mr-auto pl-1">
            {model.done === true ? (
              <span className="line-through">{model.text}</span>
            ) : (
              <span className="">{model.text}</span>
            )}
          </div>
          <div
            className="invisible group-hover:visible text-gray-400 hover:text-gray-300 cursor-pointer"
            onClick={() => setEdit(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </div>
        </>
      )}
      <div
        onClick={removeItem}
        className="invisible group-hover:visible cursor-pointer text-gray-400 hover:text-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </div>
    </div>
  );
};

export default Item;
