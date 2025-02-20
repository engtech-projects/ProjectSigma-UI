<script setup>
useHead({
    title: "Accounting Books",
})
const randomNumbers = () => {
    if (randomInt(1, 10) < 4) {
        return "-"
    } else {
        return formatToCurrency(Math.floor(Math.random() * 999999))
    }
}
</script>
<template>
    <div class="flex flex-col w-full gap-6 bg-white p-8 min-h-[1000px]">
        <AccountingCommonEvenparHeader :page="{currentPage: 1, totalPages: 1}" />
        <div class="flex flex-col justify-center w-full">
            <h1 class="text-2xl font-bold uppercase text-center">
                OFFICE - HUMAN RESOURCE
            </h1>
            <h4 class="text-md italic text-center">
                As of January 5, 2025
            </h4>
        </div>
        <div class="flex flex-col">
            <table class="border border-black text-xs">
                <thead>
                    <tr>
                        <th class="border border-black py-1 bg-slate-200 w-1/2">
                            ACCOUNT
                        </th>
                        <th class="border border-black py-1 w-1/6 bg-slate-200">
                            BUDGET
                        </th>
                        <th class="border border-black w-1/6 py-1 bg-slate-200">
                            ACTUAL
                        </th>
                        <th class="border border-black w-1/6 py-1 bg-slate-200">
                            BALANCE
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="index in 35" :key="index" class="h-6">
                        <td class="border border-black px-4">
                            1000-0000-0000-0000
                        </td>
                        <td v-for="i in 3" :key="i" class="border border-black text-right px-4">
                            {{ randomNumbers() }}
                        </td>
                    </tr>
                    <tr class="h-10">
                        <td class="border border-black px-4" colspan="4" />
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
    .border-double {
        border-style: double!important;
    }
</style>
