<script setup lang="ts">
import { ref } from "vue";
const emit = defineEmits(["regist-todo"]);
const text = ref("");
const registTodo = (event: KeyboardEvent) => {
  if (event.isComposing) return;
  emit("regist-todo", text.value);
};
</script>

<template>
  <div class="flex gap-2 items-center justify-center">
    <input
      class="border-orange-400 border w-[300px] py-1"
      v-model="text"
      @keydown.enter="registTodo"
    />
    <button
      class="bg-slate-200 py-1 px-2 rounded"
      @click="$emit('regist-todo', text)"
    >
      &#9166;
    </button>
  </div>
</template>

<style scoped></style>
