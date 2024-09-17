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

  return (
    <div className="item">
      <span className="my-handle">::</span>
      {model.id} /
      {edit === true ? (
        <>
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={saveText}>save</button>
        </>
      ) : (
        <>
          {model.text}
          <button onClick={() => setEdit(true)}>E</button>
        </>
      )}
      / {model.show === true ? 1 : 0}
      <input
        type="checkbox"
        checked={model.done}
        onChange={(e) => onCheckbox(e)}
      />
      <button onClick={removeItem}>X</button>
    </div>
  );
};

export default Item;
