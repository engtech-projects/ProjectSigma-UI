<script setup>
import { storeToRefs } from "pinia"
import { useStakeHolderStore } from "@/stores/accounting/setup/stakeholder"
import PsSelect from "~/components/layout/Form/PsSelect.vue"
import PsTextInput from "~/components/layout/Form/PsTextInput.vue"

const stakeholderStore = useStakeHolderStore()
const { stakeholder, errorMessage, successMessage } = storeToRefs(stakeholderStore)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const handleSubmit = async () => {
    try {
        boardLoading.value = true
        await stakeholderStore.createStakeholder()
        if (stakeholderStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: stakeholderStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: stakeholderStore.successMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: stakeholderStore.errorMessage
        })
    } finally {
        boardLoading.value = false
        stakeholderStore.clearMessages()
    }
}
</script>
<template>
    <LayoutBoards title="Stakeholder" :loading="boardLoading">
        <div class="text-gray-500">
            <form class="p-2" @submit.prevent="handleSubmit">
                <div class="flex flex-col gap-2 py-3">
                    <PsTextInput
                        v-model="stakeholder.name"
                        title="Stakeholder Name"
                        required
                    />
                    <PsSelect
                        v-model="stakeholder.stakeholdable_type"
                        title="Stakeholder Type"
                        :options-list="[]"
                        required
                    />
                </div>
                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                    >
                        Add Stakeholder
                    </button>
                </div>
            </form>
            <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                hidden
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
