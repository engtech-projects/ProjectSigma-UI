<script setup>
import { storeToRefs } from "pinia"
import { usePagibigStore } from "@/stores/pagibig"

const contributions = usePagibigStore()
const { contribution, errorMessage, successMessage } = storeToRefs(contributions)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const addRange = async () => {
    try {
        boardLoading.value = true
        await contributions.addContribution()
        snackbar.add({
            type: "success",
            text: contributions.successMessage
        })
    } finally {
        boardLoading.value = false
        departments.clearMessages()
    }
}
</script>

<template>
    <LayoutBoards title="Pag-IBIG" :loading="boardLoading">
        <div class="text-gray-500 mt-2">
            <form @submit.prevent="addRange">
                <label
                    class="text-sm"
                >Add Pag-IBIG Share</label>
                <div class="grid grid-cols-2 gap-2 ">
                    <div>
                        <label
                            for="pagibig_range_from"
                            class="text-sm italic"
                        >Range From</label>
                        <input
                            id="pagibig_range_from"
                            v-model="contribution.range_from"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div>
                        <label
                            for="pagibig_range_to"
                            class="text-sm italic"
                        >Range To</label>
                        <input
                            id="pagibig_range_to"
                            v-model="contribution.range_to"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                </div>
                <div>
                    <div>
                        <label
                            for="pagibig_employerShare"
                            class="text-sm italic"
                        >Employeer Share Percent (%)</label>
                        <input
                            id="pagibig_employerShare"
                            v-model="contribution.employer_share_percent"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                </div>
                <div>
                    <div>
                        <label
                            for="pagibig_employeeShare"
                            class="text-sm italic"
                        >Employee Share Percent (%)</label>
                        <input
                            id="pagibig_employeeShare"
                            v-model="contribution.employee_share_percent"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                </div>
                <div>
                    <div>
                        <label
                            for="pagibig_maxCont"
                            class="text-sm italic"
                        >Max Contribution</label>
                        <input
                            id="pagibig_maxCont"
                            v-model="contribution.max_contribution"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                </div>
                <div>
                    <div>
                        <label
                            for="empMaxCont"
                            class="text-sm italic"
                        >Employee Maximum Contribution</label>
                        <input
                            id="empMaxCont"
                            v-model="contribution.employee_maximum_contribution"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div>
                        <label
                            for="emprMaxCont"
                            class="text-sm italic"
                        >Employer Maximum Contribution</label>
                        <input
                            id="emprMaxCont"
                            v-model="contribution.employer_maximum_contribution"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                </div>

                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                    >
                        Add Contribution
                    </button>
                </div>
            </form>
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
        </div>
    </LayoutBoards>
</template>
<style scoped>
.error-message,
.success-message {
    transition: opacity 1s ease;
}

.error-message.fade-out,
.success-message.fade-out {
    animation-duration: 1s;
    opacity: 0;
}
</style>
