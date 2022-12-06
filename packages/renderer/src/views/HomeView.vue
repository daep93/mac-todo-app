<script setup lang="ts">
import { onMounted, ref } from "vue";
import TodoInput from "../components/TodoInput.vue";
import TodoList from "../components/TodoList.vue";
import { getAll, getAllKeys, add, del } from "../idb";
type Todo = { key: string; text: string };
const items = ref<Todo[]>([]);
onMounted(async () => {
  const keys = await getAllKeys();
  const values = await getAll();
  items.value = values.reduce(
    (acc, value, idx) => [...acc, { key: keys[idx], text: value }],
    []
  );
});
const registTodo = async (todo: string) => {
  const key = (await add(todo)) as string;
  items.value = [...items.value, { key, text: todo }];
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
