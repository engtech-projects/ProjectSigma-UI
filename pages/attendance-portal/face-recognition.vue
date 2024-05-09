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
const { information, employeeIsSearched } = storeToRefs(employee)
const { attendancePortalParams } = storeToRefs(attendancePortal)

attendancePortal.getAllEmployeePattern()
attendancePortal.getTodayAttendanceLogs()

attendancePortalParams.value.log_type = CATEGORY_TIME_IN
</script>
<template>
    <div class="w-full md:px-4 flex gap-2 justify-center m-auto mt-5">
        <div class="w-1/3 border-2 border-gray-400  space-y-4">
            <HrmsAttendanceEmployeeAnouncement />
        </div>
        <div class="w-full border-2 border-gray-400 md:w-1/3 space-y-4">
            <div class="flex justify-center text-3xl font-medium text-gray-50 border-b-2 bg-cyan-600">
                Welcome
            </div>
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
                <div v-if="employeeIsSearched | true">
                    <div class="space-y-6 mb-4" action="#">
                        <div class="flex flex-col">
                            <div class="p-4">
                                <img
                                    v-if="information.profile_photo"
                                    class="md:h-96 w-full bg-gray-400 rounded-lg"
                                    :src="information.profile_photo.base64"
                                    alt="profile pic"
                                >
                                <img
                                    v-else-if="information.gender.toLowerCase() === 'female'"
                                    class="md:h-96 w-full bg-gray-400 rounded-lg"
                                    :src="'/avatarexample.png'"
                                    alt="profile pic"
                                >
                                <img
                                    v-else
                                    class="md:h-58 w-full bg-gray-400 rounded-lg"
                                    :src="'/avatarexample.png'"
                                    alt="profile pic"
                                >
                            </div>
                            <div class="text-center">
                                <p class="text-3xl font-bold text-center p-2">
                                    {{ information.fullname_first }}
                                </p>
                                <label
                                    for="text"
                                    class="block text-sm font-medium italic text-teal-700"
                                >
                                    Programmer - Information Tech
                                </label>
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
        </div>
        <div class="border-2 border-gray-400 md:w-1/3 w-full">
            <div class="flex justify-center text-3xl font-medium text-gray-50 border-b-2 bg-cyan-600">
                Today's Log
            </div>
            <div class="flex-row gap-2">
                <HrmsAttendanceEmployeeAttendanceCard />
            </div>
        </div>
    </div>
</template>
