<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"
const config = useRuntimeConfig()
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
        <div class="w-full absolute md:top-[33%] top-[32.5%] m-auto">
            <p class="text-xl font-bold text-center">
                <img
                    v-if="information.profile_photo"
                    draggable="false"
                    class="md:h-56 w-1/2 bg-transparent rounded-lg m-auto"
                    :src="config.public.HRMS_API_URL + '/storage/' + information.profile_photo.url"
                    alt="profile pic"
                >
                <img
                    v-else-if="information.gender.toLowerCase() === 'female'"
                    draggable="false"
                    class="md:h-56 w-1/2 bg-transparent rounded-lg m-auto"
                    :src="'/avatarexample.png'"
                    alt="profile pic"
                >
                <img
                    v-else
                    draggable="false"
                    class="md:h-56 w-1/2 bg-transparent rounded-lg m-auto"
                    :src="'/avatarexample.png'"
                    alt="profile pic"
                >
            </p>
        </div>
        <div class="w-full absolute md:top-[70.5%] top-[70.5%] text-center">
            <p class="text-xl font-bold">
                {{ information.fullname_first }}
            </p>
        </div>
        <div class="w-full absolute md:top-[75.5%] top-[75.5%] text-center">
            <p class="text-lg">
                {{ information.current_employment?.position_title }}
            </p>
            <p class="text-xs">
                {{ information.current_employment?.employee_department.department_name }}
            </p>
        </div>
        <div class="w-full absolute md:top-[80.5%] top-[80.5%] text-center">
            <p class="text-xl font-bold">
                <img
                    v-if="information.digital_signature"
                    draggable="false"
                    class="md:h-56 w-1/2 bg-transparent rounded-lg m-auto"
                    :src="config.public.HRMS_API_URL + '/storage/' + information.digital_signature.url"
                    alt="profile pic"
                >
                <img
                    v-else
                    draggable="false"
                    class="md:h-56 w-1/2 bg-transparent rounded-lg m-auto"
                    src="/signature_example.png"
                    alt="profile pic"
                >
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
