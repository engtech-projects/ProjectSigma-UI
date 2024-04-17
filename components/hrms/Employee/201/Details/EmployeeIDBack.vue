<script setup>
import vueQr from "vue-qr/src/packages/vue-qr.vue"
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"
const employee = useEmployeeInfo()

const { information } = storeToRefs(employee)
</script>
<template>
    <div class="w-full shadow-lg relative">
        <img class="w-full min-w-80 cover" src="/back.fw.png" alt="front" draggable="false">
        <div class="w-full absolute md:top-[0.5rem] top-[0.5rem] text-right">
            <p class="font-light text-xs px-2">
                {{ employee.presentAddress }}
            </p>
            <p class="font-light text-xs px-2">
                {{ information.cellphone }}
            </p>
        </div>
        <div class="w-full absolute md:top-[7rem] top-[7rem] text-left flex gap-2">
            <p class="text-sm font-bold px-2">
                IN CASE OF EMERGENCY PLEASE NOTIFY
            </p>
        </div>
        <div class="w-2/3 absolute md:top-[9rem] top-[9rem] text-left flex gap-2">
            <div class="w-full text-center">
                <p class="text-lg font-light drop-shadow-md">
                    {{ information.contact_person.name }}
                </p>
                <p class="font-light text-xs px-2">
                    {{ employee.contactPersonAddress }}
                </p>
                <p class="font-light text-xs px-2">
                    {{ employee.contact_person }}
                </p>
            </div>
        </div>
        <div class="w-full absolute md:top-[15rem] top-[15rem] text-left">
            <div class="w-2/3 text-left p-2">
                <div class="flex gap-2">
                    <p class="text-xs font-light drop-shadow-md">
                        TIN:
                    </p>
                    <p class="text-xs font-light drop-shadow-md">
                        {{ information.company_employments.tin_number ?? 'NO DETAILS' }}
                    </p>
                </div>
                <div class="flex gap-2">
                    <p class="text-xs font-light drop-shadow-md">
                        PAG-IBIG:
                    </p>
                    <p class="text-xs font-light drop-shadow-md">
                        {{ information.company_employments.pagibig_number ?? 'NO DETAILS' }}
                    </p>
                </div>
                <div class="flex gap-2">
                    <p class="text-xs font-light drop-shadow-md">
                        PHIC:
                    </p>
                    <p class="text-xs font-light drop-shadow-md">
                        {{ information.company_employments.phic_number ?? 'NO DETAILS' }}
                    </p>
                </div>
                <div class="flex gap-2">
                    <p class="text-xs font-light drop-shadow-md">
                        SSS:
                    </p>
                    <p class="text-xs font-light drop-shadow-md">
                        {{ information.company_employments.sss_number ?? 'NO DETAILS' }}
                    </p>
                </div>
                <div class="flex gap-2">
                    <p class="text-xs font-light drop-shadow-md">
                        BIRTHDAY:
                    </p>
                    <p class="text-xs font-light drop-shadow-md">
                        {{ information.birthday ?? 'NO DETAILS' }}
                    </p>
                </div>
            </div>
        </div>
        <div class="w-full absolute md:top-[21rem] top-[20rem]">
            <div class="w-full p-2  text-center">
                <vue-qr
                    id="employee-qr-code"
                    :correct-level="3"
                    class="w-1/2"
                    logo-src="/evenpar.jpg"
                    :logo-margin="5"
                    :text="information.company_employments.employeedisplay_id"
                />
            </div>
        </div>
    </div>
</template>
