<script setup>
// <script setup lang="ts">
// interface RowAction {
//     edit: Boolean,
//     delete: Boolean,
// }
// interface HeaderType {
//     name: String,
//     id: String,
//     style: String,
// }

defineProps({
    headerColumns: {
        type: Array,
        required: true,
    },
    datas: {
        type: Array,
        required: true,
    },
    actions: {
        type: Object,
        required: true,
    },
})
const emit = defineEmits(["editRow", "deleteRow"])
const doEdit = (data) => {
    emit("editRow", data)
}
const doDelete = (data) => {
    emit("deleteRow", data)
}
</script>
<template>
    <table class="table-auto w-full border-collapse">
        <thead>
            <tr>
                <th
                    v-for="header in headerColumns"
                    :key="header.name+'headerRow'"
                    class="p-2"
                    :class="header.style ?? ''"
                >
                    {{ header.name }}
                </th>
                <th v-if="actions" class="p-2">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="dataValue, index in datas" :key="index" class="border text-center">
                <td
                    v-for="header in headerColumns"
                    :key="header+'headerRow'"
                    class="p-2"
                    :class="header.style ?? ''"
                >
                    {{ dataValue[header.id] }}
                </td>
                <td v-if="actions" class=" p-2 flex gap-2 justify-center">
                    <button v-if="actions.edit" @click="doEdit(dataValue) ">
                        <Icon name="material-symbols:edit" color="white" class="bg-green-400 rounded h-8 w-8 p-1" />
                    </button>
                    <button v-if="actions.edit" @click="doDelete(dataValue)">
                        <Icon name="ion:trash" color="white" class="bg-red-500 rounded h-8 w-8 p-1" />
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
