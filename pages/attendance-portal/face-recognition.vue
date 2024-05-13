<script setup>
import { storeToRefs } from "pinia"
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

const attendancePortal = useAttendancePortal()
const { attendancePortalParams, attendanceSession } = storeToRefs(attendancePortal)

attendancePortal.getAllEmployeePattern()
attendancePortal.getTodayAttendanceLogs()
attendancePortal.checkSession()
attendancePortalParams.value.log_type = CATEGORY_TIME_IN
</script>
<template>
    <div class="w-full">
        <AttendancePortalFacialRecognitionEmployeeAttendanceHeader />
        <div v-if="attendanceSession" class="w-full md:px-4 flex gap-2 justify-center m-auto mt-5">
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
                </LayoutBoards>
                <div class="w-full">
                    <AttendancePortalFacialRecognitionEmployeeAttendanceCard />
                </div>
            </div>
            <div class="rounded-lg md:w-1/3 w-full min-h-full h-3">
                <LayoutBoards title="Todays Logs">
                    <div class="w-full max-h-[435px] overflow-auto">
                        <AttendancePortalFacialRecognitionEmployeeAttendanceLogCard />
                    </div>
                </LayoutBoards>
            </div>
        </div>
        <div v-else class="w-full text-center justify-center mt-5">
            <p class="text-gray-400 text-xl">
                Access Denied
            </p>
        </div>
        <AttendancePortalFacialRecognitionEmployeeAttendanceFooter />
    </div>
</template>
