<template>
    <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
            <p class="text-sm font-bold">
                {{ projectStore.information.license }}
            </p>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-8 text-sm">
            <div>
                <p>Contract ID</p>
                <p>Contract Name</p>
                <p>Contract Location</p>
            </div>
            <div class="font-bold">
                <p>{{ projectStore.information.id }}</p>
                <p>{{ projectStore.information.name }}</p>
                <p>{{ projectStore.information.location }}</p>
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
                <tr v-for="data in processedData" :key="data.name">
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

        <div class="mb-12">
            <p class="text-sm mb-4">
                Submitted by:
            </p>
            <div class="ml-8 text-sm">
                <p class="mb-1">
                    Name: <span class="font-bold underline">ANGEL A. ABRAU</span>
                </p>
                <p class="mb-1">
                    Position: <span class="font-bold">Authorized Managing Officer</span>
                </p>
                <p class="mb-1">
                    Name of the Bidder: <span class="font-bold">ME3 CONSTRUCTION / EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION (JOINT VENTURE)</span>
                </p>
                <p class="mb-1">
                    Date: <span class="font-bold">{{ fullDate(new Date()) }}</span>
                </p>
            </div>
        </div>

        <div class="border-b border-black mb-2" />

        <div class="flex justify-between items-end text-xs">
            <p>DPWH-INFR-19-2016</p>
            <p>PAGE 1 OF 1</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from "~/stores/project-monitoring/projects"

const projectStore = useProjectStore()

const processedData = computed(() => {
    const data = []
    if (projectStore.information.cash_flow) {
        for (const i in projectStore.information.cash_flow.q1) {
            data.push({ name: i, values: {} })
        }
        for (const i in data) {
            const value = data[i]
            for (const j in projectStore.information.cash_flow) {
                for (const k in projectStore.information.cash_flow[j]) {
                    if (value.name === k) {
                        value.values[j] = projectStore.information.cash_flow[j][k]
                    }
                }
            }
        }
    }
    return data
})
</script>

<style>

</style>
