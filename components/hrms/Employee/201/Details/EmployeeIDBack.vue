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
        <img class="h-[6.303in] w-[4.051in] cover" src="/ID_Back.png" alt="front" draggable="false">
        <div class="absolute top-[5px] text-right">
            <div class="text-center w-[3.80in] m-auto">
                <p class="font-bold text-xl">
                    {{ information.contact_person?.name }}
                </p>
                <p class="text-[5px]">
                    {{ information.cellphone }}
                </p>
                <p class=" text-xs px-2">
                    {{ employee.presentAddress }}
                </p>
            </div>
            <div class="w-[2.3in] m-auto mt-4 px-4">
                <div class="flex justify-left">
                    <p class="font-medium text-xs px-2">
                        <span class="font-bold"> TIN : </span>
                    </p>
                    <p class="font-medium text-xs px-2">
                        {{ information.company_employments.tin_number ?? 'NO DETAILS' }}
                    </p>
                </div>
                <div class="flex justify-left">
                    <p class="font-medium text-xs px-2">
                        <span class="font-bold"> PAG-IBIG : </span>
                    </p>
                    <p class="font-medium text-xs px-2">
                        {{ information.company_employments.pagibig_number ?? 'NO DETAILS' }}
                    </p>
                </div>
                <div class="flex justify-left">
                    <p class="font-medium text-xs px-2">
                        <span class="font-bold"> PHIC : </span>
                    </p>
                    <p class="font-medium text-xs px-2">
                        {{ information.company_employments.phic_number ?? 'NO DETAILS' }}
                    </p>
                </div>
                <div class="flex justify-left">
                    <p class="font-medium text-xs px-2">
                        <span class="font-bold"> SSS : </span>
                    </p>
                    <p class="font-medium text-xs px-2">
                        {{ information.company_employments.sss_number ?? 'NO DETAILS' }}
                    </p>
                </div>
                <div class="flex justify-left">
                    <p class="font-medium text-xs px-2">
                        <span class="font-bold"> BIRTHDATE : </span>
                    </p>
                    <p class="font-medium text-xs px-2">
                        {{ information.date_of_birth }}
                    </p>
                </div>
            </div>
            <div class="w-full m-auto text-center">
                <vue-qr
                    id="employee-qr-code"
                    :correct-level="3"
                    class="w-[2.1in]"
                    logo-src="/evenpar.jpg"
                    :logo-margin="5"
                    :text="information.company_employments.employeedisplay_id"
                />
            </div>
            <div class="w-[3.5in] m-auto">
                <p class="text-xs text-justify">
                    This certifies that the person shown in the attached photo and signature is a legitimate employee of <b>EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION</b>. This ID must be retured to management upon resignation or termination.
                </p>
            </div>
            <div class="w-full m-auto px-5 py-3">
                <table class="w-full">
                    <thead>
                        <tr>
                            <th class="border-collapse">
                                <p class="text-sm">
                                    VALID UNTIL
                                </p>
                            </th>
                            <th class="border-collapse">
                                <p class="text-sm">
                                    VALIDATED BY
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(year) in 3" :key="year">
                            <td class="border-collapse border border-slate-500 text-center">
                                <p>
                                    {{ currentYear + year }}
                                </p>
                            </td>
                            <td class="border-collapse border border-slate-500 text-center" />
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<style scoped>
div, p, img, span {
    /* remove border in image */
    border: hidden;
}
</style>
