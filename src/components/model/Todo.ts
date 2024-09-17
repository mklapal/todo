import TodoItem from "./TodoItem";

interface Todo {
  id: string;
  name: string;
  items: Array<TodoItem>;
}

export default Todo;
