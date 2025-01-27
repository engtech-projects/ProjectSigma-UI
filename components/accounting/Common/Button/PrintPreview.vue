<script setup>
const printPreview = defineModel("printPreview", { required: false, type: Boolean })
</script>
<template>
    <div class="flex gap-2 justify-end w-full p-8">
        <button v-if="!printPreview" class="flex items-center gap-1 justify-center bg-gray-600 p-2 hover:bg-gray-900 text-white rounded-md w-32 text-sm" @click="printPreview=true">
            <Icon name="iconoir:printing-page" />
            Print Preview
        </button>
        <button v-else class="flex items-center gap-1 justify-center bg-orange-600 p-2 hover:bg-orange-900 text-white rounded-md w-32 text-sm" @click="printPreview=false">
            <Icon name="iconoir:printing-page" />
            Hide Preview
        </button>
    </div>
</template>
