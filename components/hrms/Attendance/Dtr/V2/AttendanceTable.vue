<script lang="ts" setup>
import { useMyDtrStore } from "@/stores/hrms/attendance/dtr"
const dtrStore = useMyDtrStore()
const { getEmployeeDTRv2Data } = storeToRefs(dtrStore)

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
</script>
<template>
    <LayoutPrint>
        <div id="table-to-print" class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <div class="text-black pb-2">
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
                            <span class="font-bold">{{ getEmployeeDTRv2Data.data?.fullname_last }}</span><br>
                            <span class="font-bold">DESIGNATION:</span>
                            <span class="font-bold">{{ getEmployeeDTRv2Data.data?.current_position ?? "" }}</span>
                        </p>
                    </div>
                    <div>
                        <p class="text-sm">
                            <span class="font-bold">PERIOD COVERED:</span>
                            <span class="font-bold">{{ useFormatDateRange(getEmployeeDTRv2Data.data?.date_from, getEmployeeDTRv2Data.data?.date_to) }}</span>
                        </p>
                        <p class="text-sm">
                            <span class="font-bold">SCHEDULES APPLIED:</span>
                            <span class="font-bold">{{ dtrStore.dtrUniqueScheduleNamesV2 ?? "NO SCHEDULE FOUND" }}</span>
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
                            :colspan="(dtrStore.dtrUniqueSchedulesV2.length * 2) + 1"
                            class="text-white p-2 border-solid border border-zinc-700"
                        >
                            Regular Time
                        </th>
                        <th
                            scope="col"
                            :colspan="(dtrStore.dtrUniqueOvertimeV2.length * 2) + 1"
                            rowspan="2"
                            class="text-white p-2 border-solid border border-zinc-700"
                        >
                            Overtime
                        </th>
                    </tr>
                    <tr>
                        <template v-for="index in dtrStore.dtrUniqueSchedulesV2" :key="'schedampm' + index">
                            <th
                                id="schedampmAM"
                                scope="col"
                                colspan="2"
                                class="text-white p-2 border-solid border border-zinc-700"
                            >
                                {{ index.start_time_sched.split(" ")[1] }}
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
                        <template v-for="sched, index in dtrStore.dtrUniqueSchedulesV2" :key="'sched' + index">
                            <th
                                scope="col"
                                colspan="1"
                                class="text-white p-2 border-solid border border-zinc-700"
                            >
                                IN {{ sched.start_time_sched }}
                            </th>
                            <th
                                scope="col"
                                colspan="1"
                                class="text-white p-2 border-solid border border-zinc-700"
                            >
                                OUT {{ sched.end_time_sched }}
                            </th>
                        </template>
                        <template v-for="sched, index in dtrStore.dtrUniqueOvertimeV2" :key="'overtime' + index">
                            <th
                                scope="col"
                                colspan="1"
                                class="text-white p-2 border-solid border border-zinc-700"
                            >
                                IN {{ sched.start_time_sched }}
                            </th>
                            <th
                                scope="col"
                                colspan="1"
                                class="text-white p-2 border-solid border border-zinc-700"
                            >
                                OUT {{ sched.end_time_sched }}
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
                    <template v-if="getEmployeeDTRv2Data.data?.dtr">
                        <template v-for="dataValue, dtrDate in getEmployeeDTRv2Data.data?.dtr" :key="dtrDate">
                            <tr class="border text-center border-b">
                                <td class="p-2">
                                    {{ dtrDate }}
                                </td>
                                <td class="p-2">
                                    {{ dataValue.metadata.summary.charging_names }}
                                </td>
                                <template v-for="schedule_index in dtrStore.dtrUniqueSchedulesV2" :key="'sched-data-' + schedule_index">
                                    <template v-if="dataValue.metadata.summary.schedules.find((element:any) => element.start_time_sched === schedule_index.start_time_sched && element.end_time_sched === schedule_index.end_time_sched)">
                                        <td class="TimeIn p-2">
                                            {{ dataValue.metadata.summary.schedules.find((element:any) => element.id === schedule_index.id)?.start_time_log }}
                                        </td>
                                        <td class="TimeOut p-2">
                                            {{ dataValue.metadata.summary.schedules.find((element:any) => element.id === schedule_index.id)?.end_time_log }}
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
                                <template v-for="schedule_index in dtrStore.dtrUniqueOvertimeV2" :key="'overtime-data-' + schedule_index">
                                    <template v-if="dataValue.metadata.summary.overtimes.find((element:any) => element.start_time_sched === schedule_index.start_time_sched && element.end_time_sched === schedule_index.end_time_sched)">
                                        <td class="p-2">
                                            {{ dataValue.metadata.summary.overtimes.find((element:any) => element.start_time_sched === schedule_index.start_time_sched && element.end_time_sched === schedule_index.end_time_sched)?.start_time_log }}
                                        </td>
                                        <td class="p-2">
                                            {{ dataValue.metadata.summary.overtimes.find((element:any) => element.start_time_sched === schedule_index.start_time_sched && element.end_time_sched === schedule_index.end_time_sched)?.end_time_log }}
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
    </LayoutPrint>
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
