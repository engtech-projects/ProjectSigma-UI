<script setup>
useHead({
    title: "Accounting Books",
})
</script>
<template>
    <div class="flex flex-col w-full gap-6 bg-white p-8 min-h-[1000px]">
        <AccountingCommonEvenparHeader :page="{currentPage: 1, totalPages: 1}" />
        <div class="flex flex-col justify-center w-full">
            <h1 class="text-2xl font-bold uppercase text-center py-4">
                Cash Advance Summary
            </h1>
        </div>
        <div class="flex flex-col">
            <div class="flex items-center justify-center border-2 border-black border-b-0 py-8">
                <div class="flex flex-col w-[40%]">
                    <div class="flex gap-1">
                        <span class="text-right flex-1">
                            DATE:
                        </span>
                        <span class="flex-1 border-b border-black" />
                    </div>
                    <div class="flex gap-1">
                        <span class="text-right flex-1">
                            PROJECT CODE:
                        </span>
                        <span class="flex-1 border-b border-black" />
                    </div>
                </div>
            </div>
            <table class="border-2 border-black !border-t-0 border-b-0 text-xs">
                <thead>
                    <tr>
                        <th class="border border-black py-1 bg-slate-200 w-1/2">
                            NAME
                        </th>
                        <th class="border border-black py-1 w-1/6 bg-slate-200">
                            AMOUNT
                        </th>
                        <th class="border border-black w-1/6 py-1 bg-slate-200">
                            SIGNATURE
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="index in 15" :key="index" class="h-6">
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black px-4 h-6" />
                        <td class="border border-black text-right px-4" />
                    </tr>
                    <tr>
                        <td colspan="2" class="border border-black text-center font-bold text-md px-4 h-8">
                            TOTAL
                        </td>
                        <td class="border border-black text-right px-4 h-8" />
                    </tr>
                </tbody>
            </table>
            <div class="flex py-12 border-2 border-t-0 border-black">
                <div class="pb-10 border-b border-black w-72">
                    <span class="text-md font-bold pl-2">
                        APPROVED BY:
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .border-double {
        border-style: double!important;
    }
</style>
