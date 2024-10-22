<script setup>
import { useAttendancePortal, CATEGORY_TIME_IN, CATEGORY_TIME_OUT } from "~/stores/hrms/attendancePortal"

definePageMeta({
    layout: "none",
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/",
    },

})

const attendancePortal = useAttendancePortal()
const { attendancePortalParams, attendanceSession } = storeToRefs(attendancePortal)

attendancePortal.getAllEmployeePattern()
attendancePortal.getTodayAttendanceLogs()
await attendancePortal.checkSession()
attendancePortalParams.value.log_type = CATEGORY_TIME_IN
const detectionPaused = ref(false)
onMounted(() => {
    document.addEventListener("keyup", (event) => {
        if (event.key === " " ||
            event.code === "Space" ||
            event.keyCode === 32
        ) {
            attendancePortalParams.value.log_type = (attendancePortalParams.value.log_type === CATEGORY_TIME_IN) ? CATEGORY_TIME_OUT : CATEGORY_TIME_IN
        }
        if (detectionPaused.value) {
            allAssignments.value.forEach((_element, index) => {
                if (String(event.key) === (index + 1).toString()) {
                    selectAssignment(index)
                }
            })
        }
        if (attendanceSession.value.assignment_count === 1) {
            selectAssignment(0)
        }
        if (attendanceSession.value.assignment_count > 1) {
            if (event.key === "Escape" || event.code === "Escape" || event.keyCode === 27) {
                detectionPaused.value = true
                resetAssignment()
            }
        }
    })
})
const allAssignments = computed(() => {
    return [
        ...attendanceSession.value.departments,
        ...attendanceSession.value.projects,
    ]
})
const selectAssignment = (index) => {
    detectionPaused.value = false
    if (allAssignments.value[index].department_name) {
        attendancePortalParams.value.assignment_type = "Department"
        attendancePortalParams.value.department_id = allAssignments.value[index].id
        attendanceSession.value.currentName = allAssignments.value[index].department_name
    } else {
        attendancePortalParams.value.assignment_type = "Project"
        attendancePortalParams.value.project_id = allAssignments.value[index].id
        attendanceSession.value.currentName = allAssignments.value[index].project_code
    }
}
const resetAssignment = () => {
    attendancePortalParams.value.assignment_type = null
    attendancePortalParams.value.department_id = null
    attendancePortalParams.value.project_id = null
    attendanceSession.value.currentName = ""
}
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
                        <div v-show="detectionPaused">
                            <div
                                v-for="assign, key in allAssignments"
                                :key="'attendanceValueSelector' + key"
                                @click="selectAssignment(key)"
                            >
                                {{ key + 1 }}
                                {{ assign.project_code ?? assign.department_name }}
                            </div>
                        </div>
                        <AttendancePortalFacialRecognitionFaceCamera v-model:is-paused="detectionPaused" @reset-portal-data="resetAssignment" />
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
    <div v-else-if="fixAttendancePortal" class="w-full text-center justify-center mt-5">
        <p class="text-red-700 text-xl">
            This device is using an outdated Attendance Portal.<br>
            Please ask for an authorized person for help.
        </p>
    </div>
    <div v-else class="w-full text-center justify-center mt-5">
        <p class="text-red-700 text-xl">
            This device is not a recognized Attendance Portal.<br>
            Please use a designated Attendance Portal, or ask an authorized person for help.
        </p>
    </div>
</template>
