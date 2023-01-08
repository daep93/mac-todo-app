<script setup lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ref, computed } from "vue";
import { TodoWithKey } from "../stores/todos";

const props = defineProps({ items: Array<TodoWithKey> });
const emit = defineEmits(["select-date"]);

const events = computed(() =>
  (props.items ?? []).map(({ key, text, end }) => ({
    id: key.toString(),
    title: text,
    start: end.split(" ")[0],
  }))
);
const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  selectable: true,
  dayMaxEventRows: true, // for all non-TimeGrid views
  views: { timeGrid: { dayMaxEventRows: 3 } },
  select: ({ startStr }: { startStr: string }) => emit("select-date", startStr),
  eventDisplay: "list-item",
  events,
});
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>

<style scoped></style>
