<script lang="ts" setup>
import { useSchedulesStore } from "~/stores/hrms/schedules"
const scheduleStore = useSchedulesStore()
const { listSchedulesEmployee, updateScheduleRequestEmployee, createScheduleRequestEmployee } = storeToRefs(scheduleStore)
const snackbar = useSnackbar()
const debouncedGetData = useDebounceFn(async () => {
    await scheduleStore.getSchedulesEmployee()
}, 500)
const deleteSchedule = async (id: any) => {
    try {
        snackbar.add({
            type: "info",
            text: "Deleting schedule..."
        })
        await scheduleStore.deleteSchedule(id)
        snackbar.add({
            type: "success",
            text: "Schedule deleted successfully."
        })
        debouncedGetData()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "Something went wrong."
        })
    }
}
const createSchedule = async () => {
    try {
        snackbar.add({
            type: "info",
            text: "Creating schedule..."
        })
        await scheduleStore.createScheduleEmployee()
        snackbar.add({
            type: "success",
            text: createScheduleRequestEmployee.value.successMessage
        })
        debouncedGetData()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "Something went wrong."
        })
    }
}
const updateSchedule = async () => {
    try {
        snackbar.add({
            type: "info",
            text: "Updating schedule..."
        })
        await scheduleStore.updateScheduleEmployee()
        snackbar.add({
            type: "success",
            text: updateScheduleRequestEmployee.value.successMessage
        })
        debouncedGetData()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "Something went wrong."
        })
    }
}
</script>
<template>
    <div class="flex gap-2">
        <HrmsScheduleCreateForm
            v-model:create-model="createScheduleRequestEmployee"
            v-model:update-model="updateScheduleRequestEmployee"
            class="w-1/4"
            type="Employee"
            @create-schedule="createSchedule"
        />
        <HrmsScheduleEditForm
            v-model:update-schedule-model="updateScheduleRequestEmployee"
            class="w-1/4"
            type="Employee"
            @update-schedule="updateSchedule"
        />
        <HrmsScheduleCalendarView
            v-model:list-model="listSchedulesEmployee"
            v-model:update-model="updateScheduleRequestEmployee"
            class="w-3/4"
            type="Employee"
            @delete-schedule="deleteSchedule"
            @load-schedules="debouncedGetData"
        />
    </div>
</template>
