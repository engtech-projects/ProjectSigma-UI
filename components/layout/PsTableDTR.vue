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
        required: true,
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
    <div  class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
        <table class="table-auto w-full border-collapse">
            <thead>
                <tr>
                    <th
                        scope="col"
                        rowspan="3"
                        class="px-6 py-3 border-solid border border-zinc-800"
                    >
                        Date
                    </th>
                    <th
                        scope="col"
                        rowspan="3"
                        class="px-6 py-3 border-solid border border-zinc-800"
                    >
                        DESIGNATION / PROJECT CODE
                    </th>
                    <th
                        scope="col"
                        colspan="5"
                        class="px-6 py-3 border-solid border border-zinc-800"
                    >
                        Regular Time
                    </th>
                    <th
                        scope="col"
                        colspan="3"
                        class="px-6 py-3 border-solid border border-zinc-800"
                    >
                        Overtime
                    </th>
                </tr>
                <tr>
                    <th
                        scope="col"
                        colspan="2"
                        class="px-6 py-3 border-solid border border-zinc-800"
                    >
                        AM
                    </th>
                    <th
                        scope="col"
                        colspan="2"
                        class="px-6 py-3 border-solid border border-zinc-800"
                    >
                        PM
                    </th>
                    <th
                        scope="col"
                        colspan="1"
                        rowspan="2"
                        class="px-6 py-3 border-solid border border-zinc-800"
                    >
                        Total Hours
                    </th>
                    <th
                        scope="col"
                        colspan="1"
                        rowspan="2"
                        class="px-6 py-3 border-solid border border-zinc-800"
                    >
                        IN
                    </th>
                    <th
                        scope="col"
                        colspan="1"
                        rowspan="2"
                        class="px-6 py-3 border-solid border border-zinc-800"
                    >
                        OUT
                    </th>
                    <th
                        scope="col"
                        colspan="1"
                        rowspan="2"
                        class="px-6 py-3 border-solid border border-zinc-800"
                    >
                        Total Hours
                    </th>
                </tr>
                <tr>
                    <th
                        scope="col"
                        colspan="1"
                        class="px-6 py-3 border-solid border border-zinc-800"
                    >
                        IN
                    </th>
                    <th
                        scope="col"
                        colspan="1"
                        class="px-6 py-3 border-solid border border-zinc-800"
                    >
                        OUT
                    </th>
                    <th
                        scope="col"
                        colspan="1"
                        class="px-6 py-3 border-solid border border-zinc-800"
                    >
                        IN
                    </th>
                    <th
                        scope="col"
                        colspan="1"
                        class="px-6 py-3 border-solid border border-zinc-800"
                    >
                        OUT
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

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
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
