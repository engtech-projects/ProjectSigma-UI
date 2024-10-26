<script setup>
import { useAttendancePortal } from "~/stores/hrms/attendancePortal"

const attendancePortal = useAttendancePortal()
const { attendanceSession, currentDate, currentTime } = storeToRefs(attendancePortal)
const headerTimer = ref(null)
const myTimer = async () => {
    await attendancePortal.getCurrentDate()
    currentDate.value = currentDate.value.toDateString()
    let lastTime = 0
    const updateTimer = (timestamp) => {
        if (timestamp - lastTime >= 1000) {
            currentTime.value.setSeconds(currentTime.value.getSeconds() + 1)
            headerTimer.value = currentTime.value.toLocaleTimeString()
            lastTime = timestamp
        }
        requestAnimationFrame(updateTimer)
    }
    requestAnimationFrame(updateTimer) // Start the loop
}
myTimer()
</script>
<template>
    <div class="w-full">
        <div class="bg-zinc-100 p-4">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="w-1/3 flex items-center space-x-4 mb-4 md:mb-0 md:mr-4">
                    <a href="/" class="flex items-center justify-between">
                        <img src="/logo.fw.png" class="mr-3 h-12" alt="Sigma Logo">
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white" />
                    </a>
                    <div class="text-sm text-zinc-700">
                        <p class="font-bold">
                            Employee Attendance Portal
                        </p>
                        <p>
                            Facial Recognition
                        </p>
                    </div>
                </div>
                <div class="w-1/3 text-center mb-4 md:mb-0">
                    <h1 class="text-3xl font-bold">
                        {{ attendanceSession.currentName || (attendanceSession.assignment_count > 1 ? "Multiple Assignments" : attendanceSession.name) }}
                    </h1>
                    <p v-if="typeof(attendanceSession) == 'array'" class="text-sm">
                        press arrowkey to change
                    </p>
                </div>
                <div class="w-1/3 text-sm text-zinc-700 flex justify-end px-2">
                    <div>
                        <p id="timerHeader" class="font-bold text-3xl">
                            {{ headerTimer }}
                        </p>
                        <p class="text-lg">
                            {{ currentDate }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
