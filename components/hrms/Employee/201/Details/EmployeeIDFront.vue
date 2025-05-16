<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"
const employee = useEmployeeInfo()

const { information, editable } = storeToRefs(employee)
const employeePosition = computed(() => {
    const pos = employee.information.current_employment?.position?.name ?? ""
    const dep = employee.information.current_employment?.employee_department?.department_name ?? ""
    if (pos.includes(dep)) {
        return pos.split(",")[0]
    }
    return pos
})
</script>
<template>
    <div id="front-id" class="h-[6.303in] w-[4.051in] shadow-lg relative bg-white border-none">
        <img class="h-[6.303in] w-[4.051in] cover" src="/ID-FRONT.png" alt="front" draggable="false">
        <div class="w-full absolute top-[110px] text-center">
            <p
                class="font-medium text-lg"
            >
                {{ information.company_employments.employeedisplay_id }}
            </p>
        </div>
        <div class="w-full absolute top-[142px] m-auto">
            <p class="text-xl font-bold text-center h-[244.5px] w-[191px] m-auto overflow-hidden flex items-center justify-center">
                <img
                    v-if="information.profile_photo && information.profile_photo.base64 !== 'File doesn\'t exists.'"
                    draggable="false"
                    class="h-full bg-transparent max-w-max"
                    :src="information.profile_photo.base64"
                    alt="profile pic"
                >
                <img
                    v-else-if="information.gender.toLowerCase() === 'female'"
                    draggable="false"
                    class="h-full bg-transparent max-w-max"
                    :src="'/avatarexample.png'"
                    alt="profile pic"
                >
                <img
                    v-else
                    draggable="false"
                    class="h-full bg-transparent max-w-max"
                    :src="'/avatarexample.png'"
                    alt="profile pic"
                >
            </p>
        </div>
        <div class="w-full absolute top-[395px] text-center">
            <p style="font-family: 'Arial Black', 'Arial Bold', Gadget, sans-serif; font-size: 16pt; font-weight: bold;">
                {{ information.fullname_first_mi }}
            </p>
        </div>
        <div class="w-full absolute top-[425px] text-center">
            <p class="text-md">
                {{ employeePosition }}
            </p>
            <p class="text-md">
                {{ information.current_employment?.employee_department?.department_name }}
            </p>
        </div>
        <div class="w-full absolute top-[380.08px] text-center">
            <p class="text-xl font-bold">
                <LayoutFormPsSignaturePad v-if="editable" />
                <img
                    v-else-if="information.digital_signature"
                    draggable="false"
                    class="w-full bg-transparent m-auto"
                    :src="information.digital_signature.base64"
                    alt="Digital Signature ALT TEXT"
                >
                <img
                    v-else
                    draggable="false"
                    class="w-full bg-transparent m-auto"
                    src="/signature_example.png"
                    alt="Digital Signature ALT TEXT"
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
