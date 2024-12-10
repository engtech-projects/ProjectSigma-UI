<script setup>
import { storeToRefs } from "pinia"
import { usePostingPeriodStore } from "@/stores/accounting/setup/postingperiod"
import PsDateInput from "~/components/layout/Form/PsDateInput.vue"

const postingPeriodStore = usePostingPeriodStore()
const { postingPeriod, errorMessage, successMessage } = storeToRefs(postingPeriodStore)

const snackbar = useSnackbar()
const boardLoading = ref(false)
const emit = defineEmits(["saved"])

const handleSubmit = async () => {
    try {
        boardLoading.value = true
        await postingPeriodStore.createPostingPeriod()
        boardLoading.value = false
        if (postingPeriodStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: postingPeriodStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: postingPeriodStore.successMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: postingPeriodStore.errorMessage
        })
    } finally {
        emit("saved")
        boardLoading.value = false
        postingPeriodStore.clearMessages()
    }
}
</script>
<template>
    <LayoutBoards title="Posting Period" class="shadow-0" :loading="boardLoading">
        <div class="text-gray-500">
            <form class="p-2" @submit.prevent="handleSubmit">
                <div class="flex flex-col py-3">
                    <PsDateInput
                        v-model="postingPeriod.period_start"
                        title="Period Start"
                        required
                    />
                    <PsDateInput
                        v-model="postingPeriod.period_end"
                        title="Period End"
                        required
                    />
                </div>
                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                    >
                        Add Posting Period
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
