<template>
    <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-2 gap-4 mb-8 text-sm">
            <div>
                <p>Contract ID</p>
                <p>Contract Name</p>
                <p>Contract Location</p>
            </div>
            <div class="font-bold">
                <p>{{ projectStore.information.contract_id }}</p>
                <p>{{ projectStore.information.name }}</p>
                <p>{{ projectStore.information.location }}</p>
            </div>
        </div>

        <div class="text-center mb-8">
            <p class="font-bold uppercase text-base">
                OVER-ALL SUMMARY OF BID PRICES
            </p>
            <p class="text-sm">
                (All Parts of Bill of Quantities)
            </p>
        </div>

        <div class="mb-8 text-sm">
            <p class="mb-1">
                1 <span class="ml-4">Part No. - Enter the "Part No." for each section of the BOQ where unit prices are entered.</span>
            </p>
            <p class="mb-1">
                2 <span class="ml-4">Part Description - Enter the "Part Description" corresponding to the "Part No."</span>
            </p>
            <p class="mb-1">
                3 <span class="ml-4">Total Amount - Enter The "Total Amount" in Pesos for all pages having the same "Part Description."</span>
            </p>
        </div>

        <table class="table-auto w-full border border-black table-collapse mb-4 text-sm">
            <thead>
                <tr class="bg-orange-300">
                    <th colspan="3" class="p-2 text-center font-bold border border-black">
                        ABC = <span class="underline">95,600,000.00</span>
                    </th>
                    <th colspan="2" class="p-2 text-center font-bold border border-black">
                        24NH0044
                    </th>
                </tr>
                <tr class="bg-orange-300">
                    <th class="p-2 text-center font-bold border border-black">
                        Contract ID:
                    </th>
                    <th colspan="2" class="p-2 text-center font-bold border border-black">
                        24NH0044
                    </th>
                    <th colspan="2" class="p-2 text-center font-bold border border-black">
                        Total Amount
                    </th>
                </tr>
                <tr class="bg-orange-200">
                    <th class="p-2 text-center font-bold border border-black">
                        Part No.
                    </th>
                    <th colspan="2" class="p-2 text-center font-bold border border-black">
                        Part Description
                    </th>
                    <th colspan="2" class="p-2 text-center font-bold border border-black">
                        Total Amount
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in projectStore.information.summary_of_bid" :key="item.id">
                    <td class="p-2 border border-black">
                        {{ item.part_no }}
                    </td>
                    <td colspan="2" class="p-2 border border-black">
                        {{ item.part_description }}
                    </td>
                    <td colspan="2" class="p-2 text-right border border-black">
                        {{ accountingCurrency(item.total_amount) }}
                    </td>
                </tr>
                <tr class="font-bold">
                    <td colspan="3" class="p-2 border border-black">
                        TOTAL BID PRICE CARRIED FORWARD TO FORM OF BID
                    </td>
                    <td class="p-2 text-center border border-black">
                        ₱
                    </td>
                    <td class="p-2 text-right border border-black">
                        {{ accountingCurrency(totalAmount) }}
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="mt-4 mb-8">
            <p class="text-sm font-bold mb-1">
                TOTAL AMOUNT IN WORD:
            </p>
            <div class="border-b border-black pb-1">
                <p class="text-sm font-bold">
                    #NAME?
                </p>
            </div>
        </div>

        <div class="mb-8 text-sm">
            <p>Project to be completed within <span class="underline font-bold">237</span> calendar days</p>
        </div>

        <div class="grid grid-cols-2 gap-x-8 gap-y-4 text-sm mb-8">
            <div>
                <p>Name : <span class="font-bold underline">ANGEL A. ABRAU</span></p>
            </div>
            <div class="flex justify-end">
                <p>In the capacity of <span class="font-bold underline">Authorized Managing Officer</span></p>
            </div>
            <div>
                <p>Signed : <span class="underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
            </div>
            <div class="flex justify-end">
                <p>Date : <span class="font-bold underline">January 15, 2024</span></p>
            </div>
        </div>

        <div class="text-sm">
            <p>Duly authorized to sign the Bid for and on behalf of:</p>
            <p class="font-bold underline mt-1">
                ME3 CONSTRUCTION / EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION (JOINT VENTURE)
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projectStore = useProjectStore()

const totalAmount = computed(() => {
    return (projectStore.information.summary_of_bid ?? []).reduce((total, item) => {
        return total + item.total_amount
    }, 0)
})
</script>

<style>

</style>
