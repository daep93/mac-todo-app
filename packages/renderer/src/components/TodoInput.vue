<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";

const emit = defineEmits(["regist-todo"]);
const text = ref("");
const endDate = ref(dayjs().format("YYYY-MM-DD"));
const endTime = ref("13:00");

const isComposing = (event: KeyboardEvent) => event.isComposing;
const registTodo = () => {
  const start = dayjs();
  const end = dayjs(`${endDate.value} ${endTime.value}`);
  if (!start.isBefore(end)) {
    alert("시작 시간이 종료 시간보다 빨라야 합니다.");
    return;
  }
  if (!endDate.value) {
    alert("종료일을 입력해 주세요.");
    return;
  }
  if (!text.value) {
    alert("할 일을 입력해 주세요.");
    return;
  }
  emit("regist-todo", {
    start: start.format("YYYY-MM-DD HH:mm"),
    end: end.format("YYYY-MM-DD HH:mm"),
    text: text.value,
  });
};
</script>

<template>
  <div>
    <label class="flex justify-between">
      <input class="outline-0" type="date" v-model="endDate" />
      <input class="outline-0" type="time" v-model="endTime" />
    </label>
    <div class="mt-2 flex gap-2 items-center justify-between">
      <input
        class="border-orange-400 border w-full py-1"
        v-model="text"
        @keydown.enter="!isComposing($event) && registTodo()"
      />
      <button class="bg-slate-200 py-1 px-2 rounded" @click="registTodo">&#9166;</button>
    </div>
  </div>
</template>

<style scoped></style>
