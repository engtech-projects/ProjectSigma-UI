<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    headers: {
        type: Array,
        required: true
    },
    items: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <div>
        <table class="w-full border-collapse border border-black">
            <thead>
                <tr class="bg-white border-b border-black">
                    <th :colspan="headers.length" class="px-6 py-3 text-lg font-bold text-black">
                        {{ title }}
                    </th>
                </tr>
                <tr class="bg-blue-100 text-xs font-bold">
                    <th v-for="header in headers" :key="header.id" class="px-6 py-3 border border-black text-black">
                        {{ header.name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="index" class="border-b border-black hover:bg-gray-100 text-center">
                    <td v-for="header in headers" :key="header.id" class="px-6 py-4 border border-black text-sm text-black">
                        {{ item[header.id] || '-' }}
                    </td>
                </tr>
                <tr class="bg-white font-bold text-black">
                    <td :colspan="headers.length - 1" class="px-6 py-4 border border-black text-right uppercase">
                        Total
                    </td>
                    <td class="px-6 py-4 border border-black ">
                        {{ items.reduce((total, item) => total + (item.amount || 0), 0) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
