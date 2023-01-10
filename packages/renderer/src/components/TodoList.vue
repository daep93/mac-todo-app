<script setup lang="ts">
import { TodoWithKey } from "../stores/todos";
defineProps({
  items: { type: Array<TodoWithKey>, required: true },
  selectedDate: { type: String, required: true },
});
</script>

<template>
  <ul class="py-4">
    <li v-for="{ text, key, end } of items.filter((item) => item.end.startsWith(selectedDate))" :key="key">
      <h1 class="flex gap-2 items-center justify-between">
        <span>Due: {{ end }} </span>
        <font-awesome-icon icon="fa-solid fa-delete-left" @click="$emit('delete-todo', key)" class="cursor-pointer" />
      </h1>
      <p>
        {{ text }}
      </p>
    </li>
  </ul>
</template>

<style scoped></style>
