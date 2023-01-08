<script setup lang="ts">
import { Calendar } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ref, computed, watch } from "vue";
import { TodoWithKey } from "../stores/todos";

const props = defineProps({ items: Array<TodoWithKey>, updatedDate: String });
const emit = defineEmits(["select-date"]);

const selectedDate = ref("");
type CalendarWrapper = { getApi(): Calendar };
const fullCalendar = ref<CalendarWrapper | null>(null);

watch(
  () => props.updatedDate,
  (newDate) => {
    if (selectedDate.value !== newDate) {
      (fullCalendar.value as CalendarWrapper).getApi().select(newDate);
    }
  }
);
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
  select: ({ startStr }: { startStr: string }) => {
    selectedDate.value = startStr;
    emit("select-date", startStr);
  },

  eventDisplay: "list-item",
  events,
});
</script>

<template>
  <FullCalendar ref="fullCalendar" :options="calendarOptions" />
</template>

<style scoped></style>
