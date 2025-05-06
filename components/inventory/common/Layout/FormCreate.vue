<template>
    <div class="mt-4 p-4 bg-white rounded-md border border-gray-300">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold text-gray-800">
                {{ title }}
            </h2>
            <button
                type="button"
                class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-blue-300 font-semibold text-sm p-2 me-2 mb-2 flex items-center gap-1 rounded-lg"
                @click="onCreate"
            >
                <Icon name="mdi:plus" class="h-5 w-5 text-white" />
                {{ iconLabel }}
            </button>
        </div>
        <LayoutPsTable
            :header-columns="headers"
            :actions="{ edit: true }"
            :datas="datas"
            class="rounded-md shadow-sm"
            @edit-row="onEdit"
        />
    </div>
</template>

<script setup>
defineProps({
    headers: {
        type: Array,
        required: true
    },
    datas: {
        type: Array,
        default: () => []
    },
    onCreate: {
        type: Function,
        required: true
    },
    onEdit: {
        type: Function,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    iconLabel:
    {
        type: String,
        required: true
    }
})
</script>
