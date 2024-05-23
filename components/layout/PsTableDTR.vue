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
                    <template v-if="dataValue[1].schedules_attendances.length > 0">
                        <tr v-if="dataValue[1].schedules_attendances[0].applied_ins!=null" class="border text-center border-b" :class="{ 'active': isActiveRow(index) }">
                            <td class="p-2">
                                {{ dataValue[0] }}
                            </td>
                            <td v-if="dataValue[1].schedules_attendances[0].applied_ins.project_id" class="p-2">
                                {{ dataValue[1].schedules_attendances[0].applied_ins.project_id }}
                            </td>
                            <td v-else-if="dataValue[1].schedules_attendances[0].applied_ins.department_id" class="p-2">
                                {{ dataValue[1].schedules_attendances[0].applied_ins.department_id }}
                            </td>
                            <td v-if="dataValue[1].schedules_attendances[0].applied_ins!=null" class="p-2 am-time-in">
                                {{ dataValue[1].schedules_attendances[0].applied_ins.time_human }}
                            </td>
                            <td v-else-if="dataValue[1].schedules_attendances[1].applied_ins!=null" class="p-2">
                                NO LOG
                            </td>
                            <td v-else class="p-2">
                                ABSENT
                            </td>
                            <td v-if="dataValue[1].schedules_attendances[0].applied_outs != null" class="p-2 am-time-out">
                                {{ dataValue[1].schedules_attendances[0].applied_outs.time_human }}
                            </td>
                            <td v-else-if="dataValue[1].schedules_attendances[0].applied_outs == null && dataValue[1].schedules_attendances[0].applied_ins!=null" class="p-2">
                                NO LOG
                            </td>
                            <td v-else class="p-2">
                                ABSENT
                            </td>
                            <td v-if="dataValue[1].schedules_attendances[1].applied_ins != null" class="p-2 pm-time-in">
                                {{ dataValue[1].schedules_attendances[1].applied_ins.time_human }}
                            </td>
                            <td v-else-if="dataValue[1].schedules_attendances[0].applied_ins != null" class="p-2">
                                NO LOG
                            </td>
                            <td v-else class="p-2">
                                ABSENT
                            </td>
                            <td v-if="dataValue[1].schedules_attendances[1].applied_outs!=null" class="p-2">
                                {{ dataValue[1].schedules_attendances[1].applied_outs.time_human }}
                            </td>
                            <td v-else-if="dataValue[1].schedules_attendances[0].applied_ins!=null" class="p-2">
                                NO LOG
                            </td>
                            <td v-else class="p-2">
                                ABSENT
                            </td>
                            <td v-if="dataValue[1].schedules_attendances[1].applied_outs==null || dataValue[1].schedules_attendances[0].applied_ins==null" class="p-2">
                                0
                            </td>
                            <td v-else-if="dataValue[1].metadata.regular.reg_hrs!=null" class="p-2">
                                {{dataValue[1].metadata.regular.reg_hrs}}
                            </td>
                            <td v-else class="p-2">
                                0
                            </td>
                            <td v-if="dataValue[1].ovetime.length > 0" class="p-2">
                                {{ dataValue[1].ovetime[0].start_time_human }}
                            </td>
                            <td v-else class="p-2">
                                NO LOG
                            </td>
                            <td v-if="dataValue[1].ovetime.length > 0" class="p-2">
                                {{ dataValue[1].ovetime[0].end_time_human }}
                            </td>
                            <td v-else class="p-2">
                                NO LOG
                            </td>
                            <td v-if="dataValue[1].metadata.regular.overtime!=null" class="p-2">
                                {{dataValue[1].metadata.regular.overtime}}
                            </td>
                            <td v-else class="p-2">
                                0
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr class="border text-center border-b">
                            <td class="p-2">
                                {{ dataValue[0] }}
                            </td>
                            <td class="p-2"></td>
                            <td class="p-2">
                                ABSENT
                            </td>
                            <td class="p-2">
                                ABSENT
                            </td>
                            <td class="p-2">
                                ABSENT
                            </td>
                            <td class="p-2">
                                ABSENT
                            </td>
                            <td class="p-2">
                                0
                            </td>
                            <td class="p-2">
                                ABSENT
                            </td>
                            <td class="p-2">
                                ABSENT
                            </td>
                            <td class="p-2">
                                0
                            </td>
                        </tr>
                    </template>
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
