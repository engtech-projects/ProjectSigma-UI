<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/employee"

const employee = useEmployeeInfo()
const { information: employeeInformation, employeeIsSearched } = storeToRefs(employee)

</script>
<template>
    <div class="w-full py-4 px-2 bg-slate-100 rounded-sm border-t-4 border-teal-500 sticky top-0">
        <div class="w-full">
            <div class="mb-4">
                <SearchBar />
            </div>
        </div>
        <div class="w-full">
            <div v-if="employeeIsSearched">
                <div class="space-y-6 mb-4" action="#">
                    <img
                        v-if="employeeInformation.profile_img"
                        class="md:h-58 w-full bg-gray-400 rounded-lg"
                        :src="employeeInformation.img"
                        alt="profile pic"
                    >
                    <img
                        v-else-if="employeeInformation.gender.toLowerCase() === 'female'"
                        class="md:h-58 w-full bg-gray-400 rounded-lg"
                        src="/avatarexample.png"
                        alt="profile pic"
                    >
                    <img
                        v-else
                        class="md:h-58 w-full bg-gray-400 rounded-lg"
                        src="/avatarexample.png"
                        alt="profile pic"
                    >
                    <div class="flex flex-col">
                        <div>
                            <p class="text-xl font-bold">
                                {{ employee.fullname }} ({{ employeeInformation.nick_name }})
                            </p>
                            <label
                                for="text"
                                class="block text-sm font-medium italic text-teal-700"
                            >{{ employeeInformation.current_employment }}</label>
                        </div>
                        <div>
                            <label
                                for="text"
                                class="block text-sm font-medium italic text-teal-700"
                            >{{ employeeInformation.birthday }}</label>
                        </div>
                        <div>
                            <label
                                for="text"
                                class="block text-sm font-medium italic text-teal-700"
                            >
                                {{ employeeInformation.gender }}
                            </label>
                            <label
                                for="text"
                                class="block text-sm font-medium italic text-teal-700"
                            >
                                {{ employeeInformation.mobile_number }}
                            </label>
                            <label
                                for="text"
                                class="block text-sm font-medium italic text-teal-700"
                            >
                                {{ employee.presentAddress }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="text-xl font-bold">
                    No Employee Selected
                </p>
            </div>
        </div>
    </div>
</template>
