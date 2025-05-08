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
        model.value.total_vat_amount = parseFloat((model.value.cost * (model.value.vat / 100)).toFixed(2)) || 0
        model.value.amount = model.value.cost + model.value.total_vat_amount
    } else {
        model.value.cost = parseFloat((model.value.amount / (model.value.vat / 100 + 1)).toFixed(2)) || 0
        model.value.total_vat_amount = (model.value.cost * (model.value.vat / 100)).toFixed(2)
    }
}
const selectStakeholder = (stakeholder) => {
    model.value.stakeholderInformation = stakeholder
    model.value.stakeholder_id = stakeholder.id
}
</script>
<template>
    <div class="grid grid-cols-11 gap-2">
        <div class="col-span-2 self-center">
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
        <div class="col-span-2 self-center">
            <label
                for="projectCode"
                class="text-xs italic"
            >Project/Section Code</label>
            <AccountingCommonSelectStakeholderSelect
                :stakeholder-id="model.stakeholder_id"
                :stakeholder="model.stakeholderInformation"
                :style="'z-index:' + (10 + (200 - index))"
                :select-options="['project', 'department', 'employee']"
                @select="selectStakeholder"
            />
        </div>
        <div class="col-span-1 self-center">
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
        <div class="col-span-1 self-center">
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
        <div class="col-span-1 self-center">
            <label
                for="vat"
                class="text-xs italic"
            >Vat Amount</label>
            <input
                id="vat"
                :value="model.total_vat_amount"
                min="0"
                max="100"
                type="number"
                step=".01"
                class="w-full rounded-lg h-9 text-sm bg-gray-100"
                disabled
                @change="setVat()"
            >
        </div>
        <div class="col-span-1 self-center">
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
        <div class="col-span-3 self-center">
            <label
                for="particular_group"
                class="text-xs italic"
            >Equipment No./Code</label>
            <div class="flex gap-1 items-start">
                <AccountingCommonSelectParticularGroup
                    v-model:particular-group-info="model.particularGroupInfo"
                    class="w-full"
                />
                <button
                    class="text-white p-2 bg-red-500 content-center rounded-md w-fit"
                    @click.prevent="emit('delete-item', index)"
                >
                    <Icon name="ion:trash" color="white" class="bg-red-500 rounded h-6 w-6 p-1" />
                </button>
            </div>
        </div>
        <div />
    </div>
</template>
