<script lang="ts" setup>
import { useEmployeeInfo } from "@/stores/hrms/employee"

const employee = useEmployeeInfo()
const { employeeIsSearched } = storeToRefs(employee)

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
    period: {
        type: Object,
        required: true,
    }
})

const formatDateRange = (start: string, end: string) => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

    const startDate = new Date(start)
    const endDate = new Date(end)

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return "-"
    }

    const startDay = startDate.getDate()
    const startMonth = months[startDate.getMonth()]

    const endDay = endDate.getDate()
    const endMonth = months[endDate.getMonth()]
    const endYear = endDate.getFullYear()

    if (startMonth === endMonth) {
        return `${startMonth} ${startDay}-${endDay}, ${endYear}`
    } else {
        return `${startMonth} ${startDay}-${endMonth} ${endDay}, ${endYear}`
    }
}

const printTable = () => {
    const printContents = document.getElementById("table-to-print").innerHTML
    const originalContents = document.body.innerHTML
    document.body.innerHTML = printContents
    window.print()
    document.body.innerHTML = originalContents
}

</script>

<template>
    <div id="table-to-print" class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
        <button class="print-button mb-4 px-4 py-2 bg-blue-500 text-white rounded justify-end" @click="printTable">
            Print
        </button>
        <div v-if="employee.fullname && employee.information?.current_employment?.position?.name && period" class="text-black pb-2">
            <div class="text-center block overflow-hidden">
                <div class="flex items-center justify-center">
                    <div class="text-lg font-bold mx-auto ">
                        EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION
                        <div class="text-sm text-center indent-4 font-medium">
                            <p>P-1, Poblacion 8, Buenavista, Agusan Del Norte</p>
                            <p>Email add: evenparcorporation@gmail.com</p>
                            <p>DAILY ATTENDANCE/ACCOMPLISHMENT REPORT</p>
                        </div>
                    </div>
                    <img src="/evenpar.jpg" alt="Header Image" class="w-20 ml-4 justify-end" />
                </div>
            </div>
            <br>
            <div class="flex justify-between items-center">
                <div>
                    <p class="text-sm">
                        <span class="font-bold">NAME:</span>
                        <span class="font-bold">{{ employee.fullname }}</span><br>
                        <span class="font-bold">DESIGNATION:</span>
                        <span class="font-bold">{{ employee.information.current_employment.position.name }}</span>
                    </p>
                </div>
                <div>
                    <p class="text-sm">
                        <span class="font-bold">PERIOD COVERED:</span>
                        <spam class="font-bold">{{ formatDateRange(period.from, period.to) }}</spam>
                    </p>
                </div>
            </div>

        </div>
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
                <template v-if="employeeIsSearched">
                    <template v-for="dataValue, index in datas" :key="index">
                        <template v-if="dataValue[1].schedules_attendances.length > 0">
                            <tr v-if="dataValue[1].schedules_attendances[0].applied_ins!=null" class="border text-center border-b">
                                <td class="p-2">
                                    {{ dataValue[0] }}
                                </td>
                                <td v-if="dataValue[1].schedules_attendances[0].applied_ins.project_id" class="p-2">
                                    {{ dataValue[1].schedules_attendances[0].applied_ins.project.project_code }}
                                </td>
                                <td v-else-if="dataValue[1].schedules_attendances[0].applied_ins.department_id" class="p-2">
                                    {{ dataValue[1].schedules_attendances[0].applied_ins.department.department_name }}
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
                                <td v-if="dataValue[1].metadata.regular.reg_hrs!=null" class="p-2">
                                    {{ dataValue[1].metadata.regular.reg_hrs }}
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
                                    {{ dataValue[1].metadata.regular.overtime }}
                                </td>
                                <td v-else class="p-2">
                                    0
                                </td>
                            </tr>
                            <tr v-else class="border text-center border-b">
                                <td class="p-2">
                                    {{ dataValue[0] }}
                                </td>
                                <td class="p-2" />
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
                        <template v-else>
                            <tr class="border text-center border-b">
                                <td class="p-2">
                                    {{ dataValue[0] }}
                                </td>
                                <td class="p-2" />
                                <td class="p-2">
                                    NO SCHEDULE
                                </td>
                                <td class="p-2">
                                    NO SCHEDULE
                                </td>
                                <td class="p-2">
                                    NO SCHEDULE
                                </td>
                                <td class="p-2">
                                    NO SCHEDULE
                                </td>
                                <td class="p-2">
                                    0
                                </td>
                                <td class="p-2">
                                    NO SCHEDULE
                                </td>
                                <td class="p-2">
                                    NO SCHEDULE
                                </td>
                                <td class="p-2">
                                    0
                                </td>
                            </tr>
                        </template>
                    </template>
                </template>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
.active {
    background-color: #0475816b;
    color: black;
    font-weight: 500;
}
@media print {
    .print-button {
        display: none;
    }
}
h1 {
    font-size: 100px;
}
</style>
