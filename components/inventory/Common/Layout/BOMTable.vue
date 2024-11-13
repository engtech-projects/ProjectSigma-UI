<script lang="ts" setup>
interface HeaderColumn {
    name: string,
    id: string,
    style: string
}

defineProps({
    headerColumns: {
        type: Array<HeaderColumn>,
        required: true,
    },
    datas: {
        type: Array<any>,
        required: true,
    },
    actions: {
        type: Object,
        required: false,
        default: null,
    },
})

const emit = defineEmits(["editRow", "deleteRow", "showTable", "detailRow"])
const showTbl = (data: any) => {
    emit("showTable", data)
}
const activeIndex = ref(null)
const setActiveRow = (index: any) => {
    activeIndex.value = index
}
const isActiveRow = (index: any) => {
    return activeIndex.value === index
}
</script>
<template>
    <div v-if="datas && datas.length > 0" class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
        <table class="table-auto w-full border-collapse">
            <thead>
                <tr>
                    <th
                        v-for="header in headerColumns"
                        :key="header.name+'headerRow'"
                        class="p-2 border"
                        :class="header.style ?? ''"
                    >
                        {{ header.name }}
                    </th>
                    <th v-if="actions" class="p-2 border">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="dataValue, index in datas" :key="index" class="border text-center" :class="{ 'active': isActiveRow(index) }" @click="setActiveRow(index)">
                    <td class="p-2">
                        {{ dataValue.item_summary[0].item_code }}
                    </td>
                    <td>
                        {{ dataValue.request_status }}
                    </td>
                    <td v-if="actions" class=" p-2 flex gap-2 justify-center">
                        <button v-if="actions.showTable" @click="showTbl(dataValue)">
                            <Icon name="material-symbols:visibility-rounded" color="white" class="bg-teal-700 rounded h-8 w-8 p-1" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
        <p class="text-center text-lg p-2">
            NO DATA
        </p>
    </div>
</template>
<style scoped>
.active {
    background-color: #0475816b;
    color:black;
    font-weight: 500;
}
</style>
