<script lang="ts" setup>
import { useSchedulesStore } from "~/stores/hrms/schedules"
const debouncedGetData = useDebounceFn(async () => {
    await scheduleStore.getSchedulesProject()
}, 500)
const scheduleStore = useSchedulesStore()
const { listSchedulesProject, updateScheduleRequestProject, createScheduleRequestProject } = storeToRefs(scheduleStore)
const snackbar = useSnackbar()
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
        await scheduleStore.createScheduleProject()
        snackbar.add({
            type: "success",
            text: createScheduleRequestProject.value.successMessage
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
        await scheduleStore.updateScheduleProject()
        snackbar.add({
            type: "success",
            text: updateScheduleRequestProject.value.successMessage
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
            v-model:create-model="createScheduleRequestProject"
            v-model:update-model="updateScheduleRequestProject"
            class="w-1/4"
            type="Project"
            @create-schedule="createSchedule"
        />
        <HrmsScheduleEditForm
            v-model:update-schedule-model="updateScheduleRequestProject"
            class="w-1/4"
            type="Project"
            @update-schedule="updateSchedule"
        />
        <HrmsScheduleCalendarView
            v-model:list-model="listSchedulesProject"
            v-model:update-model="updateScheduleRequestProject"
            class="w-3/4"
            type="Project"
            @delete-schedule="deleteSchedule"
            @load-schedules="debouncedGetData"
        />
    </div>
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
        height: 39px!important
    }
}
</style>
