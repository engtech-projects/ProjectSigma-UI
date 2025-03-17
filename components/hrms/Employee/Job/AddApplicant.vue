<script setup>
import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/hrms/employee/manpower"
const manpowers = useManpowerStore()
const { allJobApplicants } = storeToRefs(manpowers)
const boardLoading = ref(false)

const showAddApplicant = defineModel("hideAddApplicant", { required: false, type: Boolean, default: false })

onMounted(() => {
    if (!allJobApplicants.value.isLoaded) {
        manpowers.getAllApplicant()
    }
})

const hideAddApplicant = () => {
    showAddApplicant.value = false
}

const applicantDetail = ref(false)
const applicantDetails = (applic) => {
    applicantDetail.value = true
    applicantInfo.value = applic
}
const route = useRoute()
const isClicked = ref(false)
const saveApplicant = async () => {
    isClicked.value = true
    if (route.query.key) {
        manpowers.storeApplicantRequests.form.manpowerrequests_id = route.query.key
        const getList = manpowers.getAddedApplicants.map(item => item.id)
        await manpowers.storeApplicants(getList)
        isClicked.value = false
    }
}

</script>
<template>
    <div>
        <div class="relative">
            <div v-if="allJobApplicants.isLoading" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
                <img
                    class="flex justify-center w-28 rounded-md"
                    src="/loader.gif"
                    alt="logo"
                >
            </div>
            <div
                class=" bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700 border-t-8 border-t-green-400"
            >
                <div class="w-full flex flex-row justify-between gap-4">
                    <h5 class="text-xl font-medium text-gray-900 dark:text-white border-b p-2">
                        Add Applicant
                    </h5>
                    <div class="flex flex-row gap-2 items-center justify-center">
                        <Icon name="material-symbols:dangerous" class="text-gray-900 h-6 w-6 cursor-pointer" @click="hideAddApplicant" />
                    </div>
                </div>
                <div>
                    <div class="text-gray-600 text-sm p-2">
                        <LayoutFormPsTextInput v-model="allJobApplicants.params.name" title="Applicant Name" class="w-full mb-4" />
                        <div class="overflow--auto min-h-96 max-h-96 overflow-y-auto">
                            <table class="table-auto border-collapse w-full">
                                <thead>
                                    <tr class="bg-gray-200">
                                        <th class="border border-gray-400 p-2" />
                                        <th class="border border-gray-400 p-2">
                                            Applicant Name
                                        </th>
                                        <th class="border border-gray-400 p-2">
                                            Desired Position
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="data, index in allJobApplicants.list" :key="index + '-applicant'" class="bg-white border-b">
                                        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
                                            <input
                                                id="checkItem"
                                                v-model="data.isCheck"
                                                class="cursor-pointer"
                                                type="checkbox"
                                                name="checkItem"
                                                :checked="data.isCheck"
                                            >
                                        </td>
                                        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center" @click="applicantDetails(data)">
                                            {{ data.fullname_last }}
                                        </td>
                                        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
                                            {{ data.desired_position }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="flex justify-end mt-4">
                            <button :disabled="isClicked" class="bg-green-500 text-white flex items-center p-2" @click="saveApplicant">
                                Save Applicants
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <PsModal v-model:show-modal="applicantDetail" :is-loading="boardLoading" title="APPLICANT DETAILS">
            <template #body>
                <HrmsEmployeeJobApplicantList :applicant="applicantInfo" />
            </template>
        </PsModal>
    </div>
</template>
