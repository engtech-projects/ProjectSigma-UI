<script setup>
import { storeToRefs } from "pinia"
import { useJobapplicantStore } from "@/stores/hrms/employee/jobapplicant"
const jobapplicants = useJobapplicantStore()

const { errorMessage, successMessage, addJobApplicantRequest } = storeToRefs(jobapplicants)

// const snackbar = useSnackbar()
const boardLoading = ref(false)

const props = defineProps({
    manpowerData: {
        type: Object,
        required: true,
    }
})

const emit = defineEmits(["setDetail"])
const setDetail = (event) => {
    emit("setDetail", props.manpowerData, event.target.value)
}
const showAddApplicant = ref(false)
const addApplicant = () => {
    showAddApplicant.value = true
}
</script>
<template>
    <div>
        <LayoutEditBoards title="Job Opening Details" class="w-full" :loading="boardLoading">
            <div class="text-gray-600 text-sm p-2">
                <div class="rounded p-2 grid grid-cols-2 " @change="setDetail">
                    <template v-for="(detailList, index) in manpowerData" :key="index">
                        <div v-if="!['id', 'job_applicants'].includes(index)" class="border px-4 py-2">
                            <span class="font-semibold">{{ index }}: </span>
                            <template v-if="index === 'Total Applicants'">
                                {{ detailList }}
                            </template>
                            <template v-else-if="index === 'Position'">
                                {{ detailList.name }}
                            </template>
                            <template v-else>
                                {{ detailList }}
                            </template>
                        </div>
                    </template>
                </div>
                <HrmsEmployeeJobProcessApplicant />
                <div class="flex justify-end mt-4">
                    <button class="hover:text-green-500 flex items-center" @click="addApplicant">
                        <Icon name="pajamas:file-addition" class="h-4 w-4 " />
                        Add Applicant
                    </button>
                </div>
            </div>
            <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                hidden
                class="success-message text-green-600 text-center font-semibold italic"
            >
                {{ successMessage }}
            </p>
        </LayoutEditBoards>
        <PsModal v-model:show-modal="showAddApplicant" :is-loading="addJobApplicantRequest.isLoading" title="APPLICATION FORM">
            <template #body>
                <HrmsEmployeeJobApplicationForm class="pt-2" />
            </template>
        </PsModal>
    </div>
</template>
