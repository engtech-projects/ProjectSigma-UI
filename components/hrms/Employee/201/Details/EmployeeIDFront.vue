<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"
const employee = useEmployeeInfo()

const { information } = storeToRefs(employee)
</script>
<template>
    <div id="front-id" class="w-full shadow-lg relative bg-white border-none">
        <img class="w-full min-w-80 cover" src="/front.fw.png" alt="front" draggable="false">
        <div class="w-full absolute md:top-[24.5%] top-[25%] text-center">
            <p class="font-light text-xl">
                {{ information.company_employments.employeedisplay_id }}
            </p>
        </div>
        <div class="w-full absolute md:top-[70.5%] top-[70.5%] text-center">
            <p class="text-xl font-bold">
                {{ information.fullname_first }}
            </p>
        </div>
        <div class="w-full absolute md:top-[75.5%] top-[75.5%] text-center">
            <p class="text-xl font-bold">
                DIVISION SUPERVISOR
            </p>
        </div>
    </div>
</template>
<style scoped>
div, p, img {
    /* remove border in image */
    border: hidden;
}
</style>
