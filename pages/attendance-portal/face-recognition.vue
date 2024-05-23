<script setup>
import { storeToRefs } from "pinia"
import { useAttendancePortal, CATEGORY_TIME_IN, CATEGORY_TIME_OUT } from "~/stores/hrms/attendancePortal"

definePageMeta({
    layout: "none",
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/",
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

const attendancePortal = useAttendancePortal()
const { attendancePortalParams, attendanceSession } = storeToRefs(attendancePortal)

attendancePortal.getAllEmployeePattern()
attendancePortal.getTodayAttendanceLogs()
attendancePortal.checkSession()
attendancePortalParams.value.log_type = CATEGORY_TIME_IN
</script>
<template>
    <div v-if="attendanceSession" id="attendance-face-recognition-page" class="w-full flex flex-col h-screen overflow-hidden gap-2">
        <div class="w-full">
            <AttendancePortalFacialRecognitionEmployeeAttendanceHeader />
        </div>
        <div class="flex-1 overflow-hidden flex gap-2 p-2">
            <div class="w-full md:w-1/3 max-h-full min-h-full">
                <HrmsAttendanceEmployeeAnouncement />
            </div>
            <div class="w-full md:w-1/3 space-y-4">
                <div class="text-center">
                    <div class="w-full">
                        <AttendancePortalFacialRecognitionFaceCamera />
                        <div class="md:flex gap-2 space-x-2 p-2 justify-center">
                            <input
                                id="Time-in"
                                v-model="attendancePortalParams.log_type"
                                class=""
                                type="radio"
                                value="In"
                            >
                            <label for="Time-in" class="mr-4 text-xs text-gray-900 dark:text-gray-300">TIME IN</label>
                            <input
                                id="time-out"
                                v-model="attendancePortalParams.log_type"
                                class=""
                                type="radio"
                                value="Out"
                            >
                            <label for="time-out" class="mr-4 text-xs text-gray-900 dark:text-gray-300">TIME OUT</label>
                        </div>
                    </div>
                </div>
                <div class="w-full">
                    <AttendancePortalFacialRecognitionEmployeeAttendanceCard />
                </div>
            </div>
            <div class="w-full md:w-1/3 max-h-full h-full">
                <LayoutBoards title="Todays Logs" class="max-h-full h-full">
                    <div class="w-full max-h-[94%] h-full overflow-auto">
                        <AttendancePortalFacialRecognitionEmployeeAttendanceLogCard />
                    </div>
                </LayoutBoards>
            </div>
        </div>
        <div class="w-full">
            <AttendancePortalFacialRecognitionEmployeeAttendanceFooter />
        </div>
    </div>
    <div v-else class="w-full text-center justify-center mt-5">
        <p class="text-red-700 text-xl">
            This device is not a recognized Attendance Portal.<br>
            Please use a designated Attendance Portal, or ask an authorized person for help.
        </p>
    </div>
</template>
