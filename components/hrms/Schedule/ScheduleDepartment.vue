<script lang="ts" setup>
import { useSchedulesStore } from "~/stores/hrms/schedules"
const scheduleStore = useSchedulesStore()
const { listSchedulesDept, updateScheduleRequestDept, createScheduleRequestDept } = storeToRefs(scheduleStore)
const snackbar = useSnackbar()
const debouncedGetData = useDebounceFn(async () => {
    await scheduleStore.getSchedulesDept()
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
        await scheduleStore.createScheduleDept()
        snackbar.add({
            type: "success",
            text: createScheduleRequestDept.value.successMessage
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
        await scheduleStore.updateScheduleDept()
        snackbar.add({
            type: "success",
            text: updateScheduleRequestDept.value.successMessage
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
            v-model:create-model="createScheduleRequestDept"
            v-model:update-model="updateScheduleRequestDept"
            class="w-1/4"
            type="Department"
            @create-schedule="createSchedule"
        />
        <HrmsScheduleEditForm
            v-model:update-schedule-model="updateScheduleRequestDept"
            class="w-1/4"
            type="Department"
            @update-schedule="updateSchedule"
        />
        <HrmsScheduleCalendarView
            v-model:list-model="listSchedulesDept"
            v-model:update-model="updateScheduleRequestDept"
            class="w-3/4"
            type="Department"
            @delete-schedule="deleteSchedule"
            @load-schedules="debouncedGetData"
        />
    </div>
</template>
