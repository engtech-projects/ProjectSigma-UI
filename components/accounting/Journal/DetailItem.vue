<script setup>
defineProps({
    index: {
        type: Number,
        required: true
    },
    totalDebit: {
        type: Number,
        required: true
    },
    itemCount: {
        type: Number,
        required: true
    }
})
const details = defineModel("details", { required: true, type: Object })
const emit = defineEmits("delete-item")
const selectStakeholder = (stakeholder) => {
    details.value.stakeholderInformation = stakeholder
    details.value.stakeholder_id = stakeholder.id
}
</script>
<template>
    <div class="grid grid-cols-8 gap-2 p-2">
        <div class="col-span-2 self-center">
            <label
                for="account"
                class="text-xs italic"
            >Account</label>
            <AccountingCommonSelectJournalAccounts
                v-model:journal-account-info="details.journalAccountInfo"
                v-model:account-id="details.account_id"
            />
        </div>
        <div class="col-span-2 self-center">
            <label
                for="particulars"
                class="text-xs italic"
            >Project/Department</label>
            <!-- <AccountingCommonSelectStakeHolder
                v-model:stakeholder-info="details.stakeholderInformation"
                v-model:selected-type="details.stakeholder_type"
                class="w-full bg-white"
                :selected-id="details.stakeholder_id"
                :filter-options="['project', 'department', 'employee']"
            /> -->
            <AccountingCommonSelectStakeholderSelect
                :stakeholder-id="details.stakeholder_id"
                :stakeholder="details.stakeholderInformation"
                :style="'z-index:' + (10 + (itemCount - index))"
                :select-options="['project', 'department', 'employee']"
                @select="selectStakeholder"
            />
        </div>
        <div class="col-span-1 self-center">
            <label
                for="debit"
                class="text-xs italic"
            >Debit</label>
            <input
                id="debit"
                v-model="details.debit"
                :disabled="details.credit != 0"
                type="number"
                step=".01"
                class="w-full rounded-lg h-9 text-sm "
            >
        </div>
        <div class="col-span-1 self-center">
            <label
                for="credit"
                class="text-xs italic"
            >Credit</label>
            <input
                id="credit"
                v-model="details.credit"
                :disabled="details.debit != 0"
                type="number"
                step=".01"
                class="w-full rounded-lg h-9 text-sm "
            >
            <p v-if="(index === itemCount - 1) && details.debit === 0" class="text-italic text-xs text-blue-500 cursor-pointer" @click="details.credit = totalDebit">
                max : {{ totalDebit }}
            </p>
        </div>
        <div class="flex gap-2 col-span-2 self-center">
            <div class="">
                <label
                    for="remarks"
                    class="text-xs italic"
                >Remarks/Description</label>
                <input
                    id="remarks"
                    v-model="details.description"
                    type="text"
                    class="w-full rounded-lg h-9 text-sm "
                >
            </div>
            <div>
                <button
                    class="text-white p-2 bg-red-500 content-center mt-5 rounded-md w-fit"
                    @click.prevent="emit('delete-item', index)"
                >
                    <Icon name="ion:trash" color="white" class="bg-red-500 rounded h-8 w-8 p-1" />
                </button>
            </div>
        </div>
    </div>
</template>
