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
        <table class="w-full border border-collapse">
            <thead>
                <tr class="bg-white border-b">
                    <th :colspan="headers.length" class="px-6 py-3 text-sm font-bold">
                        {{ title }}
                    </th>
                </tr>
                <tr class="bg-blue-100 text-xs font-bold">
                    <th v-for="header in headers" :key="header.id" class="px-6 py-3 border">
                        {{ header.name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="index" class="border-b hover:bg-gray-100 text-center">
                    <td v-for="header in headers" :key="header.id" class="px-6 py-4 border text-sm">
                        {{ item[header.id] || '-' }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
