<script setup>
import { storeToRefs } from "pinia"
import { useContributionStore } from "@/stores/sss"

const contributions = useContributionStore()
const { contribution, errorMessage, successMessage } = storeToRefs(contributions)

const editCont = () => {
    contributions.editContribution()
}

const cancelEdit = () => {
    contributions.reset()
}

</script>

<template>
    <LayoutEditBoards title="Edit Contribution" class="w-96 p-4">
        <div class="text-gray-500 mt-2">
            <form @submit.prevent="editCont">
                <div class="space-y-2">
                    <label
                        class="text-md italic"
                    >New SSS Contribution Range</label>
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
                            for="employerShare"
                            class="text-sm italic"
                        >Employer Share</label>
                        <input
                            id="employerShare"
                            v-model="contribution.employee_share"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div>
                        <label
                            for="employeeShare"
                            class="text-sm italic"
                        >Employer Share</label>
                        <input
                            id="employeeShare"
                            v-model="contribution.employer_share"
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div>
                        <label
                            for="totalContributions"
                            class="text-sm italic"
                        >Total Contributions</label>
                        <input
                            id="totalContributions"
                            disabled
                            readonly
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
            <p class="text-red-600 text-center font-semibold">
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                class="text-green-600 text-center font-semibold"
            >
                {{ successMessage }}
            </p>
        </div>
    </LayoutEditBoards>
</template>
