<script setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()
const snackbar = useSnackbar()

const updateCashFlow = async () => {
    try {
        await projectStore.updateCashFlow()
        if (projectStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: projectStore.errorMessage
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error.message || "An error occurred while updating cash flow."
        })
    }
}
</script>
<template>
    <LayoutPrintAdvanced>
        <template #system-layout>
            <div class="p-4 mx-auto">
                <h1 class="text-2xl font-bold mb-4 text-center">
                    CASHFLOW BY QUARTER AND PAYMENT SCHEDULE
                </h1>

                <table class="w-full border-collapse border border-gray-300 mb-8">
                    <thead>
                        <tr>
                            <th class="border border-gray-300 p-2 font-semibold">
                                PARTICULAR
                            </th>
                            <th class="border border-gray-300 p-2 font-semibold">
                                %WT
                            </th>
                            <th class="border border-gray-300 p-2 font-semibold">
                                1ST QUARTER
                            </th>
                            <th class="border border-gray-300 p-2 font-semibold">
                                2ND QUARTER
                            </th>
                            <th class="border border-gray-300 p-2 font-semibold">
                                3RD QUARTER
                            </th>
                            <th class="border border-gray-300 p-2 font-semibold">
                                4TH QUARTER
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border border-gray-300 p-2">
                                ACCOMPLISHMENT
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.wtax?.accomplishment }}%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.q1?.accomplishment }}%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.q2?.accomplishment }}%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.q3?.accomplishment }}%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.q4?.accomplishment }}%
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 p-2">
                                CASH FLOW
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.wtax?.cashflow }}%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.q1?.cashflow }}%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.q2?.cashflow }}%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.q3?.cashflow }}%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.q4?.cashflow }}%
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 p-2">
                                CUMULATIVE ACCOMPLISHMENT
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.wtax?.cumulative_accomplishment }}%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.q1?.cumulative_accomplishment }}%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.q2?.cumulative_accomplishment }}%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.q3?.cumulative_accomplishment }}%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.q4?.cumulative_accomplishment }}%
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 p-2">
                                CUMULATIVE CASH FLOW
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.wtax?.cumulative_cashflow }}%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.q1?.cumulative_cashflow }}%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.q2?.cumulative_cashflow }}%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.q3?.cumulative_cashflow }}%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                {{ projectStore.information.cash_flow?.q4?.cumulative_cashflow }}%
                            </td>
                        </tr>
                    </tbody>
                </table>

                <form @submit.prevent="updateCashFlow">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="border border-gray-300 p-4">
                            <h3 class="font-bold mb-2 text-4xl">
                                Q1
                            </h3>
                            <div class="mb-2">
                                <label class="block text-sm font-medium text-gray-700">ACCOMPLISHMENT</label>
                                <input v-model="projectStore.cashFlowByQuarter.cash_flow.q1.accomplishment" type="number" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Percentage">
                            </div>
                            <div class="mb-2">
                                <label class="block text-sm font-medium text-gray-700">CASH FLOW</label>
                                <input v-model="projectStore.cashFlowByQuarter.cash_flow.q1.cash_flow" type="number" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cashflow">
                            </div>
                            <div class="mb-2">
                                <label class="block text-sm font-medium text-gray-700">CUMULATIVE ACCOMPLISHMENT</label>
                                <input v-model="projectStore.cashFlowByQuarter.cash_flow.q1.cumulative_accomplishment" type="number" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Percentage">
                            </div>
                            <div class="mb-2">
                                <label class="block text-sm font-medium text-gray-700">CUMULATIVE CASHFLOW</label>
                                <input v-model="projectStore.cashFlowByQuarter.cash_flow.q1.cumulative_cash_flow" type="number" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cashflow">
                            </div>
                        </div>
                        <div class="border border-gray-300 p-4">
                            <h3 class="font-bold mb-2 text-4xl">
                                Q2
                            </h3>
                            <div class="mb-2">
                                <label class="block text-sm font-medium text-gray-700">ACCOMPLISHMENT</label>
                                <input v-model="projectStore.cashFlowByQuarter.cash_flow.q2.accomplishment" type="number" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Percentage">
                            </div>
                            <div class="mb-2">
                                <label class="block text-sm font-medium text-gray-700">CASH FLOW</label>
                                <input v-model="projectStore.cashFlowByQuarter.cash_flow.q2.cash_flow" type="number" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cashflow">
                            </div>
                            <div class="mb-2">
                                <label class="block text-sm font-medium text-gray-700">CUMULATIVE ACCOMPLISHMENT</label>
                                <input v-model="projectStore.cashFlowByQuarter.cash_flow.q2.cumulative_accomplishment" type="number" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Percentage">
                            </div>
                            <div class="mb-2">
                                <label class="block text-sm font-medium text-gray-700">CUMULATIVE CASHFLOW</label>
                                <input v-model="projectStore.cashFlowByQuarter.cash_flow.q2.cumulative_cash_flow" type="number" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cashflow">
                            </div>
                        </div>
                        <div class="border border-gray-300 p-4">
                            <h3 class="font-bold mb-2 text-4xl">
                                Q3
                            </h3>
                            <div class="mb-2">
                                <label class="block text-sm font-medium text-gray-700">ACCOMPLISHMENT</label>
                                <input v-model="projectStore.cashFlowByQuarter.cash_flow.q3.accomplishment" type="number" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Percentage">
                            </div>
                            <div class="mb-2">
                                <label class="block text-sm font-medium text-gray-700">CASH FLOW</label>
                                <input v-model="projectStore.cashFlowByQuarter.cash_flow.q3.cash_flow" type="number" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cashflow">
                            </div>
                            <div class="mb-2">
                                <label class="block text-sm font-medium text-gray-700">CUMULATIVE ACCOMPLISHMENT</label>
                                <input v-model="projectStore.cashFlowByQuarter.cash_flow.q3.cumulative_accomplishment" type="number" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Percentage">
                            </div>
                            <div class="mb-2">
                                <label class="block text-sm font-medium text-gray-700">CUMULATIVE CASHFLOW</label>
                                <input v-model="projectStore.cashFlowByQuarter.cash_flow.q3.cumulative_cash_flow" type="number" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cashflow">
                            </div>
                        </div>
                        <div class="border border-gray-300 p-4">
                            <h3 class="font-bold mb-2 text-4xl">
                                Q4
                            </h3>
                            <div class="mb-2">
                                <label class="block text-sm font-medium text-gray-700">ACCOMPLISHMENT</label>
                                <input v-model="projectStore.cashFlowByQuarter.cash_flow.q4.accomplishment" type="number" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Percentage">
                            </div>
                            <div class="mb-2">
                                <label class="block text-sm font-medium text-gray-700">CASH FLOW</label>
                                <input v-model="projectStore.cashFlowByQuarter.cash_flow.q4.cash_flow" type="number" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cashflow">
                            </div>
                            <div class="mb-2">
                                <label class="block text-sm font-medium text-gray-700">CUMULATIVE ACCOMPLISHMENT</label>
                                <input v-model="projectStore.cashFlowByQuarter.cash_flow.q4.cumulative_accomplishment" type="number" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Percentage">
                            </div>
                            <div class="mb-2">
                                <label class="block text-sm font-medium text-gray-700">CUMULATIVE CASHFLOW</label>
                                <input v-model="projectStore.cashFlowByQuarter.cash_flow.q4.cumulative_cash_flow" type="number" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cashflow">
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end my-8">
                        <button
                            type="submit"
                            class="flex justify-end items-center  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Save Cashflow Schedule
                        </button>
                    </div>
                </form>
            </div>
        </template>
        <template #print-layout>
            <ProjectsPrintCashFlow />
        </template>
    </LayoutPrintAdvanced>
</template>
