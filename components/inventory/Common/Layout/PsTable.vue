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
const doEdit = (data: any) => {
    emit("editRow", data)
}
const doDelete = (data: any) => {
    emit("deleteRow", data)
}
const showTbl = (data: any) => {
    emit("showTable", data)
}
const doDetail = (data: any) => {
    emit("detailRow", data)
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
                    {{ dataValue.sku }}
                    <td
                        v-for="header in headerColumns"
                        :key="header+'headerRow'"
                        class="p-2"
                        :class="header.style ?? ''"
                        :set="val = dataValue"
                    >
                        <template v-if="(header.id).includes('.')">
                            <span v-for="headerid in (header.id).split('.')" :key="'templateheaderrow'+headerid" :set="val = val[headerid]" />
                            <div class="flex flex-row gap-2">
                                <div class="icon">
                                    <Icon name="material-symbols:info-outline" class="text-blue-700 h-5 w-5 lg:h-5 lg:w-5" data-tooltip-target="tooltip-top" />
                                    <div id="tooltip-top" data-popover role="tooltip" class="absolute z-10 duration-300 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
                                        <div class="list flex flex-col gap-2">
                                            <button class="bg-transparent cursor-pointer">
                                                Lorem Ipsum
                                            </button>
                                        </div>
                                        <div class="tooltip-arrow" data-popper-arrow />
                                    </div>
                                </div>
                                <div class="context">
                                    {{ val }}
                                </div>
                            </div>
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
