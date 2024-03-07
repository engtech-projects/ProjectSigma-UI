<script setup>
import { storeToRefs } from "pinia"
import { useJobapplicantStore } from "@/stores/employee/jobapplicant"

const jobapplicants = useJobapplicantStore()

const { errorMessage, successMessage } = storeToRefs(jobapplicants)

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
const showFormComponent = ref(false)
const applicantDetail = ref(false)

const addApplicant = () => {
    showFormComponent.value = true
}
const closeForm = () => {
    showFormComponent.value = false
}

// const applicantDetails = async () => {
//     applicantDetail.value = true
//     await jobapplicants.getJobApplicantsDetails()
// }

const applicantDetails = async () => {
    applicantDetail.value = true
    await jobapplicants.getJobApplicantsDetails()
}
const closeApplicantDetail = () => {
    applicantDetail.value = false
}

</script>

<template>
    <div class="flex flex-col items-end gap-4">
        <LayoutEditBoards title="Detailed List" class="w-full" :loading="boardLoading">
            <div class="text-gray-600 text-sm p-2">
                <div class="rounded p-2 grid grid-cols-2 " @change="setDetail">
                    <div v-for="(detailList, index) in manpowerData" :key="index" class="border px-4 py-2">
                        <span class="font-semibold">{{ index }}: </span>
                        <template v-if="index === 'Applicants'">
                            <span class="cursor-pointer text-blue-500" @click="applicantDetails">
                                {{ detailList }}
                            </span>
                        </template>
                        <template v-else>
                            {{ detailList }}
                        </template>
                    </div>
                </div>

                <Teleport to="body">
                    <div v-if="showFormComponent" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70" @click="closeForm">
                        <div class="bg-white p-4 w-8/12 h-4/5 mt-10 ml-64 gap-2 rounded-md shadow-lg overflow-auto absolute" @click.stop>
                            <HrmsEmployeeJobApplicationForm class="pt-2" />
                        </div>
                    </div>
                </Teleport>

                <Teleport to="body">
                    <div v-if="applicantDetail" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70" @click="closeApplicantDetail">
                        <div class="p-4 w-8/12 h-4/5 mt-10 ml-64 gap-2 rounded-md overflow-auto absolute" @click.stop>
                            <div v-if="applicantDetail">
                                <div v-for="(applicant, key) in applicantDetail" :key="key" class="border px-4 py-2">
                                    <span class="font-semibold">{{ key }}:</span>
                                    <span>{{ applicant }}</span>
                                </div>
                            </div>
                            <HrmsEmployeeJobApplicantList />
                        </div>
                    </div>
                </Teleport>

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
    </div>
</template>
