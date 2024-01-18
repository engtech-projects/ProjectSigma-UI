<script setup>
import { storeToRefs } from "pinia"
import { usePagibigStore } from "@/stores/pagibig"

const contributions = usePagibigStore()
const { contribution, errorMessage, successMessage } = storeToRefs(contributions)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const cancelEdit = () => {
    contributions.reset()
}
const editCont = async () => {
    try {
        boardLoading.value = true
        await contributions.editContribution()
        snackbar.add({
            type: "success",
            text: contributions.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: contributions.errorMessage || "something went wrong."
        })
    } finally {
        contributions.clearMessages()
        boardLoading.value = false
    }
}

</script>

<template>
    <LayoutEditBoards title="Edit Contribution" :loading="boardLoading">
        <div class="text-gray-500 mt-2">
            <form @submit.prevent="editCont">
                <div class="space-y-2">
                    <label
                        class="text-md italic"
                    >Edit Contribution Range</label>
                </div>

                <div class="grid grid-cols-2 gap-2 ">
                    <div>
                        <label
                            for="rangeFrom"
                            class="text-sm italic"
                        >Range From</label>
                        <input
                            id="rangeFrom"
                            v-model="contribution.range_from"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div>
                        <label
                            for="rangeTo"
                            class="text-sm italic"
                        >Range To</label>
                        <input
                            id="rangeFrom"
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

                <div class="flex justify-end gap-4">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        class="flex-1 text-white p-2 rounded bg-gray-700 content-center mt-5 hover:bg-gray-500"
                        @click="cancelEdit"
                    >
                        Cancel
                    </button>
                </div>
            </form>
            <p hidden class="text-red-600 text-center font-semibold">
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                hidden
                class="text-green-600 text-center font-semibold"
            >
                {{ successMessage }}
            </p>
        </div>
    </LayoutEditBoards>
</template>
