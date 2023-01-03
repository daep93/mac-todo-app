import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllKeys, getAll, add, del } from "../idb";

export interface Todo {
  start: string;
  end: string;
  text: string;
}
export interface TodoWithKey extends Todo {
  key: number;
}

export const useTodosStore = defineStore("todos", () => {
  const todos = ref<TodoWithKey[]>([]);
  const fetchTodos = async () => {
    try {
      const keys = (await getAllKeys()) as number[];
      const storedTodos = await getAll();
      todos.value = storedTodos.map((storeTodo, idx) => ({ key: keys[idx], ...storeTodo }));
    } catch (error) {
      console.error(error);
    }
  };
  const registTodo = async (todo: Todo) => {
    try {
      const key = (await add(todo)) as number;
      todos.value = [...todos.value, { key, ...todo }];
      new Notification("create new todo", { body: `'${todo.text}' is created` });
      return key;
    } catch (error) {
      return 0;
    }
  };
  const deleteTodo = async (key: number) => {
    todos.value = todos.value.filter((todo) => todo.key !== key);
    await del(key);
  };
  return { todos, fetchTodos, registTodo, deleteTodo };
});
