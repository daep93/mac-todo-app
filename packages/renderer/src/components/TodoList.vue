<script setup lang="ts">
import { TodoWithKey } from "../stores/todos";
defineProps({ items: Array<TodoWithKey> });
</script>

<template>
  <ul class="p-4">
    <li v-for="{ text, key } of items" :key="key" class="flex gap-2 items-center">
      <span>{{ text }}</span>
      <font-awesome-icon icon="fa-solid fa-delete-left" @click="$emit('delete-todo', key)" />
    </li>
  </ul>
</template>

<style scoped></style>
