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
    },
    baseItems: {
        type: Array,
        default: () => []
    }
})

// Utility: compare new item vs base item
const isChanged = (newVal, oldVal) => {
    return String(newVal)?.trim()?.toLowerCase() !== String(oldVal)?.trim()?.toLowerCase()
}
</script>

<template>
    <div>
        <table class="w-full border border-collapse">
            <thead>
                <tr class="bg-white border-b">
                    <th :colspan="headers.length" class="px-6 py-3 text-xs font-bold">
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
                <tr
                    v-for="(item, index) in items"
                    :key="index"
                    class="border-b hover:bg-gray-100"
                >
                    <td
                        v-for="header in headers"
                        :key="header.id"
                        class="px-6 py-4 border text-sm"
                        :class="{
                            'bg-yellow-100': baseItems?.[index] && isChanged(item[header.id], baseItems[index][header.id])
                        }"
                    >
                        <!-- checkbox for cancel_item -->
                        <template v-if="header.id === 'cancel_item'">
                            <input
                                v-model="item.cancel_item"
                                type="checkbox"
                                class="w-4 h-4"
                            >
                        </template>

                        <!-- editable input -->
                        <template v-else>
                            <input
                                v-model="item[header.id]"
                                class="w-full border border-gray-300 rounded px-2 py-1 text-sm text-center"
                                :type="typeof item[header.id] === 'number' ? 'number' : 'text'"
                            >
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
