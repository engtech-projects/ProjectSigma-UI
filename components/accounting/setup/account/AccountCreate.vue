<script setup>
import { storeToRefs } from "pinia"
import { useAccountStore } from "@/stores/accounting/setup/account"
import { useAccountTypeStore } from "@/stores/accounting/setup/accounttype"
import { useReportGroupStore } from "@/stores/accounting/setup/reportgroup"

const accountStore = useAccountStore()
const accountTypeStore = useAccountTypeStore()
const reportGroupStore = useReportGroupStore()
const { account, errorMessage, successMessage } = storeToRefs(accountStore)

const snackbar = useSnackbar()
const boardLoading = ref(false)
const emit = defineEmits(["saved"])

const handleSubmit = async () => {
    try {
        boardLoading.value = true
        await accountStore.createAccount()
        if (accountStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: accountStore.errorMessage
            })
        } else {
            emit("saved")
            snackbar.add({
                type: "success",
                text: accountStore.successMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: accountStore.errorMessage
        })
    } finally {
        accountStore.clearMessages()
        boardLoading.value = false
    }
}
</script>
<template>
    <LayoutBoards title="Account" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="handleSubmit">
                <div class="flex flex-col gap-2">
                    <div>
                        <label
                            for="account_no"
                            class="text-xs italic"
                        >Account No</label>
                        <input
                            id="accountNo"
                            v-model="account.account_number"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div>
                        <label
                            for="account_name"
                            class="text-xs italic"
                        >Account Name</label>
                        <input
                            id="accountName"
                            v-model="account.account_name"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div>
                        <label
                            for="account_type"
                            class="text-xs italic"
                        >Account Type</label>
                        <select id="accountType" v-model="account.account_type_id" class="w-full rounded-lg" required>
                            <option v-for="at, i in accountTypeStore.list" :key="i" :value="at.id">
                                {{ upperFirst(at.account_type) }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label
                            for="account_type"
                            class="text-xs italic"
                        >Report Group</label>
                        <select id="accountType" v-model="account.report_group_id" class="w-full rounded-lg" required>
                            <option v-for="rg, i in reportGroupStore.list" :key="i" :value="rg.id">
                                {{ upperFirst(rg.name) }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label
                            for="account_name"
                            class="text-xs italic"
                        >Description</label>
                        <textarea
                            id="accountName"
                            v-model="account.account_description"
                            class="w-full rounded-lg resize-none h-24"
                        />
                    </div>
                </div>
                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                    >
                        Add Account
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
