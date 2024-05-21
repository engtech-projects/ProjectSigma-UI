<script setup>
import { useAttendancePortal } from "~/stores/hrms/attendancePortal"

const attendancePortal = useAttendancePortal()
const { lastSuccessLogEmployee } = storeToRefs(attendancePortal)
</script>
<template>
    <div v-if="lastSuccessLogEmployee" class="bg-gray-100 flex gap-2 w-full shadow-lg border-2 border-gray-300 rounded-lg p-4">
        <div class="md:w-1/4">
            <img
                v-if="lastSuccessLogEmployee.employee.profile_photo"
                class="md:h-32 w-32 bg-gray-400 rounded-lg"
                :src="lastSuccessLogEmployee.employee.profile_photo.base64"
                alt="profile pic"
            >
            <img
                v-else
                class="md:h-32 w-32 bg-gray-400 rounded-lg"
                :src="'/avatarexample.png'"
                alt="profile pic"
            >
        </div>
        <div class="md:w-3/4 flex flex-col justify-start">
            <p class="text-3xl text-gray-700 font-bold mt-2">
                {{ lastSuccessLogEmployee.employee.fullname_first }}
            </p>
            <!-- <p class="text-lg font-light text-gray-500">
                {{ lastSuccessLogEmployee }}
            </p> -->
            <div class="grid grid-cols-2 gap-4 mt-4">
                <div v-for="sched, key in lastSuccessLogEmployee.schedule" :key="'empattc' + key">
                    {{ sched.day_of_week_names }} {{ sched.start_time_human }} - {{ sched.end_time_human }}
                    <p class="text-zinc-600 dark:text-zinc-300">
                        <span class="text-cyan-900 font-bold">TIME-IN :</span> {{ sched.applied_ins?.time_human }}
                    </p>
                    <p class="text-zinc-600 dark:text-zinc-300">
                        <span class="text-cyan-900 font-bold">TIME-OUT :</span> {{ sched.applied_outs?.time_human }}
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="w-full text-center">
        <p />
    </div>
</template>
