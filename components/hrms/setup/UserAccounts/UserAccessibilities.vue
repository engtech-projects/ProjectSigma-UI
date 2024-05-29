<script setup>
import { useAccessbilities } from "@/stores/hrms/accessibilities"
import { useUserStore } from "@/stores/hrms/setup/users"

const accessbilities = useAccessbilities()
const user = useUserStore()

const { editData } = storeToRefs(user)
</script>
<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div
            class="flex flex-col items-center justify-center mx-auto lg:py-0 "
        >
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700  border-t-4 border-teal-400">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                    <div class="border-b w-full h-[14px] text-center mb-2 ">
                        <span class="text-md bg-white text-black px-3 italic">
                            User Accessibility
                        </span>
                    </div>
                    <div class="grid justify-between overflow-auto h-96">
                        <HrmsSetupUserAccountsAccessibilitiesSelectorCheckbox
                            v-for="access, accid in accessbilities.formattedAccessibilities"
                            :key="'MainAccessibility' + accid"
                            v-model="editData.params.accessibilities"
                            :accessibilities="access"
                            :is-first-level="true"
                            :title="accid"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
