<script setup>
import { storeToRefs } from "pinia"
import { useContributionStore } from "@/stores/sss"

const contributions = useContributionStore()
const { contribution, errorMessage, successMessage } = storeToRefs(contributions)

const addRange = () => {
    contributions.addContribution()

    setTimeout(() => {
        contributions.clearMessages()
    }, 2000)
}

</script>

<template>
    <LayoutBoards title="SSS" class="w-96 p-4">
        <div class="text-gray-500">
            <form @submit.prevent="addRange">
                <label
                    class="text-sm"
                >Add SSS Contribution Range</label>

                <div class="grid grid-cols-2 gap-2 ">
                    <div>
                        <label
                            for="rangeFrom"
                            class="text-sm italic"
                        >Range From</label>
                        <input
                            id="rangeFrom"
                            v-model="contribution.range_from"
                            required
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
                            v-model="contribution.employer_share"
                            required
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div>
                        <label
                            for="employeeShare"
                            class="text-sm italic"
                        >Employee Share</label>
                        <input
                            id="employeeShare"
                            v-model="contribution.employee_share"
                            required
                            type="number"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div>
                        <label
                            for="totalContributions"
                            class="text-sm italic"
                        >
                            Total Contributions
                        </label>
                        <input
                            id="totalContributions"
                            :value="contribution.employer_share + contribution.employee_share"
                            disabled
                            readonly
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

            <p class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                class="success-message text-green-600 text-center font-semibold italic transition-opacity delay-1000"
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
