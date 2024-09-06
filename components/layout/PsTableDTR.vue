<script lang="ts" setup>
import { useEmployeeInfo } from "@/stores/hrms/employee"

const employee = useEmployeeInfo()

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
    schedule: {
        type: Array<any>,
        required: true,
    },
    overtime: {
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

const displayItem: any[] = []
const showItem = (item:any, reset:any) => {
    if (!displayItem.includes(item) && !reset) {
        displayItem.push(item)
        return item
    } else if (reset) {
        displayItem.splice(0, displayItem.length)
        return null
    } else {
        return null
    }
}

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
    const headContent = document.getElementsByTagName("head")[0].innerHTML
    const printContents = document.getElementById("table-to-print").innerHTML
    const printWindow = window.open("", "_blank")
    printWindow.document.write(headContent)
    printWindow.document.write(printContents)
    setTimeout(() => {
        printWindow.print()
    }, 1000)
}
</script>
<template>
    <button class="print-button mb-4 px-4 py-2 bg-blue-500 text-white rounded justify-end" @click="printTable">
        Print
    </button>
    <div id="table-to-print" class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
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
                    <img src="/evenpar.jpg" alt="Header Image" class="w-20 ml-4 justify-end">
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
                        <span class="font-bold">{{ formatDateRange(period.from, period.to) }}</span>
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
                        :colspan="(schedule.length * 2) + 1"
                        class="text-white p-2 border-solid border border-zinc-700"
                    >
                        Regular Time
                    </th>
                    <th
                        scope="col"
                        :colspan="(overtime.length * 2) + 1"
                        rowspan="2"
                        class="text-white p-2 border-solid border border-zinc-700"
                    >
                        Overtime
                    </th>
                </tr>
                <tr>
                    <template v-for="index in schedule" :key="'schedampm' + index">
                        <th
                            id="schedampmAM"
                            scope="col"
                            colspan="2"
                            class="text-white p-2 border-solid border border-zinc-700"
                        >
                            {{ index.start_time_human.split(" ")[1] }}
                        </th>
                    </template>
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
                    <template v-for="sched, index in schedule" :key="'sched' + index">
                        <th
                            scope="col"
                            colspan="1"
                            class="text-white p-2 border-solid border border-zinc-700"
                        >
                            IN {{ sched.start_time_human }}
                        </th>
                        <th
                            scope="col"
                            colspan="1"
                            class="text-white p-2 border-solid border border-zinc-700"
                        >
                            OUT {{ sched.end_time_human }}
                        </th>
                    </template>
                    <template v-for="sched, index in overtime" :key="'overtime' + index">
                        <th
                            scope="col"
                            colspan="1"
                            class="text-white p-2 border-solid border border-zinc-700"
                        >
                            IN {{ sched.start_time_human }}
                        </th>
                        <th
                            scope="col"
                            colspan="1"
                            class="text-white p-2 border-solid border border-zinc-700"
                        >
                            OUT {{ sched.end_time_human }}
                        </th>
                    </template>
                    <th
                        scope="col"
                        colspan="1"
                        rowspan="2"
                        class="text-white p-2 border-solid border border-zinc-700"
                    >
                        Total Hours
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-if="datas.dtr">
                    <template v-for="dataValue, dtrDate in datas.dtr" :key="dtrDate">
                        <tr class="border text-center border-b">
                            <td class="p-2">
                                {{ dtrDate }}
                            </td>
                            <td class="p-2">
                                <template v-for="schedule_index in dataValue.schedules_attendances" :key="'sched-data-' + schedule_index">
                                    <div v-if="schedule_index.applied_ins!=null">
                                        <div v-if="schedule_index.applied_ins.project!=null">
                                            {{ showItem(schedule_index.applied_ins.project.project_code, false) }}
                                        </div>
                                        <div v-else-if="schedule_index.applied_ins.department!=null">
                                            {{ showItem(schedule_index.applied_ins.department.department_name, false ) }}
                                        </div>
                                    </div>
                                    <div v-if="schedule_index.applied_outs!=null">
                                        <div v-if="schedule_index.applied_outs.project!=null">
                                            {{ showItem(schedule_index.applied_outs.project.project_code, false) }}
                                        </div>
                                        <div v-else-if="schedule_index.applied_outs.department!=null">
                                            {{ showItem(schedule_index.applied_outs.department.department_name, false) }}
                                        </div>
                                    </div>
                                </template>
                            </td>
                            <template v-for="schedule_index in schedule" :key="'sched-data-' + schedule_index">
                                <template v-if="dataValue.schedules_attendances.find((element:any) => element.id === schedule_index.id)">
                                    <td class="TimeIn p-2">
                                        <template v-if="dataValue.events.length > 0">
                                            {{ dataValue.events[0].event_type }}
                                            <template v-if="dataValue.schedules_attendances.find((element:any) => element.id === schedule_index.id)?.applied_ins != null">
                                                ({{ dataValue.schedules_attendances.find((element:any) => element.id === schedule_index.id)?.applied_ins.time_human }})
                                            </template>
                                        </template>
                                        <template v-else>
                                            <template v-if="dataValue.schedules_attendances.find((element:any) => element.id === schedule_index.id)?.applied_ins != null">
                                                {{ dataValue.schedules_attendances.find((element:any) => element.id === schedule_index.id)?.applied_ins.time_human }}
                                            </template>
                                            <template v-else-if="dataValue.metadata.total.reg_hrs > 0">
                                                <template v-if="dataValue.travel_order.length > 0">
                                                    ON TRAVEL ORDER
                                                </template>
                                                <template v-else-if="dataValue.leave.length > 0">
                                                    ON LEAVE
                                                </template>
                                                <template v-else>
                                                    NO LOG
                                                </template>
                                            </template>
                                            <template v-else-if="dataValue.events.length > 0" />
                                            <template v-else>
                                                ABSENT
                                            </template>
                                        </template>
                                    </td>
                                    <td class="TimeOut p-2">
                                        <template v-if="dataValue.events.length > 0">
                                            {{ dataValue.events[0].event_type }}
                                            <template v-if="dataValue.schedules_attendances.find((element:any) => element.id === schedule_index.id)?.applied_outs != null">
                                                ({{ dataValue.schedules_attendances.find((element:any) => element.id === schedule_index.id)?.applied_outs.time_human }})
                                            </template>
                                        </template>
                                        <template v-else>
                                            <template v-if="dataValue.schedules_attendances.find((element:any) => element.id === schedule_index.id)?.applied_outs != null">
                                                {{ dataValue.schedules_attendances.find((element:any) => element.id === schedule_index.id)?.applied_outs.time_human }}
                                            </template>
                                            <template v-else-if="dataValue.metadata.total.reg_hrs > 0">
                                                <template v-if="dataValue.travel_order.length > 0">
                                                    ON TRAVEL ORDER
                                                </template>
                                                <template v-else-if="dataValue.leave.length > 0">
                                                    ON LEAVE
                                                </template>
                                                <template v-else>
                                                    NO LOG
                                                </template>
                                            </template>
                                            <template v-else>
                                                ABSENT
                                            </template>
                                        </template>
                                    </td>
                                </template>
                                <template v-else>
                                    <td class="p-2">
                                        N/A
                                    </td>
                                    <td class="p-2">
                                        N/A
                                    </td>
                                </template>
                            </template>
                            <td class="p-2">
                                {{ dataValue.metadata.total.reg_hrs }}
                            </td>
                            <template v-for="schedule_index in overtime" :key="'overtime-data-' + schedule_index">
                                <template v-if="dataValue.overtime.find((element:any) => element.overtime_start_time === schedule_index.overtime_start_time && element.overtime_end_time === schedule_index.overtime_end_time)">
                                    <td class="p-2">
                                        <template v-if="dataValue.overtime.find((element:any) => element.overtime_start_time === schedule_index.overtime_start_time && element.overtime_end_time === schedule_index.overtime_end_time)?.applied_in != null">
                                            {{ dataValue.overtime.find((element:any) => element.overtime_start_time === schedule_index.overtime_start_time && element.overtime_end_time === schedule_index.overtime_end_time)?.applied_in?.time_human ?? "NO LOG" }}
                                        </template>
                                        <template v-else-if="dataValue.travel_order.length > 0">
                                            ON TRAVEL ORDER
                                        </template>
                                        <template v-else>
                                            NO LOG
                                        </template>
                                    </td>
                                    <td class="p-2">
                                        <template v-if="dataValue.overtime.find((element:any) => element.overtime_start_time === schedule_index.overtime_start_time && element.overtime_end_time === schedule_index.overtime_end_time)?.applied_out != null">
                                            {{ dataValue.overtime.find((element:any) => element.overtime_start_time === schedule_index.overtime_start_time && element.overtime_end_time === schedule_index.overtime_end_time)?.applied_out?.time_human ?? "NO LOG" }}
                                        </template>
                                        <template v-else-if="dataValue.travel_order.length > 0">
                                            ON TRAVEL ORDER
                                        </template>
                                        <template v-else>
                                            NO LOG
                                        </template>
                                    </td>
                                </template>
                                <template v-else>
                                    <td class="p-2">
                                        N/A
                                    </td>
                                    <td class="p-2">
                                        N/A
                                    </td>
                                </template>
                            </template>
                            <td class="p-2">
                                {{ dataValue.metadata.total.overtime }}
                            </td>
                        </tr>
                        {{ showItem('', true) }}
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
