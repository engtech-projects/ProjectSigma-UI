<script setup>
defineProps({
    index: {
        type: Number,
        required: true
    }
})
const model = defineModel({ required: true, type: Object })
const emit = defineEmits("delete-item")

const setDebit = () => {
    if (model.value.debit > 0) {
        model.value.credit = 0
    }
}

const setCredit = () => {
    if (model.value.credit > 0) {
        model.value.debit = 0
    }
}

</script>
<template>
    <div class="flex gap-2">
        <div class="flex-1">
            <label
                for="account"
                class="text-xs italic"
            >Account</label>
            <AccountingCommonSelectJournalAccounts
                v-model="model.account_id"
                class="w-full min-w-[300px]"
            />
        </div>
        <div class="flex-1">
            <label
                for="particulars"
                class="text-xs italic"
            >Project/Department</label>
            <AccountingCommonSelectStakeHolder
                v-if="!model.id"
                v-model:stakeholder-info="model.stakeholderInformation"
                class="w-full"
                :selected-id="model.stakeholder_id"
                :filter-options="['project', 'department', 'employee']"
            />
            <p v-else>
                {{ model.stakeholder.name }}
            </p>
        </div>

        <div class="flex-1">
            <label
                for="particulars"
                class="text-xs italic"
            >Particulars</label>
            <input
                v-if="!model.id"
                id="particulars"
                v-model="model.particulars"
                type="text"
                class="w-full rounded-lg h-9 text-sm bg-gray-100"
            >
            <p v-else>
                {{ model.particulars }}
            </p>
        </div>
        <div class="flex-1">
            <label
                for="vat"
                class="text-xs italic"
            >Vat</label>
            <input
                v-if="!model.id"
                id="vat"
                v-model="model.vat"
                type="number"
                step=".01"
                class="w-full rounded-lg h-9 text-sm bg-gray-100"
            >
            <p v-else>
                {{ model.vat }}
            </p>
        </div>
        <div class="flex-1">
            <label
                for="debit"
                class="text-xs italic"
            >Debit</label>
            <input
                id="debit"
                v-model="model.debit"
                type="number"
                step=".01"
                class="w-full rounded-lg h-9 text-sm bg-gray-100"
                @change="setDebit()"
            >
        </div>
        <div class="flex-1">
            <label
                for="credit"
                class="text-xs italic"
            >Credit</label>
            <input
                id="credit"
                v-model="model.credit"
                type="number"
                step=".01"
                class="w-full rounded-lg h-9 text-sm bg-gray-100"
                @change="setCredit()"
            >
        </div>
        <div class="flex-1">
            <label
                for="remarks"
                class="text-xs italic"
            >Remarks/Description</label>
            <input
                id="remarks"
                v-model="model.remarks"
                type="text"
                class="w-full rounded-lg h-9 text-sm bg-gray-100"
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
</template>
