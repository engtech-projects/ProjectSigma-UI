<script setup>

defineProps({
    index: {
        type: Number,
        required: true
    }
})
const model = defineModel({ required: true, type: Object })
</script>
<template>
    <div class="flex gap-2">
        <div class="w-full grid grid-cols-5 gap-2 bg-white p-3 rounded-lg shadow-sm">
            <div class="flex-1">
                <label
                    for="account"
                    class="text-xs italic"
                >Account</label>
                <AccountingCommonSelectJournalAccounts
                    v-model:journal-account-info="model.journalAccountInfo"
                    v-model:account-id="model.account_id"
                    class="w-full min-w-[300px]"
                />
            </div>
            <div class="flex flex-col">
                <span class="text-xs text-gray-500">Description</span>
                <span class="font-medium">{{ model.description || '-' }}</span>
            </div>
            <div class="flex flex-col">
                <span class="text-xs text-gray-500">Stakeholder</span>
                <span class="font-medium">{{ model.stakeholder?.name }}</span>
            </div>
            <div class="flex flex-col">
                <span class="text-xs text-gray-500">Debit</span>
                <span class="font-medium text-right">{{ accountingCurrency(model.debit) }}</span>
            </div>
            <div class="flex flex-col">
                <span class="text-xs text-gray-500">Credit</span>
                <span class="font-medium text-right">{{ accountingCurrency(model.credit) }}</span>
            </div>
        </div>
    </div>
</template>
