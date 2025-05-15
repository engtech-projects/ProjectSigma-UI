<template>
    <div>
        <h2 class="text-lg font-semibold text-center mb-4">
            {{ title }}
        </h2>
        <div class="grid grid-cols-2 gap-4 justify-center items-center mt-4 p-4">
            <div class="flex flex-col gap-1">
                <InventoryCommonFormPsFormLabel title="Request For" value="Goods" />
                <InventoryCommonFormPsFormLabel title="Office/Project" :value="officeProject" />
                <InventoryCommonFormPsFormLabel title="Address" :value="address" />
            </div>
            <div class="flex flex-col gap-1">
                <InventoryCommonFormPsFormLabel title="Reference No." :value="referenceNo" />
                <InventoryCommonFormPsFormLabel title="Date Prepared" :value="datePrepared" />
                <InventoryCommonFormPsFormLabel title="Date Needed" :value="dateNeeded" />
                <InventoryCommonFormPsFormLabel title="Equipment No." :value="equipmentNo" />
            </div>
        </div>

        <InventoryCommonCanvasserSelector />

        <LayoutPsTable
            :header-columns="rsInfoHeaders"
            :datas="rsInfo"
            class="rounded-md shadow-sm"
        />
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: ""
    },
    selectedItem: {
        type: Boolean,
        required: true
    },
    officeProject: {
        type: String,
        default: "N/A"
    },
    address: {
        type: String,
        default: "N/A"
    },
    referenceNo: {
        type: String,
        default: "N/A"
    },
    datePrepared: {
        type: String,
        default: () => new Date().toLocaleDateString()
    },
    dateNeeded: {
        type: String,
        default: () => new Date(Date.now() + 7 * 86400000).toLocaleDateString()
    },
    equipmentNo: {
        type: String,
        default: "N/A"
    },
    rsInfoHeaders: {
        type: Array,
        required: true
    },
    rsInfo: {
        type: Array,
        default: () => []
    }
})
</script>
