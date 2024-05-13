<script setup>
import { useAttendancePortal } from "~/stores/hrms/attendancePortal"

const attendancePortal = useAttendancePortal()
const { attendanceLogList } = storeToRefs(attendancePortal)
</script>
<template>
    <div v-for="(logs, index) in attendanceLogList" :key="index" class="flex gap-4 justify-between py-4 px-2">
        <p class="text-xl text-gray-700 font-bold">
            {{ logs.employee.fullname_last }}
        </p>
        <div class="flex-col gap-4">
            <div class="flex justify-between gap-x-6">
                <p class="text-xl text-zinc-600 dark:text-zinc-300">
                    <span class="text-cyan-900 font-bold" /> {{ logs.attendance_type }}
                </p>
                <p class="text-xl  text-zinc-600 dark:text-zinc-300">
                    <span class="text-cyan-900 font-bold" /> {{ logs.log_type }}
                </p>
                <p class="text-xl  text-zinc-600 dark:text-zinc-300">
                    <span class="text-cyan-900 font-bold" /> {{ logs.time}}
                </p>
            </div>
        </div>
    </div>
</template>
