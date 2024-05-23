<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const employee = useEmployeeInfo()
const { information: employeeInformation, employeeIsSearched, editable } = storeToRefs(employee)
// CLOSE CAMERA ON LEAVE PAGE
onBeforeRouteLeave(() => {
    employee.$reset()
})
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
                        v-if="employeeInformation.profile_photo"
                        class="max-h-96 max-w-96 w-full bg-gray-400 rounded-lg"
                        :src="employeeInformation.profile_photo.base64"
                        alt="profile pic"
                    >
                    <img
                        v-else-if="employeeInformation.gender.toLowerCase() === 'female'"
                        class="max-h-96 max-w-96 w-full bg-gray-400 rounded-lg"
                        :src="'/avatarexample.png'"
                        alt="profile pic"
                    >
                    <img
                        v-else
                        class="max-h-96 max-w-96 w-full bg-gray-400 rounded-lg"
                        :src="'/avatarexample.png'"
                        alt="profile pic"
                    >
                    <div class="p-2">
                        <LayoutFormPsUploadPicture v-if="editable" />
                    </div>
                    <div class="flex flex-col">
                        <div>
                            <p class="text-xl font-bold">
                                {{ employee.fullname }} ({{ employeeInformation.nick_name }})
                            </p>
                            <label
                                for="text"
                                class="block text-sm font-medium italic text-teal-700"
                            >
                                {{ employeeInformation.current_employment?.position_title }} - {{ employeeInformation.current_employment?.employment_status }}
                            </label>
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
