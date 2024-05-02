<script setup>
import vueQr from "vue-qr/src/packages/vue-qr.vue"
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"
const employee = useEmployeeInfo()

const currentYear = new Date().getFullYear()

const { information } = storeToRefs(employee)
</script>
<template>
    <div id="back-id" class="h-[6.303in] w-[4.051in] shadow-lg bg-white relative">
        <img class="h-[6.303in] w-[4.051in] cover" src="/ID-BACK.png" alt="front" draggable="false">
        <div class="absolute top-[5px] text-center w-[3.80in] m-auto pt-5">
            <p class="font-bold text-lg">
                {{ information.contact_person?.name }}
            </p>
            <p class="text-xs font-medium">
                {{ information.contact_person?.contact_no }}
            </p>
            <p class=" text-xs font-medium">
                {{ employee.contact_person?.address ?? "" }}
            </p>
        </div>
        <div class="absolute top-[95px] left-[180px] w-[2.3in] m-auto mt-4 px-4">
            <div class="flex justify-left">
                <p class="font-medium text-xs px-2">
                    {{ information.company_employments.tin_number ?? 'NO DETAILS' }}
                </p>
            </div>
            <div class="flex justify-left">
                <p class="font-medium text-xs px-2">
                    {{ information.company_employments.pagibig_number ?? 'NO DETAILS' }}
                </p>
            </div>
            <div class="flex justify-left">
                <p class="font-medium text-xs px-2">
                    {{ information.company_employments.phic_number ?? 'NO DETAILS' }}
                </p>
            </div>
            <div class="flex justify-left">
                <p class="font-medium text-xs px-2">
                    {{ information.company_employments.sss_number ?? 'NO DETAILS' }}
                </p>
            </div>
            <div class="flex justify-left">
                <p class="font-medium text-xs px-2">
                    {{ information.date_of_birth }}
                </p>
            </div>
        </div>
        <div class="absolute top-[155px] w-full m-auto text-center mt-10">
            <vue-qr
                id="employee-qr-code"
                :correct-level="3"
                class="w-[2in]"
                logo-src="/evenpar.jpg"
                :logo-margin="5"
                :text="information.company_employments.employeedisplay_id"
            />
        </div>
        <div class="absolute top-[485px] left-[20px] m-auto px-5 py-3">
            <table class="w-full">
                <tbody>
                    <tr v-for="(year) in 3" :key="year">
                        <td class="border-collapse p-1">
                            <p class="font-medium">
                                {{ currentYear + year }}
                            </p>
                        </td>
                        <td class="border-collapse" />
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scoped>
div, p, img, span, td, tr {
    /* remove border in image */
    border: hidden;
}
</style>
