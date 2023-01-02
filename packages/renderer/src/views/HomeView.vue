<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import dayjs from "dayjs";
import TodoInput from "../components/TodoInput.vue";
import TodoList from "../components/TodoList.vue";
import { getAll, getAllKeys, add, del } from "../idb";
type Todo = { key: string; text: string; start: string; end: string };
const items = ref<Todo[]>([]);
const timers: ReturnType<typeof setTimeout>[] = [];

onMounted(async () => {
  const keys = await getAllKeys();
  const values = await getAll();
  items.value = values.reduce((acc, value, idx) => [...acc, { key: keys[idx].toString(), ...value }], []);
  const now = dayjs();
  values.forEach((value) => {
    const end = dayjs(value.end);
    if (!now.isBefore(end)) return;
    console.log(value.todo, end.diff(now));
    const timer = setTimeout(() => {
      new Notification("end todo", { body: `${value.text} is done` });
    }, end.diff(now));
    timers.push(timer);
  });
});
onUnmounted(() => {
  timers.forEach((timer) => clearTimeout(timer));
});
const registTodo = async (todo: { start: string; end: string; text: string }) => {
  const key = (await add(todo)) as string;
  items.value = [...items.value, { key, ...todo }];
  const timer = setTimeout(() => {
    new Notification("end todo", { body: `${todo.text} is done` });
  }, dayjs(todo.end).diff(dayjs()));
  timers.push(timer);
  new Notification("create new todo", { body: `'${todo.text}' is created` });
};
const deleteTodo = (key: string) => {
  items.value = items.value.filter((item) => item.key !== key);
  del(key);
};
</script>

<template>
  <div>
    <nav>
      <TodoInput @regist-todo="registTodo" />
    </nav>
    <main>
      <TodoList :items="items" @delete-todo="deleteTodo"></TodoList>
    </main>
  </div>
</template>
