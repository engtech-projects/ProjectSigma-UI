<script lang="ts" setup>
import interactionPlugin from "@fullcalendar/interaction"
import FullCalendar from "@fullcalendar/vue3"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import type { CalendarApi } from "@fullcalendar/core"
const { type } = defineProps<{ type: "Department" | "Employee" | "Project" }>()
const emits = defineEmits(["delete-schedule", "load-schedules"])
const listModel = defineModel("listModel", { required: true, type: Object })
const updateModel = defineModel("updateModel", { required: true, type: Object })
const scriptCalendarApi = ref<CalendarApi | null>(null)
watch(
    () => ({
        ...listModel.value.params
    }),
    (newVal) => {
        if (!newVal) {
            return
        }
        emits("load-schedules")
    },
    { deep: true }
)
watch(
    () => ({
        ...listModel.value.data
    }),
    (newVal) => {
        if (!newVal) {
            return
        }
        scriptCalendarApi.value?.refetchEvents()
    },
    { deep: true }
)
const calendarRef = ref()
onMounted(() => {
    scriptCalendarApi.value = calendarRef.value?.getApi()
})
const calendarOptions = ref({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
    headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    initialView: "dayGridMonth",
    weekends: true,
    nowIndicator: true,
    editable: false,
    selectable: false,
    events: (info: any, successCallback: any) => {
        listModel.value.params.start_date = info.startStr.slice(0, 10)
        listModel.value.params.end_date = info.endStr.slice(0, 10)
        successCallback(listModel.value.data)
    }
})
const setEdit = (id: any) => {
    const schedule = listModel.value.data.find((item: any) => parseInt(item?.id) === parseInt(id))
    if (!schedule) {
        return
    }
    updateModel.value.body = JSON.parse(JSON.stringify(schedule))
    updateModel.value.show = true
}
const deleteSchedule = (id: any) => {
    emits("delete-schedule", id)
}
</script>
<template>
    <LayoutBoards
        :title="type + ' Schedule'"
        :loading="listModel.isLoading"
    >
        <template #default>
            <div class="flex flex-col gap-2">
                <HrmsCommonDepartmentSelector
                    v-if="type === 'Department'"
                    v-model="listModel.params.department_id"
                    :title="type"
                />
                <HrmsCommonSearchEmployeeSelector
                    v-else-if="type === 'Employee'"
                    v-model="listModel.params.employee_id"
                    :title="type"
                />
                <HrmsCommonProjectSelector
                    v-else-if="type === 'Project'"
                    v-model="listModel.params.project_id"
                />
                <FullCalendar id="calendarSchedule" ref="calendarRef" :options="calendarOptions" class="mt-10 text-xs flex md:flex md:text-sm">
                    <template #eventContent="{ event }">
                        <div class="event-container flex flex-col justify-between w-full items-center p-1 bg-blue-600 text-[10px] overflow-hidden text-white rounded-md">
                            {{ event.extendedProps.start_time_human }} - {{ event.extendedProps.end_time_human }}
                            <div class="flex gap-[5px]">
                                <div class="hover:bg-slate-700 rounded event-edit" @click="setEdit(event.id)">
                                    <svg class="text-slate-200 h-[10px] w-[10px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                </div>
                                <div class="hover:bg-slate-700 rounded event-trash" @click="deleteSchedule(event.id)">
                                    <svg class="text-slate-200 h-[10px] w-[10px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </div>
                            </div>
                        </div>
                    </template>
                </FullCalendar>
            </div>
        </template>
    </LayoutBoards>
</template>
<style scoped>
/* FULL CALENDAR STYLES */
#calendarSchedule {
    :deep(.fc-button-active) {
        z-index: 0 !important;
    }
    :deep(.event-container) {
        height: 23px!important;
        transition: all .3s;
    }
    :deep(.event-container:hover) {
        height: 39px!important;
    }
}
</style>
