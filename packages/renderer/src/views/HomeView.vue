<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import dayjs from "dayjs";
import TodoInput from "../components/TodoInput.vue";
import TodoList from "../components/TodoList.vue";
import { useTodosStore, Todo } from "../stores/todos";

const timers: ReturnType<typeof setTimeout>[] = [];
const store = useTodosStore();

onMounted(async () => {
  await store.fetchTodos();
  const now = dayjs();
  store.todos.forEach((todo) => {
    const deadline = dayjs(todo.end);
    if (!now.isBefore(deadline)) return;
    const timer = setTimeout(
      () => new Notification("todo deadline", { body: `${todo.text} is done` }),
      deadline.diff(now)
    );
    timers.push(timer);
  });
});
onUnmounted(() => {
  timers.forEach((timer) => clearTimeout(timer));
});

const registTodo = async (todo: Todo) => {
  const key = await store.registTodo(todo);
  if (key > 0) {
    const now = dayjs();
    const deadline = dayjs(todo.end);
    const timer = setTimeout(() => {
      store.deleteTodo(key);
      new Notification("end todo", { body: `${todo.text} is done` });
    }, deadline.diff(now));
    timers.push(timer);
  }
};
const deleteTodo = store.deleteTodo;
</script>

<template>
  <div>
    <TodoInput @regist-todo="registTodo" />
    <TodoList :items="store.todos" @delete-todo="deleteTodo" />
  </div>
</template>
