<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"
const employee = useEmployeeInfo()

const { information } = storeToRefs(employee)
</script>
<template>
    <div id="front-id" class="h-[6.303in] w-[4.051in] shadow-lg relative bg-white border-none">
        <img class="h-[6.303in] w-[4.051in] cover" src="/ID-FRONT.png" alt="front" draggable="false">
        <div class="w-full absolute top-[115px] text-center">
            <p class="font-medium text-md">
                {{ information.company_employments.employeedisplay_id }}
            </p>
        </div>
        <div class="w-full absolute top-[145px] m-auto">
            <p class="text-xl font-bold text-center">
                <img
                    v-if="information.profile_photo"
                    draggable="false"
                    class="h-[244.5px] w-[200px] bg-transparent rounded-lg m-auto"
                    :src="information.profile_photo.base64"
                    alt="profile pic"
                >
                <img
                    v-else-if="information.gender.toLowerCase() === 'female'"
                    draggable="false"
                    class="h-[244.5px] w-[200px] bg-transparent rounded-lg m-auto"
                    :src="'/avatarexample.png'"
                    alt="profile pic"
                >
                <img
                    v-else
                    draggable="false"
                    class="h-[244.5px] w-[200px] bg-transparent rounded-lg m-auto"
                    :src="'/avatarexample.png'"
                    alt="profile pic"
                >
            </p>
        </div>
        <div class="w-full absolute top-[395px] text-center">
            <p class="font-medium text-md">
                {{ information.fullname_first }}
            </p>
        </div>
        <div class="w-full absolute top-[425px] text-center">
            <p class="text-md">
                {{ information.current_employment?.position_title }}
            </p>
            <p class="text-md">
                {{ information.current_employment?.employee_department?.department_name }}
            </p>
        </div>
        <div class="w-full absolute top-[365px] text-center">
            <p class="text-xl font-bold">
                <img
                    v-if="information.digital_signature"
                    draggable="false"
                    class="w-full bg-transparent rounded-lg m-auto"
                    :src="information.digital_signature.base64"
                    alt="profile pic"
                >
                <img
                    v-else
                    draggable="false"
                    class="w-full bg-transparent rounded-lg m-auto"
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
