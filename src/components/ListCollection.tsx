import React, { useState, useMemo } from "react";
import List from "./List";
import Search from "./Search";

import TodoModel from "./model/Todo";
import TodoItemModel from "./model/TodoItem";

interface Props {
  coll: Array<TodoModel>;
  onUpdate: (arg1: TodoModel) => void;
  onDelete: (arg1: TodoModel) => void;
}

const ListColl: React.FC<Props> = ({ coll, onUpdate, onDelete }) => {
  const [query, setQuery] = useState<string>("");

  const visibleTodos = useMemo(() => {
    let newData = coll.map((todo: TodoModel) => {
      const newTodo = {
        ...todo,
        items: todo.items.map((it: TodoItemModel) => {
          if (query === "") {
            it.show = true;
          } else if (it.text.toLowerCase().includes(query)) {
            it.show = true;
          } else {
            it.show = false;
          }
          return it;
        }),
      };

      return newTodo;
    });

    return newData;
  }, [coll, query]);

  function onSearch(query: string) {
    setQuery(query.toLowerCase());
  }

  return (
    <div>
      <Search onSearch={onSearch} />

      {visibleTodos.length > 0 ? (
        <>
          {visibleTodos.map((list: TodoModel) => (
            <List
              model={list}
              key={list.id}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </>
      ) : (
        <div>You don't have any lists</div>
      )}
    </div>
  );
};

export default ListColl;
