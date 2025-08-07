<script lang="ts" setup>
const equipmentTimeLine = (index: number, eq: any) => {
    let res = false
    const current = index + 1
    const start = eq.pStart
    const end = eq.pEnd

    if (current > start && current <= end) {
        res = true
    }
    return res
}
const gTimeline = (start: number, end: number, current: number, index: number) => {
    let res = true

    if (current < start) {
        res = false
    }

    if (current > end && index > 0) {
        res = false
    }
    if ((current + (index * 2)) >= 60 && index > 0) {
        res = false
    }
    return res
}
</script>
<template>
    <div>
        <div class="overflow-auto">
            <table class="min-w-full border border-black text-[10px] !table-fixed">
                <thead>
                    <tr>
                        <th class="border border-black p-1 text-[10px] px-8" rowspan="4">
                            ITEM
                        </th>
                        <th class="border border-black p-1 text-[10px] px-[200px]" rowspan="4">
                            DESCRIPTION
                        </th>
                        <th class="border border-black p-1 text-[10px]" rowspan="4">
                            QUANTITY
                        </th>
                        <th class="border border-black p-1 text-[10px]" rowspan="4">
                            UNIT
                        </th>
                        <th class="border border-black p-1 text-[10px]" rowspan="4">
                            UNIT COST
                        </th>
                        <th class="border border-black p-1 text-[10px]" rowspan="4">
                            CONTRACT AMOUNT
                        </th>
                        <th class="border border-black p-1 text-[10px]" rowspan="4">
                            RELATIVE WEIGHT
                        </th>
                        <th class="border border-black p-1 text-[10px]" rowspan="4">
                            TOTAL DAYS
                        </th>
                        <th class="border border-black p-1 text-[10px] font-normal" colspan="60" rowspan="2">
                            255 CD
                        </th>
                    </tr>
                    <tr />
                    <tr>
                        <th class="border border-black p-1" colspan="6">
                            FEBRUARY
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            MARCH
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            APRIL
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            MAY
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            JUNE
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            JULY
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            AUGUST
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            SEPTEMBER
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            OCTOBER
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            NOVEMBER
                        </th>
                    </tr>
                    <tr>
                        <th class="border border-black p-1 px-4">
                            05
                        </th>
                        <th class="border border-black p-1 px-4">
                            10
                        </th>
                        <th class="border border-black p-1 px-4">
                            15
                        </th>
                        <th class="border border-black p-1 px-4">
                            20
                        </th>
                        <th class="border border-black p-1 px-4">
                            25
                        </th>
                        <th class="border border-black p-1 px-4">
                            28
                        </th>
                        <th class="border border-black p-1 px-4">
                            05
                        </th>
                        <th class="border border-black p-1 px-4">
                            10
                        </th>
                        <th class="border border-black p-1 px-4">
                            15
                        </th>
                        <th class="border border-black p-1 px-4">
                            20
                        </th>
                        <th class="border border-black p-1 px-4">
                            25
                        </th>
                        <th class="border border-black p-1 px-4">
                            30
                        </th>
                        <th class="border border-black p-1 px-4">
                            05
                        </th>
                        <th class="border border-black p-1 px-4">
                            10
                        </th>
                        <th class="border border-black p-1 px-4">
                            15
                        </th>
                        <th class="border border-black p-1 px-4">
                            20
                        </th>
                        <th class="border border-black p-1 px-4">
                            25
                        </th>
                        <th class="border border-black p-1 px-4">
                            30
                        </th>
                        <th class="border border-black p-1 px-4">
                            05
                        </th>
                        <th class="border border-black p-1 px-4">
                            10
                        </th>
                        <th class="border border-black p-1 px-4">
                            15
                        </th>
                        <th class="border border-black p-1 px-4">
                            20
                        </th>
                        <th class="border border-black p-1 px-4">
                            25
                        </th>
                        <th class="border border-black p-1 px-4">
                            30
                        </th>
                        <th class="border border-black p-1 px-4">
                            05
                        </th>
                        <th class="border border-black p-1 px-4">
                            10
                        </th>
                        <th class="border border-black p-1 px-4">
                            15
                        </th>
                        <th class="border border-black p-1 px-4">
                            20
                        </th>
                        <th class="border border-black p-1 px-4">
                            25
                        </th>
                        <th class="border border-black p-1 px-4">
                            30
                        </th>
                        <th class="border border-black p-1 px-4">
                            05
                        </th>
                        <th class="border border-black p-1 px-4">
                            10
                        </th>
                        <th class="border border-black p-1 px-4">
                            15
                        </th>
                        <th class="border border-black p-1 px-4">
                            20
                        </th>
                        <th class="border border-black p-1 px-4">
                            25
                        </th>
                        <th class="border border-black p-1 px-4">
                            30
                        </th>
                        <th class="border border-black p-1 px-4">
                            05
                        </th>
                        <th class="border border-black p-1 px-4">
                            10
                        </th>
                        <th class="border border-black p-1 px-4">
                            15
                        </th>
                        <th class="border border-black p-1 px-4">
                            20
                        </th>
                        <th class="border border-black p-1 px-4">
                            25
                        </th>
                        <th class="border border-black p-1 px-4">
                            30
                        </th>
                        <th class="border border-black p-1 px-4">
                            05
                        </th>
                        <th class="border border-black p-1 px-4">
                            10
                        </th>
                        <th class="border border-black p-1 px-4">
                            15
                        </th>
                        <th class="border border-black p-1 px-4">
                            20
                        </th>
                        <th class="border border-black p-1 px-4">
                            25
                        </th>
                        <th class="border border-black p-1 px-4">
                            30
                        </th>
                        <th class="border border-black p-1 px-4">
                            05
                        </th>
                        <th class="border border-black p-1 px-4">
                            10
                        </th>
                        <th class="border border-black p-1 px-4">
                            15
                        </th>
                        <th class="border border-black p-1 px-4">
                            20
                        </th>
                        <th class="border border-black p-1 px-4">
                            25
                        </th>
                        <th class="border border-black p-1 px-4">
                            30
                        </th>
                        <th class="border border-black p-1 px-4">
                            05
                        </th>
                        <th class="border border-black p-1 px-4">
                            10
                        </th>
                        <th class="border border-black p-1 px-4">
                            15
                        </th>
                        <th class="border border-black p-1 px-4">
                            20
                        </th>
                        <th class="border border-black p-1 px-4">
                            25
                        </th>
                        <th class="border border-black p-1 px-4">
                            30
                        </th>
                    </tr>
                </thead>
                <tbody v-for="gantt,index in useGanttData().gantt" :key="index">
                    <tr v-if="index!==useGanttData().gantt.length-1">
                        <td class="border border-black p-1" rowspan="2">
                            {{ gantt.pName }}
                        </td>
                        <td class="border border-black p-1" rowspan="2">
                            {{ gantt.description }}
                        </td>
                        <td class="border border-black p-1" rowspan="2">
                            {{ gantt.quantity }}
                        </td>
                        <td class="border border-black p-1" rowspan="2">
                            {{ gantt.unit }}
                        </td>
                        <td class="border border-black p-1" rowspan="2">
                            {{ gantt.unitCost }}
                        </td>
                        <td class="border border-black p-1" rowspan="2">
                            {{ gantt.contractAmount }}
                        </td>
                        <td class="border border-black p-1" rowspan="2">
                            {{ gantt.relativeWeight }}
                        </td>
                        <td class="border border-black p-1" rowspan="2">
                            {{ gantt.totalDays }}
                        </td>
                        <td v-for="x in 60" :key="x" class="border border-black p-1 py-2" :class="gTimeline(5,60,x,index) ? 'bg-blue-400' : ''" />
                    </tr>
                    <tr>
                        <td v-for="x in 60" :key="x" class="border border-black p-1 py-2" />
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td class="border border-black p-1" rowspan="1" />
                        <td class="border border-black p-1 font-bold" rowspan="1" colspan="4">
                            TOTAL PROJECT COST
                        </td>
                        <td class="border border-black p-1 font-bold" rowspan="1">
                            1,250,451.00
                        </td>
                        <td class="border border-black p-1 font-bold" rowspan="1">
                            100%
                        </td>
                        <td class="border border-black p-1" rowspan="1" />
                        <td v-for="x in 10" :key="x" class="border border-black p-1 py-2" colspan="6" />
                    </tr>
                    <tr>
                        <td class="border border-black p-1 bg-yellow-200" rowspan="2">
                            PLANNED
                        </td>
                        <td class="border-y border-black p-1" colspan="4">
                            PLANNED ACCOMPLISHMENT PER MONTH
                        </td>
                        <td class="border-y border-black p-1" colspan="3">
                            %AGE
                        </td>
                        <td v-for="y in 10" :key="y" class="border border-black p-1 py-1" colspan="6">
                            0.49%
                        </td>
                    </tr>
                    <tr>
                        <td class="border-y border-black p-1" colspan="4">
                            CUMULATIVE ACCOMPLISHMENT PER MONTH
                        </td>
                        <td class="border-y border-black p-1" colspan="3">
                            %AGE
                        </td>
                        <td v-for="y in 10" :key="y" class="border border-black p-1 py-1" colspan="6">
                            0.50%
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-black p-1 bg-green-200" rowspan="2">
                            CASH FLOW
                        </td>
                        <td class="border-y border-black p-1" colspan="4">
                            PROJECTED AMOUNT
                        </td>
                        <td class="border-y border-black p-1" colspan="3">
                            PESO
                        </td>
                        <td v-for="y in 10" :key="y" class="border border-black p-1 py-1 text-right" colspan="6">
                            45,000.00
                        </td>
                    </tr>
                    <tr>
                        <td class="border-y border-black p-1" colspan="4">
                            CUMMULATIVE AMOUNT
                        </td>
                        <td class="border-y border-black p-1" colspan="3">
                            PESO
                        </td>
                        <td v-for="y in 10" :key="y" class="border border-black p-1 py-1 text-right" colspan="6">
                            50,000.00
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr class="border-black border-y-2">
                        <th class="border border-black p-1 text-[10px] px-8 text-left" colspan="8">
                            EQUIPMENT UTILIZATION SCHEDULE
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            FEBRUARY
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            MARCH
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            APRIL
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            MAY
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            JUNE
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            JULY
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            AUGUST
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            SEPTEMBER
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            OCTOBER
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            NOVEMBER
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="equip,index in useGanttData().equipment_print" :key="index">
                        <td class="border border-black p-1" colspan="5">
                            {{ equip.pName }}
                        </td>
                        <td class="border border-black p-1 text-center" colspan="3">
                            {{ 1 }}
                        </td>
                        <td v-for="x in 10" :key="x" class="border border-black p-1 py-2" colspan="6" :class="equipmentTimeLine(x, equip) ? 'bg-orange-400' : ''" />
                    </tr>
                </tbody>
                <thead>
                    <tr class="border-black border-y-2">
                        <th class="border border-black p-1 text-[10px] px-8 text-left" colspan="8">
                            MANPOWER UTILIZATION SCHEDULE
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            FEBRUARY
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            MARCH
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            APRIL
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            MAY
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            JUNE
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            JULY
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            AUGUST
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            SEPTEMBER
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            OCTOBER
                        </th>
                        <th class="border border-black p-1" colspan="6">
                            NOVEMBER
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="mp,index in useGanttData().manpower" :key="index" class="border-black">
                        <td class="border border-black p-1" colspan="8">
                            {{ mp.pName }}
                        </td>
                        <td v-for="x in 10" :key="x" class="border border-black p-1 py-2 bg-orange-100" colspan="6" />
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td colspan="3" rowspan="6" class="border border-black p-1">
                            <div class="flex justify-center items-center gap-4">
                                <img src="/ME3logo.jpeg" alt="" class="w-12 h-12">
                                <span>ME3 CONSTRUCTION</span>
                            </div>
                        </td>
                        <td colspan="7" class="border border-black p-1">
                            Prepared By:
                        </td>
                        <td colspan="12" rowspan="6" class="border border-black p-1 text-center font-bold">
                            24N0019: CONSTRUCTION OF FLOOD MITIGATION STRUCTURE ALONG CABADBARAN RIVER (CALIBUNAN-MABINI SECTION),
                            CABADBARAN CITY, AGUSAN DEL NORTE
                        </td>
                        <td colspan="17" rowspan="6" class="border border-black p-1">
                            <div class="flex justify-center items-center gap-4">
                                <img src="/dpwhlogo.jpeg" alt="" class="w-[50px] h-12">
                                <div class="flex flex-col items-center">
                                    <span>Republic of the Philippines</span>
                                    <span>Department of Public Works and Highways</span>
                                    <span>REGIONAL OFFICE XIII</span>
                                    <span>AGUSAN DEL NORTE DISTRICT ENGINEERING OFFICE</span>
                                    <span>J. Rosales Avenue, Butuan City</span>
                                </div>
                            </div>
                        </td>
                        <td colspan="6" class="border border-black p-1">
                            Checked By:
                        </td>
                        <td colspan="6" class="border border-black p-1">
                            Reviewed By:
                        </td>
                        <td colspan="6" class="border border-black p-1">
                            Recommending Approval:
                        </td>
                        <td colspan="6" class="border border-black p-1">
                            Recommending Approval:
                        </td>
                        <td colspan="6" class="border border-black p-1">
                            PAGE NO.:
                        </td>
                    </tr>
                    <tr>
                        <td colspan="7" rowspan="6" class="border border-black p-1">
                            <div class="flex flex-col justify-center items-center">
                                <span class="font-bold underline">ME3 CONSTRUCTION</span>
                                <span>Contractor</span>
                            </div>
                        </td>
                        <td colspan="6" class="border border-black p-1 font-bold py-4" rowspan="3">
                            DONABELL W. ENRIQUEZ
                        </td>
                        <td colspan="6" class="border border-black p-1 font-bold py-4" rowspan="3">
                            MARIETTA A. CASTRO
                        </td>
                        <td colspan="6" class="border border-black p-1 font-bold py-4" rowspan="3">
                            LIZ M. ABRAU
                        </td>
                        <td colspan="6" class="border border-black p-1 font-bold py-4" rowspan="3">
                            ERVIN P. SALANG
                        </td>
                        <td colspan="6" class="border border-black p-1 font-bold py-4" rowspan="3" />
                    </tr>
                    <tr class="py-1" />
                    <tr class="py-1" />
                    <tr class="py-1">
                        <td colspan="6" class="border border-black p-1">
                            Project Engineer II
                        </td>
                        <td colspan="6" class="border border-black p-1">
                            Chief, Construction Section
                        </td>
                        <td colspan="6" class="border border-black p-1">
                            OIC-Assistant District Engineer
                        </td>
                        <td colspan="6" class="border border-black p-1">
                            OIC-District Engineer
                        </td>
                        <td colspan="6" rowspan="2" class="border border-black p-1 underline text-center text-[8px]">
                            ME3 CONSTRUCTION
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6" class="border border-black p-1">
                            DPWH
                        </td>
                        <td colspan="6" class="border border-black p-1">
                            DPWH
                        </td>
                        <td colspan="6" class="border border-black p-1">
                            DPWH
                        </td>
                        <td colspan="6" class="border border-black p-1">
                            DPWH
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style>

</style>
