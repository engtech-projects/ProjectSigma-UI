<script lang="ts" setup>
import { useSchedulesStore } from "~/stores/hrms/schedules"

const snackbar = useSnackbar()
const scheduleStore = useSchedulesStore()
const { createScheduleRequestEmployee, updateScheduleRequestEmployee } = storeToRefs(scheduleStore)
const handleSubmit = async () => {
    try {
        await scheduleStore.createScheduleEmployee()
        snackbar.add({
            type: "success",
            text: createScheduleRequestEmployee.value.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    }
}
</script>
<template>
    <LayoutBoards
        v-if="!updateScheduleRequestEmployee.show"
        title="Create Employee Schedule"
        :loading="createScheduleRequestEmployee.isLoading"
    >
        <form @submit.prevent="handleSubmit">
            <HrmsCommonSearchEmployeeSelector
                v-model="createScheduleRequestEmployee.body.employee_id"
            />
            <div>
                <div class="border-b w-full h-[14px] text-center p-3 mb-4">
                    <span class="text-sm bg-slate-50 text-black px-10 italic">
                        Schedule Time
                    </span>
                </div>
            </div>
            <div class="flex md:flex justify-center mx-auto">
                <div class="p-2 gap-4 items-center">
                    <label for="eventTitleIn" class="block text-xs text-center italic">In</label>
                    <input
                        id="eventTitleIn"
                        v-model="createScheduleRequestEmployee.body.startTime"
                        type="time"
                        class="w-44 md:w-44 rounded-lg"
                        required
                    >
                </div>
                <div class="p-2 gap-4 items-center">
                    <label for="eventTitleOut" class="block text-xs text-center italic">Out</label>
                    <input
                        id="eventTitleOut"
                        v-model="createScheduleRequestEmployee.body.endTime"
                        type="time"
                        class="w-44 md:w-44 rounded-lg"
                        required
                    >
                </div>
            </div>
            <div>
                <div class="border-b w-full h-[14px] text-center p-3 mt-4 mb-2">
                    <span class="text-sm bg-gray-50 text-black px-10 italic">
                        Schedule Type
                    </span>
                </div>
            </div>
            <div class="mb-4 dark:border-gray-700">
                <div class="flex flex-wrap items-center justify-center">
                    <div v-for="(scheduleType, index) in ['Regular', 'Irregular']" :key="index" class="mt-3 mr-2">
                        <input
                            :id="scheduleType"
                            v-model="createScheduleRequestEmployee.body.scheduleType"
                            :value="scheduleType"
                            type="radio"
                            class="hidden peer"
                            required
                        >
                        <label
                            :for="scheduleType"
                            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 peer-checked:bg-blue-500 peer-checked:text-white peer-checked:dark:bg-blue-500 peer-checked:dark:text-white rounded-lg px-4 py-2 transition-colors"
                        >
                            {{ scheduleType }}
                        </label>
                    </div>
                </div>
            </div>
            <div id="default-tab-content">
                <div v-show="createScheduleRequestEmployee.body.scheduleType === 'Regular'" id="regular" class=" p-1 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div class="border-b w-full h-[14px] text-center p-3 mb-2">
                        <span class="text-sm bg-slate-50 text-black px-10 italic">
                            Days
                        </span>
                    </div>
                    <div class="grid grid-cols-3 gap-y-2 md:flex-1 mx-auto justify-center items-center mt-5 md:gap-4 p-2 rounded-md">
                        <div class="flex">
                            <input id="monday" v-model="createScheduleRequestEmployee.body.daysOfWeek" type="checkbox" value="1" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="monday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Monday</label>
                        </div>
                        <div class="flex">
                            <input id="tuesday" v-model="createScheduleRequestEmployee.body.daysOfWeek" type="checkbox" value="2" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="tuesday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tuesday</label>
                        </div>
                        <div class="flex">
                            <input id="wednesday" v-model="createScheduleRequestEmployee.body.daysOfWeek" type="checkbox" value="3" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="wednesday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Wednesday</label>
                        </div>
                        <div class="flex">
                            <input id="thursday" v-model="createScheduleRequestEmployee.body.daysOfWeek" type="checkbox" value="4" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="thursday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Thursday</label>
                        </div>
                        <div class="flex">
                            <input id="friday" v-model="createScheduleRequestEmployee.body.daysOfWeek" type="checkbox" value="5" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="friday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Friday</label>
                        </div>
                        <div class="flex">
                            <input id="saturday" v-model="createScheduleRequestEmployee.body.daysOfWeek" type="checkbox" value="6" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="saturday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Saturday</label>
                        </div>
                        <div class="flex">
                            <input id="sunday" v-model="createScheduleRequestEmployee.body.daysOfWeek" type="checkbox" value="0" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="sunday" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sunday</label>
                        </div>
                    </div>

                    <div class="border-b w-full h-[14px] text-center p-3 mb-2" />

                    <div class="flex md:flex justify-center mx-auto">
                        <div class="p-2 gap-4 items-center">
                            <label for="dateStart" class="block text-xs text-center italic">Date Start</label>
                            <input id="dateStart" v-model="createScheduleRequestEmployee.body.startRecur" type="date" class="w-36 md:w-32 rounded-lg" required>
                        </div>
                        <div class="p-2 gap-4 items-center">
                            <label for="dateEnd" class="block text-xs italic ml-3">Date End <b class="text-orange-500"> (optional)</b></label>
                            <input id="dateEnd" v-model="createScheduleRequestEmployee.body.endRecur" type="date" class="w-36 md:w-32 rounded-lg">
                        </div>
                    </div>
                </div>
                <div v-show="createScheduleRequestEmployee.body.scheduleType === 'Irregular'" id="irregular" class=" p-1 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div class="border-b w-full h-[14px] text-center p-3 mb-5">
                        <span class="text-sm bg-slate-50 text-black px-10 italic">
                            Schedule Dates
                        </span>
                    </div>
                    <input id="scheduledDates" v-model="createScheduleRequestEmployee.body.startRecur" type="date" class="w-full rounded-lg">
                </div>
                <div class="flex justify-end mt-4">
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    </LayoutBoards>
</template>
<style>

</style>
