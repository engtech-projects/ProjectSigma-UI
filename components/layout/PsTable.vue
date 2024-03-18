<!-- eslint-disable vue/no-useless-template-attributes -->
<script lang="ts" setup>
interface HeaderColumn {
    name: String,
    id: String,
    style: String
}

defineProps({
    headerColumns: {
        type: Array<HeaderColumn>,
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

const emit = defineEmits(["editRow", "deleteRow", "showTable", "detailRow"])
const doEdit = (data) => {
    emit("editRow", data)
}
const doDelete = (data) => {
    emit("deleteRow", data)
}
const showTbl = (data) => {
    emit("showTable", data)
}
const doDetail = (data) => {
    emit("detailRow", data)
}
const activeIndex = ref(null)
const setActiveRow = (index) => {
    activeIndex.value = index
}
const isActiveRow = (index) => {
    return activeIndex.value === index
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
            <tr v-for="dataValue, index in datas" :key="index" class="border text-center" :class="{ 'active': isActiveRow(index) }" @click="setActiveRow(index)">
                <td
                    v-for="header in headerColumns"
                    :key="header+'headerRow'"
                    class="p-2"
                    :class="header.style ?? ''"
                    :set="val = dataValue"
                >
                    <template v-if="(header.id).includes('.')">
                        <span v-for="headerid in (header.id).split('.')" :key="'templateheaderrow'+headerid" :set="val = val[headerid]" />
                        {{ val }}
                    </template>
                    <template v-else>
                        {{ dataValue[header.id] }}
                    </template>
                </td>
                <td v-if="actions" class=" p-2 flex gap-2 justify-center">
                    <button v-if="actions.edit" @click="doEdit(dataValue) ">
                        <Icon name="material-symbols:edit" color="white" class="bg-green-400 rounded h-8 w-8 p-1" />
                    </button>
                    <button v-if="actions.delete" @click="doDelete(dataValue)">
                        <Icon name="ion:trash" color="white" class="bg-red-500 rounded h-8 w-8 p-1" />
                    </button>
                    <button v-if="actions.showTable" @click="showTbl(dataValue)">
                        <Icon name="material-symbols:visibility-rounded" color="white" class="bg-teal-700 rounded h-8 w-8 p-1" />
                    </button>
                    <button v-if="actions.detail" @click="doDetail(dataValue)">
                        <Icon name="material-symbols:visibility-rounded" color="white" class="bg-green-500 rounded h-8 w-8 p-1 " />
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<style scoped>
.active {
    background-color: #0475816b;
    color:black;
    font-weight: 500;
}
</style>
