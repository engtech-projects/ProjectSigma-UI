<script setup>
import { useAttendancePortal } from "~/stores/hrms/attendancePortal"

const attendancePortal = useAttendancePortal()
const { attendanceSession, currentDate } = storeToRefs(attendancePortal)
const headerTimer = ref(null)

const myTimer = async () => {
    await attendancePortal.getCurrentDate()
    setInterval(() => {
        const date = new Date()
        headerTimer.value = date.toLocaleTimeString()
        currentDate.value = currentDate.value.toDateString()
    }, 1000)
}
myTimer()
</script>
<template>
    <div class="w-full">
        <div class="bg-zinc-100 p-4">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="w-1/3 flex items-center space-x-4 mb-4 md:mb-0 md:mr-4">
                    <a href="/attendance-portal/face-recognition" class="flex items-center justify-between">
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
                        {{ attendanceSession.name }}
                    </h1>
                    <p class="text-sm">
                        press arrowkey to change
                    </p>
                </div>
                <div class="w-1/3 text-sm text-zinc-700 flex justify-end">
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
