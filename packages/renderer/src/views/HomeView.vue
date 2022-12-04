<script setup lang="ts">
import TodoInput from "../components/TodoInput.vue";
import TodoList from "../components/TodoList.vue";
const todoList = [
  { id: "1", text: "first" },
  { id: "2", text: "second" },
];
const log = (text: string) => {
  console.log(text);
};
</script>

<template>
  <div>
    <nav>
      <TodoInput @regist-todo="log" />
    </nav>
    <main>
      <TodoList :todoList="todoList"></TodoList>
    </main>
  </div>
</template>
