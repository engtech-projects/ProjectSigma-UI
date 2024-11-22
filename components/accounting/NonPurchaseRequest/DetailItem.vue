<script setup>
const isGetTotal = ref(true)

defineProps({
    index: {
        type: Number,
        required: true
    }
})
const model = defineModel({ required: true, type: Object })
const emit = defineEmits("delete-item")
const setCost = () => {
    isGetTotal.value = true
    compute()
}
const setTotal = () => {
    isGetTotal.value = false
    compute()
}
const setVat = () => {
    compute()
}
const compute = () => {
    if (isGetTotal.value) {
        model.value.vatAmount = parseFloat((model.value.cost * (model.value.vat / 100)).toFixed(2)) || 0
        model.value.amount = model.value.cost + model.value.vatAmount
    } else {
        model.value.cost = parseFloat((model.value.amount / (model.value.vat / 100 + 1)).toFixed(2)) || 0
        model.value.vatAmount = (model.value.cost * (model.value.vat / 100)).toFixed(2)
    }
}

</script>
<template>
    <div class="flex gap-2">
        <div class="flex-1">
            <label
                for="particulars"
                class="text-xs italic"
            >Particulars</label>
            <input
                id="particulars"
                v-model="model.particulars"
                type="text"
                class="w-full rounded-lg h-9 text-sm bg-gray-100"
                required
            >
        </div>
        <div class="flex-1">
            <label
                for="projectCode"
                class="text-xs italic"
            >Project/Section Code</label>
            <AccountingCommonSelectStakeHolder
                v-model:stakeholder-info="model.stakeholderInformation"
                class="w-full"
                :selected-id="model.stakeholderInformation"
            />
        </div>
        <div class="flex-1">
            <label
                for="cost"
                class="text-xs italic"
            >Cost</label>
            <input
                id="cost"
                v-model="model.cost"
                type="number"
                step=".01"
                class="w-full rounded-lg h-9 text-sm bg-gray-100"
                required
                @change="setCost()"
            >
        </div>
        <div class="flex-1">
            <label
                for="vat"
                class="text-xs italic"
            >Vat %</label>
            <input
                id="vat"
                v-model="model.vat"
                min="0"
                max="100"
                type="number"
                step=".01"
                class="w-full rounded-lg h-9 text-sm bg-gray-100"
                required
                @change="setVat()"
            >
        </div>
        <div class="flex-1">
            <label
                for="vat"
                class="text-xs italic"
            >Vat Amount</label>
            <input
                id="vat"
                :value="model.vatAmount"
                min="0"
                max="100"
                type="number"
                step=".01"
                class="w-full rounded-lg h-9 text-sm bg-gray-100"
                disabled
                @change="setVat()"
            >
        </div>
        <div class="flex-1">
            <label
                for="total"
                class="text-xs italic"
            >Total</label>
            <input
                id="total"
                v-model="model.amount"
                type="number"
                step=".01"
                class="w-full rounded-lg h-9 text-sm bg-gray-100"
                @change="setTotal()"
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
