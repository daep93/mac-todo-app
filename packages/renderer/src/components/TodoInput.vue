<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";

const emit = defineEmits(["regist-todo"]);
const text = ref("");
const startDate = ref(dayjs().format("YYYY-MM-DD"));
const startTime = ref("00:00");
const endDate = ref(dayjs().format("YYYY-MM-DD"));
const endTime = ref("23:59");
const isComposing = (event: KeyboardEvent) => event.isComposing;
const registTodo = () => {
  const start = `${startDate.value} ${startTime.value}`;
  const end = `${endDate.value} ${endTime.value}`;
  if (!dayjs(start).isBefore(dayjs(end))) {
    alert("시작 시간이 종료 시간보다 빨라야 합니다.");
    return;
  }
  if (!startDate.value) {
    alert("시작일을 입력해 주세요.");
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
  emit("regist-todo", { start, end, text: text.value });
};
</script>

<template>
  <div>
    <label class="flex justify-between"
      >START
      <input class="outline-0" type="date" v-model="startDate" />
      <input class="outline-0" type="time" v-model="startTime" />
    </label>
    <label class="flex justify-between"
      >END
      <input class="outline-0" type="date" v-model="endDate" />
      <input class="outline-0" type="time" v-model="endTime" />
    </label>
    <div class="mt-2 flex gap-2 items-center justify-between">
      <input
        class="border-orange-400 border w-[300px] py-1"
        v-model="text"
        @keydown.enter="!isComposing($event) && registTodo()"
      />
      <button class="bg-slate-200 py-1 px-2 rounded" @click="registTodo">&#9166;</button>
    </div>
  </div>
</template>

<style scoped></style>
