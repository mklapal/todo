import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

import Item from "./Item";

import TodoModel from "./model/Todo";
import TodoItemModel from "./model/TodoItem";

interface Props {
  model: TodoModel;
  onUpdate: (arg1: TodoModel) => void;
  onDelete: (arg1: TodoModel) => void;
}

const List: React.FC<Props> = ({ model, onUpdate, onDelete }) => {
  const [newItem, setNewItem] = useState<string>("");
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(model.name);

  function handleInputChange(e: React.FocusEvent<HTMLInputElement>) {
    setNewItem(e.target.value);
  }

  function saveText() {
    const newModel = { ...model, name: text };
    onUpdate(newModel);
    setEdit(false);
  }

  function addItem() {
    const item: TodoItemModel = {
      id: window.crypto.randomUUID(),
      text: newItem,
      done: false,
      show: true,
    };

    onUpdate({ ...model, items: [...model.items, item] });

    setNewItem("");
  }

  function updateItem(item: TodoItemModel) {
    const newItems = [...model.items];

    newItems[newItems.findIndex((x) => x.id === item.id)] = item;

    onUpdate({ ...model, items: newItems });
  }

  function removeItem(item: TodoItemModel) {
    const newItems = model.items.filter((t: TodoItemModel) => t !== item);
    onUpdate({ ...model, items: newItems });
  }

  function removeList() {
    onDelete(model);
  }

  // TODO
  function updateList(newItems: any) {
    //console.log(newItems);
    onUpdate({ ...model, items: newItems });
  }

  return (
    <div className="flex sm:mx-5 md:float-left min-w-60 md:max-w-80 min-h-80 mx-auto my-5 md:m-5 text-left border border-blue-800 flex flex-col justify-between">
      <div className="bg-blue-800 p-2">
        {edit === true ? (
          <div className="flex justify-between gap-2 items-center">
            <input
              className="p-1 text-black outline-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div onClick={saveText} className="text-white cursor-pointer">
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
              onClick={() => setEdit(false)}
              className="text-white cursor-pointer"
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
          </div>
        ) : (
          <div className="group text-white font-bold flex justify-between gap-2 items-center">
            <h1 className="mr-auto">{model.name}</h1>
            <div
              onClick={() => setEdit(true)}
              className="invisible group-hover:visible cursor-pointer text-white hover:text-gray-300"
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
            <div
              onClick={removeList}
              className="invisible group-hover:visible cursor-pointer text-white hover:text-gray-300"
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
        )}
      </div>

      {model.items.length === 0 && (
        <div className="text-center text-gray-500 pt-5">
          You don't have any items
        </div>
      )}
      <div className="p-2 m-0 mb-auto">
        <ReactSortable
          list={model.items}
          handle=".my-handle"
          group="items"
          setList={updateList}
        >
          {model.items.map((item: TodoItemModel) => (
            <Item
              model={item}
              key={item.id}
              onChange={updateItem}
              onDelete={removeItem}
            />
          ))}
        </ReactSortable>
      </div>
      <div className="bg-gray-300 flex flex-row justify-between gap-2 items-center p-2">
        <input
          className="p-1 text-black outline-none w-full"
          placeholder="New item"
          value={newItem}
          onChange={handleInputChange}
        />

        <div
          className="text-blue-700 hover:text-blue-900 text-white cursor-pointer m-auto mr-0"
          onClick={addItem}
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
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default List;
