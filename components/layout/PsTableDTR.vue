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

const activeIndex = ref(null)
const isActiveRow = (index: any) => {
    return activeIndex.value === index
}
</script>

<template>
    <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
        <table class="table-auto w-full border-collapse">
            <thead class="bg-gray-900">
                <tr>
                    <th
                        scope="col"
                        rowspan="3"
                        class="text-white p-2 border-solid border border-zinc-700"
                    >
                        Date
                    </th>
                    <th
                        scope="col"
                        rowspan="3"
                        class="text-white p-2 border-solid border border-zinc-700"
                    >
                        DESIGNATION / PROJECT CODE
                    </th>
                    <th
                        scope="col"
                        colspan="5"
                        class="text-white p-2 border-solid border border-zinc-700"
                    >
                        Regular Time
                    </th>
                    <th
                        scope="col"
                        colspan="3"
                        class="text-white p-2 border-solid border border-zinc-700"
                    >
                        Overtime
                    </th>
                </tr>
                <tr>
                    <th
                        scope="col"
                        colspan="2"
                        class="text-white p-2 border-solid border border-zinc-700"
                    >
                        AM
                    </th>
                    <th
                        scope="col"
                        colspan="2"
                        class="text-white p-2 border-solid border border-zinc-700"
                    >
                        PM
                    </th>
                    <th
                        scope="col"
                        colspan="1"
                        rowspan="2"
                        class="text-white p-2 border-solid border border-zinc-700"
                    >
                        Total Hours
                    </th>
                    <th
                        scope="col"
                        colspan="1"
                        rowspan="2"
                        class="text-white p-2 border-solid border border-zinc-700"
                    >
                        IN
                    </th>
                    <th
                        scope="col"
                        colspan="1"
                        rowspan="2"
                        class="text-white p-2 border-solid border border-zinc-700"
                    >
                        OUT
                    </th>
                    <th
                        scope="col"
                        colspan="1"
                        rowspan="2"
                        class="text-white p-2 border-solid border border-zinc-700"
                    >
                        Total Hours
                    </th>
                </tr>
                <tr>
                    <th
                        scope="col"
                        colspan="1"
                        class="text-white p-2 border-solid border border-zinc-700"
                    >
                        IN
                    </th>
                    <th
                        scope="col"
                        colspan="1"
                        class="text-white p-2 border-solid border border-zinc-700"
                    >
                        OUT
                    </th>
                    <th
                        scope="col"
                        colspan="1"
                        class="text-white p-2 border-solid border border-zinc-700"
                    >
                        IN
                    </th>
                    <th
                        scope="col"
                        colspan="1"
                        class="text-white p-2 border-solid border border-zinc-700"
                    >
                        OUT
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="dataValue, index in datas" :key="index">
                    <tr class="border text-center border-b" :class="{ 'active': isActiveRow(index) }">
                        <td class="p-2">
                            {{ index }}
                        </td>
                        <td class="p-2" v-if="dataValue.schedules_attendances[0].project_id">
                            {{ dataValue.schedules_attendances[0].project_id }}
                        </td>
                        <td class="p-2" v-else-if="dataValue.schedules_attendances[0].department_id">
                            {{ dataValue.schedules_attendances[0].department_id }}
                        </td>
                        <td class="p-2" v-if="dataValue.schedules_attendances.applied_ins != null">
                            {{ dataValue.schedules_attendances.applied_ins.time_human }}
                        </td>
                        <td class="p-2" v-else>
                            N/A
                        </td>
                        <td class="p-2">
                            N/A
                        </td>
                        <td class="p-2">
                            N/A
                        </td>
                        <td class="p-2" v-if="dataValue.schedules_attendances.applied_outs != null">
                            {{ dataValue.schedules_attendances.applied_outs.time_human }}
                        </td>
                        <td class="p-2" v-else>
                            N/A
                        </td>
                        <td class="p-2">
                            N/A
                        </td>
                        <td class="p-2">
                            N/A
                        </td>
                        <td class="p-2">
                            N/A
                        </td>
                        <td class="p-2">
                            N/A
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
.active {
    background-color: #0475816b;
    color:black;
    font-weight: 500;
}
</style>
