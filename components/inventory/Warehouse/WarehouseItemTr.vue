<script setup lang="ts">
const compId = useId()

defineProps({
    dataItem: {
        type: Array,
        required: true,
        default: null,
    }
})
</script>
<template>
    <tr v-for="data, index in dataItem" :id="compId" :key="index + '-item'" class="bg-white border-b">
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            {{ data.item_code }}
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            {{ data.stocks }}
        </td>
    </tr>
</template>
