<script lang="ts" setup>
import { useProjectStore } from "~/stores/project-monitoring/projects"
const projectStore = useProjectStore()
const processedData = computed(() => {
    const data = []
    const cashFlow = projectStore.information?.cash_flow
    if (cashFlow?.q1 && typeof cashFlow.q1 === "object") {
        for (const i in cashFlow.q1) {
            data.push({ name: i, values: {} })
        }
        for (const i in data) {
            const value = data[i]
            for (const j in cashFlow) {
                if (cashFlow[j] && typeof cashFlow[j] === "object") {
                    for (const k in cashFlow[j]) {
                        if (value.name === k) {
                            value.values[j] = cashFlow[j][k]
                        }
                    }
                }
            }
        }
    }
    return data
})
</script>
<template>
    <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
            <p class="text-sm font-bold">
                {{ projectStore.information?.license ?? 'N/A' }}
            </p>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-8 text-sm">
            <div>
                <p>Contract ID</p>
                <p>Contract Name</p>
                <p>Contract Location</p>
            </div>
            <div class="font-bold">
                <p>{{ projectStore.information?.id ?? 'N/A' }}</p>
                <p>{{ projectStore.information?.name ?? 'N/A' }}</p>
                <p>{{ projectStore.information?.location ?? 'N/A' }}</p>
            </div>
        </div>

        <div class="text-center mb-8">
            <p class="text-lg font-bold uppercase">
                CASH FLOW BY QUARTER AND PAYMENT SCHEDULE
            </p>
        </div>

        <table class="table-auto w-full border border-black table-collapse text-sm mb-12">
            <thead>
                <tr class="bg-gray-200">
                    <th class="p-2 border border-black text-left">
                        PARTICULAR
                    </th>
                    <th class="p-2 border border-black text-center">
                        %WT
                    </th>
                    <th class="p-2 border border-black text-center">
                        1ST QUARTER
                    </th>
                    <th class="p-2 border border-black text-center">
                        2ND QUARTER
                    </th>
                    <th class="p-2 border border-black text-center">
                        3RD QUARTER
                    </th>
                    <th class="p-2 border border-black text-center">
                        4TH QUARTER
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in processedData ?? []" :key="data.name">
                    <td class="p-2 border border-black uppercase">
                        {{ data.name }}
                    </td>
                    <td class="p-2 border border-black text-center">
                        {{ data.values.wt }} %
                    </td>
                    <td class="p-2 border border-black text-center">
                        {{ data.values.q1 }} %
                    </td>
                    <td class="p-2 border border-black text-center">
                        {{ data.values.q2 }} %
                    </td>
                    <td class="p-2 border border-black text-center">
                        {{ data.values.q3 }} %
                    </td>
                    <td class="p-2 border border-black text-center">
                        {{ data.values.q4 }} %
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="flex flex-col gap-0 text-sm">
            <span clas="">
                Submitted by:
            </span>
            <div class="grid grid-cols-10 gap-1 mt-10 mb-4">
                <span class="col-span-2">
                    Name:
                </span>
                <span class="col-span-8 font-bold underline">
                    ANGEL A. ABRAU
                </span>
                <span class="col-span-2">
                    Position:
                </span>
                <span class="col-span-8">
                    Authorized Managing Officer
                </span>
                <span class="col-span-2">
                    Name of the Bidder:
                </span>
                <span class="col-span-8">
                    ME3 CONSTRUCTION / EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION (JOINT VENTURE)
                </span>
                <span class="col-span-2">
                    Date:
                </span>
                <span class="col-span-8">
                    {{ fullDate(new Date()) }}
                </span>
            </div>
        </div>

        <div class="border-b border-black mb-2" />

        <div class="flex justify-between items-end text-xs">
            <p>DPWH-INFR-19-2016</p>
            <p>PAGE 1 OF 1</p>
        </div>
    </div>
</template>
<style>

</style>
