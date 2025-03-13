<script setup>
defineProps({
    headerColumns: {
        type: Array,
        required: true,
    },
    datas: {
        type: Array,
        required: true,
    },
})

const emit = defineEmits(["addItem"])
</script>

<template>
    <table class="table-auto w-full border-collapse">
        <thead>
            <tr>
                <th v-for="header in headerColumns" :key="header.name" class="p-2">
                    {{ header.name }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="datas.length === 0">
                <td :colspan="headerColumns.length" class="text-center">
                    NO DATA
                </td>
            </tr>
            <template v-else>
                <tr
                    v-for="dataValue, index in datas"
                    :key="index"
                    class="border text-center cursor-pointer select-none"
                    title="Double click to add item"
                    :class="{ 'bg-gray-100': index % 2 === 0 }"
                    @dblclick="emit('addItem', dataValue)"
                >
                    <td v-for="header in headerColumns" :key="header.id" class="p-2">
                        {{ dataValue[header.id] }}
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>
