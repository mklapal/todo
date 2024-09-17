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

    newItems[newItems.findIndex((x) => x.id == item.id)] = item;

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
    <div className="text-center border">
      {edit === true ? (
        <>
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={saveText}>save</button>
        </>
      ) : (
        <>
          <h1>{model.name}</h1>
          <button onClick={() => setEdit(true)}>E</button>
          <button onClick={removeList}>X</button>
        </>
      )}

      <div className="items">
        {model.items.length === 0 && <div>You don't have any items</div>}

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

        <input
          placeholder="New item"
          value={newItem}
          onChange={handleInputChange}
        />
        <button onClick={addItem}>Create</button>
      </div>
    </div>
  );
};

export default List;
