<template>
    <div class="px-4 mx-auto pb-6">
        <h1 class="text-2xl font-bold mb-2 text-center">
            OVER-ALL SUMMARY OF BID PRICES
        </h1>
        <p class="mb-4 text-center">
            (All Parts of Bill of Quantities)
        </p>

        <p class="font-semibold mb-2">
            Instructions for completing the Summary of Bid Prices:
        </p>
        <ol class="list-decimal list-inside mb-4">
            <li>Part No. - Enter the "Part No." for each section of the BOQ where unit prices are entered.</li>
            <li>Part Description - Enter the "Part Description" corresponding to the "Part No."</li>
            <li>Total Amount - Enter The "Total Amount" in Pesos for all pages having the same "Part Description"</li>
        </ol>

        <table class="w-full border-collapse border border-black mb-6">
            <tr class="bg-yellow-200 border border-black">
                <th class="text-center align-middle p-2" colspan="3">
                    <p>
                        <span class="font-semibold">ABC =</span> {{ accountingCurrency(projectStore.information.amount) }}
                    </p>
                </th>
            </tr>
            <tr class="bg-yellow-200 border border-black">
                <th class="p-2 text-left font-semibold">
                    CONTRACT ID:
                </th>
                <th colspan="2" class="p-2 text-left">
                    {{ projectStore.information.contract_id }}
                </th>
            </tr>
            <tr class="bg-orange-200">
                <th class="border border-black p-2 text-left font-semibold">
                    PART NO
                </th>
                <th class="border border-black p-2 text-left font-semibold">
                    PART DESCRIPTION
                </th>
                <th class="border border-black p-2 text-left font-semibold">
                    TOTAL AMOUNT
                </th>
            </tr>
            <tr v-for="(item, index) in projectStore.information.summary_of_bid" :key="index">
                <td class="border border-black p-2">
                    {{ item.part_no }}
                </td>
                <td class="border border-black p-2">
                    {{ item.description }}
                </td>
                <td class="border border-black p-2 text-right">
                    {{ accountingCurrency(item.total_amount) }}
                </td>
            </tr>
            <tr>
                <td colspan="2" class="border border-black p-2 font-semibold">
                    TOTAL BID PRICE CARRIED FORWARD TO FORM OF BID
                </td>
                <td class="border border-black p-2 text-right font-semibold">
                    {{ accountingCurrency(totalAmount) }}
                </td>
            </tr>
            <tr class="border border-black">
                <td class="p-2" colspan="2">
                    <p class="mb-2">
                        <span class="font-semibold">TOTAL AMOUNT IN WORD:</span>
                    </p>
                    <p class="pl-6">
                        {{ amountToWords(totalAmount) + " Only." }}
                    </p>
                </td>
            </tr>
        </table>

        <p><span class="mb-6">Project to be completed within 237 calendar days</span></p>
        <div class="flex justify-end py-4 pt-6">
            <button v-if="1===2" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-12 h-8">
                <Icon name="ic:outline-local-printshop" class="text-white h-6 w-6" />
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()

const totalAmount = computed(() => {
    return projectStore.information.summary_of_bid.reduce((total, item) => total + item.total_amount, 0)
})
</script>

<style>

</style>
