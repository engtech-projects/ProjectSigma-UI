<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "~/stores/hrms/employee"
import { useAttendancePortal, CATEGORY_TIME_IN, CATEGORY_TIME_OUT } from "~/stores/hrms/attendancePortal"

definePageMeta({
    layout: "guest",
    auth: {
        unauthenticatedOnly: false,
        navigateAuthenticatedTo: "/attendance-portal/face-recognition",
    },

})
onMounted(() => document.addEventListener("keyup", (event) => {
    if (event.key === " " ||
        event.code === "Space" ||
        event.keyCode === 32
    ) {
        attendancePortalParams.value.log_type = (attendancePortalParams.value.log_type === CATEGORY_TIME_IN) ? CATEGORY_TIME_OUT : CATEGORY_TIME_IN
    }
}))

const employee = useEmployeeInfo()
const attendancePortal = useAttendancePortal()
const { attendancePortalParams } = storeToRefs(attendancePortal)
const { information, employeeIsSearched } = storeToRefs(employee)

attendancePortal.getAllEmployeePattern()
attendancePortal.getTodayAttendanceLogs()

attendancePortalParams.value.log_type = CATEGORY_TIME_IN
</script>
<template>
    <div class="w-full md:px-4 flex gap-2 justify-center m-auto mt-5">
        <div class="w-1/3 rounded-lg  space-y-4">
            <HrmsAttendanceEmployeeAnouncement />
        </div>
        <div class="w-full rounded-lg md:w-1/3 space-y-4">
            <LayoutBoards title="Face Recognition" class="text-center">
                <div class="w-full">
                    <AttendancePortalFacialRecognitionFaceCamera />
                    <div class="md:flex gap-2 space-x-2 p-2 justify-center">
                        <input id="Time-in" v-model="attendancePortalParams.log_type" class="" type="radio" value="In">
                        <label
                            for="Time-in"
                            class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                        >TIME IN</label>
                        <input id="time-out" v-model="attendancePortalParams.log_type" class="" type="radio" value="Out">
                        <label
                            for="time-out"
                            class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                        >TIME OUT</label>
                    </div>
                </div>
                <div class="w-full">
                    <HrmsAttendanceEmployeeAttendanceCard />
                </div>
            </LayoutBoards>
        </div>
        <div class="rounded-lg md:w-1/3 w-full">
            <LayoutBoards title="Todays Logs">
                <div class="flex flex-col gap-2 ">
                    <div v-if="employeeIsSearched | true">
                        <div class="space-y-2 p-3 items-center" action="#">
                            <div class="flex gap-4 justify-between">
                                <p class="text-2xl text-gray-700 font-bold">
                                    {{ information.fullname_first }}
                                    Juan Dela Cruz
                                </p>
                                <div class="flex gap-4">
                                    <div class="flex justify-between gap-x-6">
                                        <p class="text-xl text-zinc-600 dark:text-zinc-300">
                                            <span class="text-cyan-900 font-bold" /> 7:00 AM
                                        </p>
                                        <p class="text-xl  text-zinc-600 dark:text-zinc-300">
                                            <span class="text-cyan-900 font-bold" /> 4:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="flex gap-4 justify-between">
                                <p class="text-2xl text-gray-700 font-bold">
                                    {{ information.fullname_first }}
                                    Juan Dela Cruz
                                </p>
                                <div class="flex gap-4">
                                    <div class="flex justify-between gap-x-6">
                                        <p class="text-xl text-zinc-600 dark:text-zinc-300">
                                            <span class="text-cyan-900 font-bold" /> 7:00 AM
                                        </p>
                                        <p class="text-xl  text-zinc-600 dark:text-zinc-300">
                                            <span class="text-cyan-900 font-bold" /> 4:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p class="text-xl font-bold text-center text-gray-400">
                            No Employee Log
                        </p>
                    </div>
                </div>
            </LayoutBoards>
        </div>
    </div>
</template>
