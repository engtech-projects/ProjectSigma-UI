<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"
const employee = useEmployeeInfo()

const { information } = storeToRefs(employee)
</script>
<template>
    <div class="w-full shadow-lg relative">
        <img class="w-full min-w-80 cover" src="/front.fw.png" alt="front" draggable="false">
        <div class="w-full absolute md:top-[9rem] top-[10rem] text-center">
            <p class="font-light text-xl">
                {{ information.company_employments.employeedisplay_id }}
            </p>
        </div>
        <div class="w-full absolute md:top-[27rem] top-[30.5rem] text-center">
            <p class="text-xl font-bold">
                {{ information.fullname_first }}
            </p>
        </div>
        <div class="w-full absolute md:top-[29.5rem] top-[32.5rem] text-center">
            <p class="text-xl font-bold">
                DIVISION SUPERVISOR
            </p>
        </div>
    </div>
</template>
