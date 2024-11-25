<script setup>
import { storeToRefs } from "pinia"
import { useAccountGroupStore } from "@/stores/accounting/setup/accountgroups"

const accountGroupStore = useAccountGroupStore()
const { accountGroup, errorMessage, successMessage } = storeToRefs(accountGroupStore)

const snackbar = useSnackbar()
const boardLoading = ref(false)
const emit = defineEmits(["saved"])

const handleSubmit = async () => {
    try {
        boardLoading.value = true
        await accountGroupStore.createAccountGroup()
        if (accountGroupStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: accountGroupStore.errorMessage
            })
        } else {
            emit("saved")
            snackbar.add({
                type: "success",
                text: accountGroupStore.successMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: accountGroupStore.errorMessage
        })
    } finally {
        accountGroupStore.clearMessages()
        boardLoading.value = false
    }
}
</script>
<template>
    <LayoutBoards title="Account Group" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="handleSubmit">
                <div class="flex flex-col gap-2">
                    <div>
                        <label
                            for="account_group_name"
                            class="text-xs italic"
                        >Account Group Name</label>
                        <input
                            id="accountGroupName"
                            v-model="accountGroup.name"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                </div>
                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                    >
                        Add Account Group
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
